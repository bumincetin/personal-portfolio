import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/lib/translations';
import MethodologyPageClient from './MethodologyPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function MethodologyPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  return <MethodologyPageClient locale={locale} />;
}
