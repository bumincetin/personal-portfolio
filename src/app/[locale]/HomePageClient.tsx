'use client';

import { getTranslation, type Locale } from '@/lib/translations';
import Hero from '../sections/Hero';
import TheDataSculptor from '../sections/TheDataSculptor';
import FocusAreas from '../sections/FocusAreas';
import ResearchLab from '../sections/ResearchLab';
import About from '../sections/About';

export default function HomePageClient({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <main>
      <Hero t={t} locale={locale} />
      <TheDataSculptor t={t} locale={locale} />
      <FocusAreas t={t} locale={locale} />
      <ResearchLab locale={locale} />
      <About t={t} locale={locale} />
    </main>
  );
}
