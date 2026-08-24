import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/lib/translations';
import HomePageClient from './HomePageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  return <HomePageClient locale={locale} />;
}
