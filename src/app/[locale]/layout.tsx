import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isLocale, getTranslation, type Locale } from '@/lib/translations';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import FieldBackdrop from '../components/FieldBackdrop';
import HudCursor from '../components/ui/HudCursor';
import GrainOverlay from '../components/ui/GrainOverlay';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const DESCRIPTIONS: Record<Locale, string> = {
  en: 'Data scientist and AI specialist in Milan. Financial analytics, NLP and business intelligence for small and mid-sized enterprises.',
  tr: 'Milano merkezli veri bilimci ve yapay zekâ uzmanı. KOBİ’ler için finansal analitik, NLP ve iş zekâsı.',
  it: 'Data scientist e specialista AI a Milano. Analisi finanziaria, NLP e business intelligence per le PMI.',
};

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};

  return {
    description: DESCRIPTIONS[locale],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}`])),
    },
    openGraph: { locale, description: DESCRIPTIONS[locale] },
  };
}

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const { locale } = await props.params;
  const { children } = props;

  // `generateStaticParams` covers the known locales; anything else is a 404
  // rather than a page rendered with undefined copy.
  if (!isLocale(locale)) notFound();

  const t = getTranslation(locale);

  // No background colour on the wrapper: an opaque parent would paint over the
  // fixed canvas sitting beneath it. The ground colour lives on <body>.
  return (
    <div className="relative min-h-screen">
      <FieldBackdrop />
      <GrainOverlay />
      <HudCursor />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-cream"
      >
        Skip to content
      </a>

      <Navbar locale={locale} t={t} />
      <div id="main" className="relative z-10">
        {children}
      </div>
      <Footer t={t} locale={locale} />
    </div>
  );
}
