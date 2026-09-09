import type { Metadata } from 'next';
import { locales, type Locale } from './translations';
import { PROFILE } from './profile';

/**
 * Per-page metadata.
 *
 * One helper so that every indexable page gets a unique title, a unique
 * description, a self-referencing canonical, and reciprocal language
 * annotations — and so that none of those can drift apart page by page.
 *
 * Two rules encoded here:
 *
 *  - The brand appears exactly once. A page passes its own name
 *    ("Document Intelligence & NLP Consulting") and this helper appends the
 *    brand, giving "Document Intelligence & NLP Consulting | Bumin Kağan Çetin".
 *    It does so as an absolute title rather than relying on the layout's
 *    template, because a template does not reach a page in its own segment.
 *  - `alternates.languages` is only generated for paths that genuinely exist in
 *    every locale. Every route on this site does, because `generateStaticParams`
 *    builds all three from the same source — but `hreflang` takes the path
 *    explicitly rather than inferring it, so a future locale-specific page
 *    cannot silently advertise siblings that 404.
 */

export const SITE_URL = PROFILE.siteUrl;

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_GB',
  tr: 'tr_TR',
  it: 'it_IT',
};

export interface PageMetaInput {
  locale: Locale;
  /** Path after the locale segment, starting with `/`, or `''` for the home page. */
  path: string;
  title: string;
  description: string;
  /** Set false for pages that should exist but not be indexed. */
  index?: boolean;
  /** Absolute or root-relative image path. */
  image?: string;
  type?: 'website' | 'article';
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  index = true,
  image = '/portrait.jpg',
  type = 'website',
}: PageMetaInput): Metadata {
  const canonical = `/${locale}${path}`;
  const fullTitle = `${title} | ${PROFILE.name}`;

  return {
    /*
     * Absolute, not templated. A parent's `title.template` applies to child
     * segments only, so the home page — whose page.tsx sits in the same segment
     * as the layout that defines the template — silently rendered without the
     * brand while every other page had it. Setting the full title here makes
     * every page follow the same rule and the brand appear exactly once.
     */
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical,
      languages: {
        // Reciprocal annotations for the real equivalents of this page.
        ...Object.fromEntries(locales.map((code) => [code, `/${code}${path}`])),
        // English is the default for anything not matched by a locale.
        'x-default': `/en${path}`,
      },
    },
    robots: index
      ? { index: true, follow: true }
      : // Pages that must not enter the index: generated results and anything
        // derived from what a visitor supplied.
        { index: false, follow: false, nocache: true },
    openGraph: {
      type,
      siteName: PROFILE.name,
      locale: OG_LOCALE[locale],
      url: `${SITE_URL}${canonical}`,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: PROFILE.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
