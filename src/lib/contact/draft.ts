import type { Locale } from '../translations';
import { getExperienceCopy } from '../experience-copy';
import { CONTACT } from '../profile';

export interface ConversationAnswers { name: string; company: string; topic: number; idea: string; timing: number }
export function composeInquiry(locale: Locale, answers: ConversationAnswers) {
  const c = getExperienceCopy(locale);
  const company = answers.company.trim();
  const identity = locale === 'tr'
    ? `${c.introduction} ${company ? `${company} ${c.from} ` : ''}${answers.name.trim()}.`
    : `${c.introduction} ${answers.name.trim()}${company ? ` ${c.from} ${company}` : ''}.`;
  return `${c.greeting}\n\n${identity}\n${c.interest}: ${c.topics[answers.topic] ?? c.topics[4]}.\n\n${answers.idea.trim()}\n\n${c.timingLabel}: ${c.timings[answers.timing] ?? c.timings[3]}.\n\n${c.closing}`;
}
export function outlookHref(subject: string, body: string, app = false) {
  const query = `to=${encodeURIComponent(CONTACT.email.address)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return app ? `ms-outlook://compose?${query}` : `https://outlook.office.com/mail/deeplink/compose?${query}`;
}
