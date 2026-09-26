import palette from "@/lib/palette.json";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import "../components/experience/system.css";
import "../components/experience/palette.css";
import "../components/experience/refinement.css";
import { locales, isLocale, type Locale } from "@/lib/translations";
import { getUI } from "@/lib/content/ui";
import { getPortfolioUI } from "@/lib/content/portfolio-ui";
import { getLibraryUI } from "@/lib/content/library-ui";
import { getWorkVolumes } from "@/lib/content/volumes";
import { PROFILE } from "@/lib/profile";
import { SITE_URL } from "@/lib/seo";
import Navbar from "../components/experience/ExperienceNavigation";
import MotionProvider from "../components/ui/MotionProvider";
import "../components/experience/portfolio.css";
import "../components/experience/world/world.css";

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
 * Inter is self-hosted by Next; Instrument Serif is served from /fonts.
 */

const inter = localFont({
  src: "../../../public/fonts/inter-portfolio.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-sans",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const resolved: Locale = isLocale(locale) ? locale : "en";
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
  // Match the warm page ground in browser chrome.
  themeColor: palette["black"],
  colorScheme: "light",
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
  const library = getLibraryUI(locale);
  const portfolio = getPortfolioUI(locale);
  const books = getWorkVolumes(locale).map(
    ({ id, href, roman, title, discipline }) => ({
      id,
      href,
      roman,
      title,
      discipline,
    }),
  );

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
    <html lang={locale} className={inter.variable}>
      <head>
        <link
          rel="preload"
          href="/fonts/instrument-serif-italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-cream font-sans text-charcoal antialiased">
        <MotionProvider>
          <div className="relative min-h-screen">
            <a
              href="#main"
              className="sr-only rounded focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-cream"
            >
              {ui.nav.skipToContent}
            </a>

            <Navbar
              locale={locale}
              nav={{
                ...ui.nav,
                shelf: library.home,
                frontMatter: library.approach,
                volumes: portfolio.work,
                contact: library.contact,
              }}
              about={library.about}
              books={books}
            />
            <noscript>
              <style>{".atlas-menu-trigger{display:none}"}</style>
              <nav className="no-script-nav" aria-label={ui.nav.mainLabel}>
                <a href={`/${locale}`}>{library.directory}</a>
                <a href={`/${locale}/front-matter`}>{library.approach}</a>
                <a href={`/${locale}/chapters`}>{library.about}</a>
                <a href={`/${locale}/contact`}>{ui.nav.contact}</a>
              </nav>
            </noscript>
            {/* Each page owns its main landmark and footer. */}
            <div id="main" tabIndex={-1} className="relative z-10">
              {children}
            </div>
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
