import type { MetadataRoute } from 'next';
import { locales } from '@/lib/translations';

const SITE_URL = 'https://bumincetin.com';

const ROUTES = [
  '',
  '/methodology',
  '/assets',
  '/portal',
  '/why-sme',
  '/about',
  '/services/financial-analytics',
  '/services/ai-nlp',
  '/services/business-intelligence',
  '/services/financial-consultancy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((code) => [code, `${SITE_URL}/${code}${route}`])),
      },
    })),
  );
}
