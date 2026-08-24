import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

/*
 * next/font self-hosts these and inlines the @font-face declarations, so there
 * is no render-blocking request to fonts.googleapis.com on first paint.
 * `display: swap` keeps text visible while the files arrive.
 */
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

const SITE_URL = 'https://bumincetin.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bumin Kağan Çetin — Data Science & Financial Analytics',
    template: '%s — Bumin Kağan Çetin',
  },
  description:
    'Data scientist and AI specialist based in Milan. Financial analytics, NLP and business intelligence for small and mid-sized enterprises.',
  keywords: [
    'data scientist',
    'financial analytics',
    'NLP',
    'business intelligence',
    'Bocconi',
    'Milan',
    'SME consulting',
  ],
  authors: [{ name: 'Bumin Kağan Çetin', url: SITE_URL }],
  creator: 'Bumin Kağan Çetin',
  alternates: {
    canonical: '/en',
    languages: {
      en: '/en',
      tr: '/tr',
      it: '/it',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Bumin Kağan Çetin',
    url: SITE_URL,
    title: 'Bumin Kağan Çetin — Data Science & Financial Analytics',
    description:
      'Data scientist and AI specialist based in Milan. Financial analytics, NLP and business intelligence for small and mid-sized enterprises.',
    images: [{ url: '/portrait.webp', width: 1000, height: 1333, alt: 'Bumin Kağan Çetin' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bumin Kağan Çetin — Data Science & Financial Analytics',
    description:
      'Data scientist and AI specialist based in Milan. Financial analytics, NLP and business intelligence for SMEs.',
    images: ['/portrait.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#08070C',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-cream font-sans text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
