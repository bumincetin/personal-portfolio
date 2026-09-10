import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isLocale } from '@/lib/translations';
import { getVolume, volumeSlugs } from '@/lib/content/volume-pages';
import { pageMetadata } from '@/lib/seo';
import VolumeReader from '@/app/components/sketchbook/VolumeReader';
import TrackView from '@/app/components/content/TrackView';

/**
 * One volume, read as a book.
 *
 * These seven routes replace what used to be a services index, four service
 * pages, a work index and four case-study pages. The material is the same and
 * none of it was cut — it is bound into volumes instead of scattered across a
 * conventional site, and each one is reached from the shelf on the home page.
 *
 * The old URLs are permanently redirected here by next.config.js.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) => volumeSlugs.map((slug) => ({ locale, slug })));
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

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  if (!isLocale(locale)) return {};
  const volume = getVolume(locale, slug);
  if (!volume) return {};

  return pageMetadata({
    locale,
    path: `/volumes/${slug}`,
    // The problem, not the technique — the same rule the shelf follows.
    title: `${volume.title} — ${volume.discipline}`,
    description: volume.deck,
    type: 'article',
  });
}

export default async function VolumePage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params;
  if (!isLocale(locale)) notFound();

  const volume = getVolume(locale, slug);
  if (!volume) notFound();

  return (
    <>
      <TrackView event="volume_viewed" props={{ slug, kind: volume.spine.kind }} />
      <VolumeReader locale={locale} volume={volume} />
    </>
  );
}
