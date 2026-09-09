import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isLocale } from '@/lib/translations';
import { getUI } from '@/lib/content/ui';
import { pageMetadata } from '@/lib/seo';
import Shelf from '@/app/components/shelf/Shelf';

/**
 * Home.
 *
 * The shelf, and nothing else. Seven hardcovers, each titled by an expensive
 * problem rather than by a technique, each opening onto the pages that answer
 * it — and the front matter, which is the argument they all rest on.
 *
 * There used to be six sections of prose below the canvas, in the old site's
 * material. Two things were wrong with that. The argument that matters most —
 * what these problems cost while they go unfixed — was the one part of the site
 * rendered in a different design; and a page that scrolls under a scene whose
 * wheel gesture browses volumes gives one gesture two meanings. All of it is
 * front matter now, turned page by page in the same binding as everything else.
 *
 * Server component. `Shelf` is the single client boundary and loads the
 * Three.js engine on demand, so no other route pays for it.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const ui = getUI(locale);

  return pageMetadata({
    locale,
    path: '',
    // The brand is appended by pageMetadata, so this carries the offer only.
    title: ui.home.metaTitle,
    description: ui.home.heroLede,
  });
}

export default async function LocaleHomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  return <Shelf locale={locale} readHref={`/${locale}/front-matter`} />;
}
