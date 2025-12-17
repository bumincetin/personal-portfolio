import { locales, type Locale } from '@/lib/translations';
import LocaleLayoutClient from './LocaleLayoutClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return <LocaleLayoutClient locale={params.locale}>{children}</LocaleLayoutClient>;
}
