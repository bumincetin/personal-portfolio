/**
 * Identity, contact channels and organisational boundaries — one source of
 * truth for anything the site says about who is behind it.
 *
 * Rules this file exists to enforce:
 *
 *  - One published email address. The site previously showed a Gmail address in
 *    the footer/booking dialog and a `@studbocconi.it` student address on the
 *    About page. A student address is tied to enrolment and is the one most
 *    likely to be deprovisioned, so the Gmail address — the one the working
 *    contact paths already used — is the published one. A domain address on
 *    bumincetin.com would be better; it is recorded as a launch task rather
 *    than published before it exists.
 *
 *  - No open-ended role claims. The record available in this repository dates
 *    every engagement with an end. Nothing here says "present", and no title is
 *    asserted that the record does not carry (see `docs/content-verification.md`
 *    for the three conflicting Alvolo titles and what was done about them).
 *
 *  - Regulated work is attributed, not implied. `RESPONSIBILITY` is what keeps
 *    the cross-border page from reading as one person offering notary, tax and
 *    legal services.
 */

export const PROFILE = {
  name: 'Bumin Kağan Çetin',
  /** Used where a full name would crowd the line. */
  shortName: 'Bumin Çetin',
  initials: 'BKÇ',
  city: 'Milan',
  country: 'Italy',
  /** Working languages, from the About page's own language table. */
  workingLanguages: ['English', 'Italian', 'Turkish'],
  siteUrl: 'https://bumincetin.com',
} as const;

/**
 * Contact channels. `verified` means the value is already in use in this
 * repository as a real destination — not that delivery has been tested from a
 * deployed build. Anything unverified must not be rendered.
 */
export const CONTACT = {
  email: {
    address: 'cetinbumink@gmail.com',
    verified: true,
  },
  /** Kept from the existing booking dialog; +39 348 170 5207. */
  whatsapp: {
    number: '393481705207',
    display: '+39 348 170 5207',
    verified: true,
  },
  linkedin: {
    url: 'https://linkedin.com/in/buminkcetin',
    handle: 'buminkcetin',
    verified: true,
  },
  github: {
    url: 'https://github.com/bumincetin',
    handle: 'bumincetin',
    verified: true,
  },
  /**
   * No scheduling provider is connected. Until one is, "Book a call" must not
   * appear anywhere: the primary action is an inquiry, which is a promise the
   * site can actually keep. See docs/launch-checklist.md.
   */
  scheduling: {
    url: null as string | null,
    verified: false,
  },
} as const;

/**
 * Who does what. The cross-border offer involves work that in Italy is reserved
 * to regulated professionals (notaries, commercialisti, avvocati). The site may
 * say that such work is coordinated; it may not say it is performed here.
 */
export const RESPONSIBILITY = {
  /** Performed personally. */
  firstParty: 'first-party',
  /** Alvolo Consulting as an organisation. Dates are closed in the record. */
  alvolo: 'alvolo',
  /** Referred to, and performed by, a licensed professional. */
  partner: 'partner',
} as const;

export type ResponsibilityKind = (typeof RESPONSIBILITY)[keyof typeof RESPONSIBILITY];

export const mailtoHref = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${CONTACT.email.address}${query ? `?${query}` : ''}`;
};

export const whatsappHref = (text?: string) =>
  `https://wa.me/${CONTACT.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
