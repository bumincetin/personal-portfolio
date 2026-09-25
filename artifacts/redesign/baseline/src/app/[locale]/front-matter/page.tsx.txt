import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isLocale } from '@/lib/translations';
import { getFrontMatter } from '@/lib/content/volume-pages';
import { getUI } from '@/lib/content/ui';
import { pageMetadata } from '@/lib/seo';
import VolumeReader from '@/app/components/sketchbook/VolumeReader';

/**
 * The front matter, read as a book.
 *
 * This is the argument the shelf rests on — what these problems cost while they
 * go unfixed, how an engagement runs, and the figures that can be checked. It
 * was the prose below the canvas on the home page; it is pages now, in the same
 * binding as everything else, because the most important argument on the site
 * should not be the one part of it rendered in a different material.
 *
 * It is not a volume: it has no cover on the shelf and no roman numeral, which
 * is what front matter is.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/*
 * No `dynamicParams = false` here, and that is deliberate.
 *
 * It used to be, as belt-and-braces on top of the `notFound()` calls below —
 * and on Cloudflare it was the belt that strangled the page. Every volume and
 * the front matter answered 404 in production while the shelf and the colophon
 * were fine, and the two sets differ by exactly this line. The 404s carried
 * `x-nextjs-cache: MISS`: the prerendered page was not found at the edge, and
 * `dynamicParams = false` forbids rendering it on demand, so the request had
 * nowhere to go.
 *
 * Nothing is lost by removing it. An unknown locale or slug still 404s, because
 * that is decided by the guards in the component rather than by the config —
 * which is where a decision like that belongs anyway.
 */

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const ui = getUI(locale);

  return pageMetadata({
    locale,
    path: '/front-matter',
    title: ui.home.costTitle,
    description: ui.home.costLede,
    type: 'article',
  });
}

export default async function FrontMatterPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  return <VolumeReader locale={locale} volume={getFrontMatter(locale)} />;
}
