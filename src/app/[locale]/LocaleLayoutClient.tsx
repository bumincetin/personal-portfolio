'use client';

import { type Locale, getTranslation } from '@/lib/translations';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import dynamic from 'next/dynamic';

// Dynamically import ThreeBackground to prevent SSR issues
const ThreeBackground = dynamic(() => import('../components/ThreeBackground'), {
  ssr: false,
});

export default function LocaleLayoutClient({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const t = getTranslation(locale);

  return (
    <div className="min-h-screen bg-cream relative">
      <ThreeBackground />
      <Navbar locale={locale} t={t} />
      {children}
      <Footer t={t} locale={locale} />
    </div>
  );
}
