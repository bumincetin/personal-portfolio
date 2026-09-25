import React from 'react';
import { CONTACT, PROFILE } from '@/lib/profile';
import { SITE_URL } from '@/lib/seo';

/**
 * Person structured data, on the About page only.
 *
 * Scoped hard to what the record actually supports. Deliberately absent:
 *
 *  - `jobTitle` and `worksFor`. The site carried three different Alvolo titles
 *    and the engagement is dated closed; asserting a current title in machine-
 *    readable form would be the same unverified claim in a more durable format.
 *  - `award`, `aggregateRating`, `review`. Nothing to cite.
 *  - `email`. Publishing it in JSON-LD adds nothing a crawler needs and hands
 *    it to scrapers in a convenient shape; the page shows it to people.
 *
 * `alumniOf` is included because two completed degrees are stated with dates on
 * the same page, and `knowsLanguage` because the language table is on it too.
 */
export default function PersonSchema({ path }: { path: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    url: `${SITE_URL}${path}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: PROFILE.city,
      addressCountry: 'IT',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Bocconi University',
    },
    knowsLanguage: ['en', 'it', 'tr'],
    sameAs: [CONTACT.linkedin.url, CONTACT.github.url],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from a literal built above; no user input reaches it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
