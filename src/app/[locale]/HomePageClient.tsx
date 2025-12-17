'use client';

import { getTranslation, type Locale } from '@/lib/translations';
import Hero from '../sections/Hero';
import Ticker from '../sections/Ticker';
import Methodology from '../sections/Methodology';
import Assets from '../sections/Assets';
import About from '../sections/About';

export default function HomePageClient({ locale }: { locale: Locale }) {
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

