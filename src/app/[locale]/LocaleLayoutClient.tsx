'use client';

import { type Locale, getTranslation } from '@/lib/translations';
import Navbar from '../components/Navbar';
import BackgroundMesh from '../components/BackgroundMesh';
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
    <>
      <BackgroundMesh />
      <Navbar locale={locale} t={t} />
      {children}
      <Footer t={t} />
    </>
  );
}


