import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/lib/translations';
import AssetsPageClient from './AssetsPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AssetsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  return <AssetsPageClient locale={locale} />;
}
