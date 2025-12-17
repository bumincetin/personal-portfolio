import { locales, type Locale } from '@/lib/translations';
import MethodologyPageClient from './MethodologyPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function MethodologyPage({ params }: { params: { locale: Locale } }) {
  return <MethodologyPageClient locale={params.locale} />;
}
