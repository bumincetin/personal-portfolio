'use client';

import { getTranslation, type Locale } from '@/lib/translations';
import Hero from '../sections/Hero';
import FocusAreas from '../sections/FocusAreas';
import About from '../sections/About';

export default function HomePageClient({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <main className="bg-cream">
      <Hero t={t} locale={locale} />
      <FocusAreas t={t} locale={locale} />
      <About t={t} locale={locale} />
    </main>
  );
}
