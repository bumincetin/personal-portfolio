'use client';

import React, { useId, useRef, useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/translations';
import { getUI } from '@/lib/content/ui';
import { getAllServiceCopy } from '@/lib/content/services';
import { CONTACT, mailtoHref, whatsappHref } from '@/lib/profile';
import { hasErrors, LIMITS, TOPICS, validateInquiry, type InquiryErrors, type InquiryInput } from '@/lib/contact/validate';
import { track } from '@/lib/analytics';

/**
 * Inquiry form.
 *
 * States: empty, invalid, submitting, accepted, failed, and not-configured —
 * all six are real and none of them lie. In particular:
 *
 *  - `accepted` is only reached on a 200 from /api/contact, which is only
 *    returned once the mail provider has accepted the message. There is no
 *    timer and no optimistic success.
 *  - `failed` keeps every field exactly as typed, so a recoverable error costs
 *    the visitor nothing.
 *  - When the provider is not configured the form is not rendered as a working
 *    form at all: the fields are disabled and the verified email address is
 *    offered instead.
 *
 * Nothing typed here is sent to analytics. The funnel events carry the topic
 * and nothing else — see src/lib/analytics.ts.
 */

type Status = 'idle' | 'submitting' | 'accepted' | 'failed';

interface Props {
  locale: Locale;
  configured: boolean;
  /** Pre-selected from a service page's inquiry CTA. */
  initialTopic?: string;
}

const EMPTY: InquiryInput = { name: '', email: '', company: '', topic: 'other', message: '' };

export default function ContactPageClient({ locale, configured, initialTopic }: Props) {
  const ui = getUI(locale);
  const services = getAllServiceCopy(locale);

  const [values, setValues] = useState<InquiryInput>({
    ...EMPTY,
    topic: initialTopic && (TOPICS as readonly string[]).includes(initialTopic) ? initialTopic : 'other',
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [failureCode, setFailureCode] = useState<string | null>(null);
  const [startedTracked, setStartedTracked] = useState(false);

  const honeypotRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const ids = {
    name: useId(),
    email: useId(),
    company: useId(),
    topic: useId(),
    message: useId(),
  };

  const messageForError = (error?: string) => {
    switch (error) {
      case 'required':
        return ui.contact.required;
      case 'invalid-email':
        return ui.contact.invalidEmail;
      case 'too-short':
        return ui.contact.tooShort;
      case 'too-long':
        return ui.contact.tooLong;
      default:
        return undefined;
    }
  };

  const update = (field: keyof InquiryInput) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    // Clear a field's error as soon as it is edited; re-validated on submit.
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (!startedTracked) {
      track('inquiry_started', { topic: values.topic });
      setStartedTracked(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!configured || status === 'submitting') return;

    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      // Move the reader to the summary so the failure is announced, not just
      // rendered somewhere below the fold.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus('submitting');
    setFailureCode(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: honeypotRef.current?.value ?? '' }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        errors?: InquiryErrors;
      };

      if (response.ok && payload.ok) {
        setStatus('accepted');
        track('inquiry_submitted', { topic: values.topic });
        return;
      }

      if (payload.errors) setErrors(payload.errors);
      setFailureCode(payload.code ?? 'unknown');
      setStatus('failed');
    } catch {
      setFailureCode('network-error');
      setStatus('failed');
    }
  };

  const remaining = LIMITS.message.max - values.message.length;

  if (status === 'accepted') {
    return (
      <div className="rounded-editorial border border-positive/40 bg-positive/5 p-6 sm:p-8" role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 flex-shrink-0 text-positive" size={22} aria-hidden="true" />
          <div>
            <h2 className="display-3 text-charcoal">{ui.contact.successTitle}</h2>
            <p className="measure mt-3 body-text text-muted">{ui.contact.successBody}</p>

            <h3 className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
              {ui.contact.whatHappensNext}
            </h3>
            <ol className="measure mt-3 space-y-2.5">
              {ui.contact.nextSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-[0.9375rem] leading-relaxed text-charcoal">
                  <span className="font-mono text-xs text-accent" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }

  const topicLabel = (topic: string) => {
    switch (topic) {
      case 'document-intelligence':
        return services['document-intelligence'].name;
      case 'forecasting':
        return services.forecasting.name;
      case 'reporting':
        return services.reporting.name;
      case 'cross-border':
        return services['cross-border'].name;
      default:
        return ui.contact.topicPlaceholder;
    }
  };

  const fieldClass = (invalid: boolean) =>
    `w-full rounded-md border bg-surface px-3.5 py-3 text-[1rem] text-charcoal transition-colors placeholder:text-muted-light focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
      invalid ? 'border-negative' : 'border-control'
    }`;

  return (
    <div>
      {!configured && (
        <div className="mb-8 rounded-editorial border border-caution/40 bg-caution/5 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 flex-shrink-0 text-caution" size={20} aria-hidden="true" />
            <div>
              <h2 className="text-base font-medium text-charcoal">{ui.contact.disabledTitle}</h2>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">{ui.contact.disabledBody}</p>
              <a
                href={mailtoHref('Project inquiry')}
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-[0.875rem] border border-control text-charcoal transition-colors duration-200 hover:border-accent hover:text-accent-hi"
                onClick={() => track('contact_email_clicked', { topic: values.topic })}
              >
                <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
                {CONTACT.email.address}
              </a>
            </div>
          </div>
        </div>
      )}

      {status === 'failed' && (
        <div
          className="mb-8 rounded-editorial border border-negative/40 bg-negative/5 p-5 sm:p-6"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 flex-shrink-0 text-negative" size={20} aria-hidden="true" />
            <div>
              <h2 className="text-base font-medium text-charcoal">
                {failureCode === 'not-configured' ? ui.contact.disabledTitle : ui.contact.failureTitle}
              </h2>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">
                {failureCode === 'not-configured' ? ui.contact.disabledBody : ui.contact.failureBody}
              </p>
              <a
                href={mailtoHref('Project inquiry', values.message)}
                className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] text-accent underline underline-offset-4"
                onClick={() => track('contact_email_clicked', { topic: values.topic })}
              >
                <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
                {CONTACT.email.address}
              </a>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {hasErrors(errors) && (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="mb-6 rounded-md border border-negative/40 bg-negative/5 px-4 py-3 text-[0.9375rem] text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {ui.contact.errorSummary}
          </div>
        )}

        {/* Honeypot. Hidden from sight and from assistive technology, and never
            auto-filled, so only a script fills it in. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${ids.name}-website`}>Website</label>
          <input
            ref={honeypotRef}
            id={`${ids.name}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={ids.name} className="mb-1.5 block text-[0.875rem] font-medium text-charcoal">
              {ui.contact.nameLabel}
            </label>
            <input
              id={ids.name}
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={!configured || status === 'submitting'}
              value={values.name}
              onChange={update('name')}
              placeholder={ui.contact.namePlaceholder}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${ids.name}-error` : undefined}
              className={fieldClass(Boolean(errors.name))}
            />
            {errors.name && (
              <p id={`${ids.name}-error`} className="mt-1.5 text-[0.8125rem] text-negative">
                {messageForError(errors.name)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={ids.email} className="mb-1.5 block text-[0.875rem] font-medium text-charcoal">
              {ui.contact.emailLabel}
            </label>
            <input
              id={ids.email}
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={!configured || status === 'submitting'}
              value={values.email}
              onChange={update('email')}
              placeholder={ui.contact.emailPlaceholder}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${ids.email}-error` : undefined}
              className={fieldClass(Boolean(errors.email))}
            />
            {errors.email && (
              <p id={`${ids.email}-error`} className="mt-1.5 text-[0.8125rem] text-negative">
                {messageForError(errors.email)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={ids.company} className="mb-1.5 block text-[0.875rem] font-medium text-charcoal">
              {ui.contact.companyLabel}{' '}
              <span className="font-normal text-muted-light">({ui.contact.companyOptional})</span>
            </label>
            <input
              id={ids.company}
              name="company"
              type="text"
              autoComplete="organization"
              disabled={!configured || status === 'submitting'}
              value={values.company}
              onChange={update('company')}
              placeholder={ui.contact.companyPlaceholder}
              className={fieldClass(Boolean(errors.company))}
            />
          </div>

          <div>
            <label htmlFor={ids.topic} className="mb-1.5 block text-[0.875rem] font-medium text-charcoal">
              {ui.contact.topicLabel}
            </label>
            <select
              id={ids.topic}
              name="topic"
              disabled={!configured || status === 'submitting'}
              value={values.topic}
              onChange={update('topic')}
              className={fieldClass(false)}
            >
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topicLabel(topic)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor={ids.message} className="mb-1.5 block text-[0.875rem] font-medium text-charcoal">
            {ui.contact.messageLabel}
          </label>
          <p id={`${ids.message}-hint`} className="mb-2 text-[0.8125rem] text-muted">
            {ui.contact.messageHint}
          </p>
          <textarea
            id={ids.message}
            name="message"
            rows={7}
            required
            maxLength={LIMITS.message.max}
            disabled={!configured || status === 'submitting'}
            value={values.message}
            onChange={update('message')}
            placeholder={ui.contact.messagePlaceholder}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={`${ids.message}-hint${errors.message ? ` ${ids.message}-error` : ''}`}
            className={`${fieldClass(Boolean(errors.message))} resize-y leading-relaxed`}
          />
          <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-2">
            {errors.message ? (
              <p id={`${ids.message}-error`} className="text-[0.8125rem] text-negative">
                {messageForError(errors.message)}
              </p>
            ) : (
              <span />
            )}
            <span
              className={`font-mono text-[0.75rem] ${remaining < 200 ? 'text-caution' : 'text-muted-light'}`}
              aria-live="polite"
            >
              {remaining} {ui.contact.charactersRemaining}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!configured || status === 'submitting'}
          className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-8 text-[0.9375rem] border border-control text-charcoal transition-colors duration-200 hover:border-accent hover:text-accent-hi disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'submitting' ? ui.contact.submitting : ui.contact.submit}
          {status !== 'submitting' && <ArrowRight size={17} strokeWidth={1.75} aria-hidden="true" />}
        </button>

        <p className="sr-only" aria-live="polite">
          {status === 'submitting' ? ui.contact.submitting : ''}
        </p>
      </form>

      <div className="mt-14 grid gap-8 border-t border-border pt-10 md:grid-cols-2">
        <div>
          <h2 className="text-base font-medium text-charcoal">{ui.contact.directTitle}</h2>
          <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">{ui.contact.directBody}</p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={mailtoHref('Project inquiry')}
              className="inline-flex min-h-[44px] items-center gap-2.5 text-[0.9375rem] text-charcoal transition-colors hover:text-accent"
              onClick={() => track('contact_email_clicked', { topic: values.topic })}
            >
              <Mail size={17} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
              <span className="underline underline-offset-4">{CONTACT.email.address}</span>
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2.5 text-[0.9375rem] text-charcoal transition-colors hover:text-accent"
            >
              <MessageCircle size={17} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
              <span className="underline underline-offset-4">
                {ui.contact.whatsappDirect} · {CONTACT.whatsapp.display}
              </span>
            </a>
          </div>
          <p className="measure mt-5 text-[0.8125rem] leading-relaxed text-muted-light">{ui.contact.noScheduling}</p>
        </div>

        <div>
          <h2 className="text-base font-medium text-charcoal">{ui.contact.privacyTitle}</h2>
          <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">{ui.contact.privacyBody}</p>
        </div>
      </div>
    </div>
  );
}
