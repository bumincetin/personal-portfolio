import { NextRequest, NextResponse } from 'next/server';
import { getContactConfig } from '@/lib/contact/config';
import { hasErrors, LIMITS, normaliseTopic, validateInquiry, type InquiryInput } from '@/lib/contact/validate';

/**
 * Inquiry endpoint.
 *
 * The contract this route exists to keep: a 200 from here means the mail
 * provider accepted the message for delivery. It does not mean the message was
 * delivered — that is a different claim and the UI does not make it. Anything
 * short of provider acceptance is a non-200, so the client can never show a
 * success state for a submission that did not happen.
 *
 * Nothing about the message body is logged. Errors log the provider's status
 * and a short reason, never the visitor's name, address or text.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Refuse to even parse a body larger than this. */
const MAX_BODY_BYTES = 16_000;

/**
 * Best-effort rate limiting.
 *
 * This is per-isolate and therefore approximate on Workers, where requests may
 * land on different isolates. It is a speed bump against a naive script, not a
 * security control, and it is documented as such in docs/launch-checklist.md,
 * where a Durable Object or KV-backed limiter is recorded as the durable option
 * if abuse ever justifies one.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const submissions = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    submissions.set(key, recent);
    return true;
  }
  recent.push(now);
  submissions.set(key, recent);

  // Bound the map so a long-lived isolate cannot grow it without limit.
  if (submissions.size > 2000) {
    for (const [existing, times] of submissions) {
      if (times.every((at) => now - at >= WINDOW_MS)) submissions.delete(existing);
    }
  }
  return false;
}

/** Fingerprint used only for rate limiting; never stored or logged. */
const clientKey = (req: NextRequest): string =>
  req.headers.get('cf-connecting-ip') ??
  req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
  'unknown';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(req: NextRequest) {
  const config = getContactConfig();

  // Unconfigured is a distinct, honest outcome. The client renders the email
  // fallback for this code rather than a generic failure.
  if (!config) {
    return NextResponse.json({ ok: false, code: 'not-configured' }, { status: 503 });
  }

  const declaredLength = Number(req.headers.get('content-length') ?? '0');
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, code: 'too-large' }, { status: 413 });
  }

  let raw: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, code: 'too-large' }, { status: 413 });
    }
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, code: 'malformed' }, { status: 400 });
  }

  const body = (raw ?? {}) as Record<string, unknown>;

  // Honeypot: a field no human sees. A bot that fills it gets a plain 200 with
  // no mail sent — telling it that it was detected only helps it adapt.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const input: InquiryInput = {
    name: String(body.name ?? '').slice(0, LIMITS.name.max + 1),
    email: String(body.email ?? '').slice(0, LIMITS.email.max + 1),
    company: String(body.company ?? '').slice(0, LIMITS.company.max + 1),
    topic: String(body.topic ?? 'other'),
    message: String(body.message ?? '').slice(0, LIMITS.message.max + 1),
  };

  const errors = validateInquiry(input);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, code: 'invalid', errors }, { status: 400 });
  }

  if (rateLimited(clientKey(req))) {
    return NextResponse.json({ ok: false, code: 'rate-limited' }, { status: 429 });
  }

  const topic = normaliseTopic(input.topic);
  const name = input.name.trim();
  const email = input.email.trim();
  const company = input.company.trim();
  const message = input.message.trim();

  /**
   * Idempotency key. Two identical submissions inside the same window are
   * almost always one person pressing the button twice on a slow connection.
   * Resend deduplicates on this header, so the second press does not produce a
   * second email.
   */
  const dedupeSource = `${email}|${message}`;
  let dedupeKey = '';
  try {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(dedupeSource));
    dedupeKey = Array.from(new Uint8Array(digest))
      .slice(0, 16)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    // Hashing unavailable: proceed without deduplication rather than fail.
  }

  const subject = `Inquiry — ${topic} — ${name}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    `Topic: ${topic}`,
    '',
    message,
  ].filter((line): line is string => line !== null);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        ...(dedupeKey ? { 'Idempotency-Key': dedupeKey } : {}),
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        // So a reply in the mail client goes to the person who wrote in.
        reply_to: email,
        subject,
        text: lines.join('\n'),
        html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(
          lines.join('\n'),
        )}</pre>`,
      }),
    });

    if (!response.ok) {
      // Status only. The body could echo submitted content back into the log.
      console.error(`[contact] provider rejected the message with status ${response.status}`);
      return NextResponse.json({ ok: false, code: 'provider-error' }, { status: 502 });
    }

    // Accepted for delivery by the provider. Not the same as delivered, and the
    // UI's success copy is worded accordingly.
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[contact] could not reach the mail provider', error instanceof Error ? error.name : 'unknown');
    return NextResponse.json({ ok: false, code: 'network-error' }, { status: 502 });
  }
}
