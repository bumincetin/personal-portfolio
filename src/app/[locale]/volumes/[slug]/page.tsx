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

export const dynamicParams = false;

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
