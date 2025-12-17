'use client';

import { useParams } from 'next/navigation';
import { getTranslation, type Locale, locales } from '@/lib/translations';
import Hero from '../sections/Hero';
import Ticker from '../sections/Ticker';
import Methodology from '../sections/Methodology';
import Assets from '../sections/Assets';
import About from '../sections/About';

export default function LocaleHome() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const t = getTranslation(locale);

  return (
    <main>
      <Hero t={t} locale={locale} />
      <Ticker t={t} />
      <Methodology t={t} locale={locale} />
      <Assets t={t} locale={locale} />
      <About t={t} locale={locale} />
    </main>
  );
}

