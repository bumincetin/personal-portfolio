import { locales, type Locale } from '@/lib/translations';
import AboutPageClient from './AboutPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  return <AboutPageClient locale={params.locale} />;
}
