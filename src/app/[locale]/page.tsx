import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isLocale } from '@/lib/translations';
import { getUI } from '@/lib/content/ui';
import { pageMetadata } from '@/lib/seo';
import ExperienceHome from '@/app/components/experience/ExperienceHome';

/** Server-rendered catalogue. The immersive shelf loads after explicit activation. */
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

  return <ExperienceHome locale={locale} />;
}
