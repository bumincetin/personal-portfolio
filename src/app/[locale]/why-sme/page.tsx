import { locales, type Locale } from '@/lib/translations';
import WhySMEPageClient from './WhySMEPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function WhySMEPage({ params }: { params: { locale: Locale } }) {
  return <WhySMEPageClient locale={params.locale} />;
}
