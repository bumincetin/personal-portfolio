import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/lib/translations';
import WhySMEPageClient from './WhySMEPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function WhySMEPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  return <WhySMEPageClient locale={locale} />;
}
