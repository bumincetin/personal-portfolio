import { Metadata } from 'next';
import { locales, type Locale, getTranslation } from '@/lib/translations';
import BusinessIntelligenceClient from './BusinessIntelligenceClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Business Intelligence | Bumin Kağan Çetin',
  description: 'End-to-end dashboards and reporting systems transforming raw data into strategic insights.',
};

export default async function BusinessIntelligencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const t = getTranslation(validLocale);
  
  return <BusinessIntelligenceClient locale={validLocale} t={t} />;
}
