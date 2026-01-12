import { Metadata } from 'next';
import { locales, type Locale, getTranslation } from '@/lib/translations';
import FinancialAnalyticsClient from './FinancialAnalyticsClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Financial Analytics | Bumin Kağan Çetin',
  description: 'Predictive modeling, risk assessment, and quantitative analysis for informed investment decisions.',
};

export default async function FinancialAnalyticsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const t = getTranslation(validLocale);
  
  return <FinancialAnalyticsClient locale={validLocale} t={t} />;
}
