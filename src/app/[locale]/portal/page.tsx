import { notFound } from 'next/navigation';
import { locales, isLocale, getTranslation } from '@/lib/translations';
import PortalPageClient from './PortalPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PortalPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const t = getTranslation(locale);
  return <PortalPageClient locale={locale} t={t} />;
}
