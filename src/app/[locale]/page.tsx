import { locales, type Locale } from '@/lib/translations';
import HomePageClient from './HomePageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleHomePage({ params }: { params: { locale: Locale } }) {
  return <HomePageClient locale={params.locale} />;
}
