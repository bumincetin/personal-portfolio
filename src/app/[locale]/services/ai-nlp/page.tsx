import { Metadata } from 'next';
import { locales, type Locale, getTranslation } from '@/lib/translations';
import AINLPClient from './AINLPClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'AI & NLP Solutions | Bumin Kağan Çetin',
  description: 'Custom machine learning pipelines for sentiment analysis, document processing, and automation.',
};

export default async function AINLPPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const t = getTranslation(validLocale);
  
  return <AINLPClient locale={validLocale} t={t} />;
}
