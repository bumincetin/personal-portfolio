import { locales, type Locale } from '@/lib/translations';
import AssetsPageClient from './AssetsPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AssetsPage({ params }: { params: { locale: Locale } }) {
  return <AssetsPageClient locale={params.locale} />;
}
