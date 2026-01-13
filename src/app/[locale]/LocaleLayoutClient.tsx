'use client';

import { type Locale, getTranslation } from '@/lib/translations';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';

export default function LocaleLayoutClient({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const t = getTranslation(locale);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar locale={locale} t={t} />
      {children}
      <Footer t={t} locale={locale} />
    </div>
  );
}
