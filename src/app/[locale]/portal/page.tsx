import { type Locale, locales, getTranslation } from '@/lib/translations';
import PortalPageClient from './PortalPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function PortalPage({ params }: { params: { locale: Locale } }) {
  const t = getTranslation(params.locale);
  return <PortalPageClient locale={params.locale} t={t} />;
}
