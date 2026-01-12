import { Metadata } from 'next';
import { locales, type Locale, getTranslation } from '@/lib/translations';
import FinancialConsultancyClient from './FinancialConsultancyClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Financial Consultancy | Bumin Kağan Çetin',
  description: 'Cross-border advisory, regulatory compliance guidance, and strategic financial planning.',
};

export default async function FinancialConsultancyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const t = getTranslation(validLocale);
  
  return <FinancialConsultancyClient locale={validLocale} t={t} />;
}
