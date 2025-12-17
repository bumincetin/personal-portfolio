'use client';

import { useParams } from 'next/navigation';
import { locales, type Locale, getTranslation } from '@/lib/translations';
import Navbar from '../components/Navbar';
import BackgroundMesh from '../components/BackgroundMesh';
import Footer from '../sections/Footer';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
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
