/**
 * Contact-form configuration.
 *
 * The form is only rendered as a working form when a mail provider is actually
 * configured. That is the whole reason this module exists: the previous
 * contact path composed a message and handed it to the visitor's own mail app,
 * which was honest but meant nothing was ever received by the site. Replacing
 * it with a form that posts into a void would have been worse.
 *
 * So: `isContactConfigured()` is checked on the server, passed to the page, and
 * when it is false the UI shows the verified email address and says the form is
 * not connected instead of pretending to accept a submission.
 *
 * Required environment variables (see docs/launch-checklist.md):
 *
 *   RESEND_API_KEY    Server-side secret. `wrangler secret put RESEND_API_KEY`.
 *   CONTACT_TO_EMAIL  Where inquiries are delivered.
 *   CONTACT_FROM_EMAIL  A verified sender on the Resend account.
 *
 * None of these are ever exposed to the client. The page receives a single
 * boolean.
 */

export interface ContactConfig {
  apiKey: string;
  to: string;
  from: string;
}

/**
 * Resolves the provider configuration, or null when it is incomplete.
 *
 * Deliberately returns null rather than throwing on a partial configuration:
 * a half-configured provider must behave exactly like an unconfigured one, or
 * the UI would offer a form that fails at submit time.
 */
export function getContactConfig(): ContactConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

export const isContactConfigured = (): boolean => getContactConfig() !== null;
