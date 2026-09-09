import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { locales, isLocale, type Locale } from '@/lib/translations';
import { getUI } from '@/lib/content/ui';
import { PROFILE } from '@/lib/profile';
import { SITE_URL } from '@/lib/seo';
import Navbar from '../components/Navbar';
import GrainOverlay from '../components/ui/GrainOverlay';

/**
 * Root layout.
 *
 * This *is* the root layout — there is no `src/app/layout.tsx` above it, and
 * that is deliberate. The previous arrangement had the root layout own
 * `<html lang="en">`, which meant every Turkish and Italian page told browsers
 * and screen readers it was English. A root layout cannot see the locale
 * segment, so the only correct fix is for the segment that knows the locale to
 * own the document. `/` is redirected to `/en` by next.config.js instead of by
 * a page component, so nothing lives outside this segment.
 *
 * next/font self-hosts the three faces and inlines their @font-face rules, so
 * there is no render-blocking round-trip to a font host on first paint.
 */

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
});

/**
 * Display face, used for the brand line and a small number of editorial
 * moments. Turkish and Italian copy needs latin-ext.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const resolved: Locale = isLocale(locale) ? locale : 'en';
  const ui = getUI(resolved);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${PROFILE.name} — ${ui.home.heroEyebrow}`,
      // Page titles supply their own name; the brand is appended exactly once.
      template: `%s | ${PROFILE.name}`,
    },
    description: ui.home.heroLede,
    authors: [{ name: PROFILE.name, url: SITE_URL }],
    creator: PROFILE.name,
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  // One ground, so one hint. #171A24 is the shelf's --paper: the browser chrome
  // and the canvas are the same colour.
  themeColor: '#171A24',
  colorScheme: 'dark',
};

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const { children } = props;

  // `generateStaticParams` covers the known locales; anything else is a 404
  // rather than a page rendered with undefined copy.
  if (!isLocale(locale)) notFound();

  const ui = getUI(locale);

  return (
    /*
      * No pre-paint script.
      *
      * There used to be one, doing two jobs: resolving a stored theme before
      * first paint, and stamping a `js` class that every scroll-reveal rule was
      * gated on. There is one palette now and nothing reveals on scroll, so the
      * document ships without an inline script and without the hydration
      * suppression that went with it.
      */
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-cream font-sans text-charcoal antialiased">
        <div className="relative min-h-screen">
          <GrainOverlay />

          <a
            href="#main"
            className="sr-only rounded focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-cream"
          >
            {ui.nav.skipToContent}
          </a>

          <Navbar locale={locale} />
          {/* A wrapper, not a landmark: each page renders its own <main>,
              and nesting one inside another would break the landmark tree.

              There is no footer here. The shelf and the reader fill the
              viewport and do not scroll, so a footer below them would be
              present in the DOM and unreachable — worse than absent. The
              contact page, which does scroll, renders it itself; the site
              disclaimer travels with the colophon page of every volume, and
              the shelf carries it under the static catalogue. */}
          <div id="main" className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
