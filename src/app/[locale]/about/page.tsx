import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/lib/translations';
import AboutPageClient from './AboutPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  return <AboutPageClient locale={locale} />;
}
