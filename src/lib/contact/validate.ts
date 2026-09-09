/**
 * Inquiry validation.
 *
 * Shared by the client (for immediate feedback) and the server (which is the
 * only one that decides anything). The client copy is a convenience; the server
 * re-runs the identical function on the parsed body, so a crafted request gets
 * the same treatment as a typed one.
 *
 * Field codes rather than messages: the messages live in the localised UI
 * strings, so the same validator serves all three locales and an error can
 * never appear in the wrong language.
 */

export const TOPICS = ['document-intelligence', 'forecasting', 'reporting', 'cross-border', 'other'] as const;
export type Topic = (typeof TOPICS)[number];

export const LIMITS = {
  name: { min: 1, max: 120 },
  email: { max: 200 },
  company: { max: 160 },
  message: { min: 20, max: 4000 },
} as const;

export type FieldError = 'required' | 'invalid-email' | 'too-short' | 'too-long';

export interface InquiryInput {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryInput, FieldError>>;

/**
 * Deliberately permissive. The job of this pattern is to catch a typo, not to
 * adjudicate RFC 5322 — over-strict email validation rejects real addresses,
 * and the real test of an address is whether the reply arrives.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {};

  const name = input.name?.trim() ?? '';
  if (!name) errors.name = 'required';
  else if (name.length > LIMITS.name.max) errors.name = 'too-long';

  const email = input.email?.trim() ?? '';
  if (!email) errors.email = 'required';
  else if (email.length > LIMITS.email.max) errors.email = 'too-long';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'invalid-email';

  const company = input.company?.trim() ?? '';
  if (company.length > LIMITS.company.max) errors.company = 'too-long';

  const message = input.message?.trim() ?? '';
  if (!message) errors.message = 'required';
  else if (message.length < LIMITS.message.min) errors.message = 'too-short';
  else if (message.length > LIMITS.message.max) errors.message = 'too-long';

  // Topic is a select with a known set; anything else is a malformed request
  // rather than a user mistake, so it is normalised rather than rejected.
  return errors;
}

export const normaliseTopic = (topic: string): Topic =>
  (TOPICS as readonly string[]).includes(topic) ? (topic as Topic) : 'other';

export const hasErrors = (errors: InquiryErrors): boolean => Object.keys(errors).length > 0;
