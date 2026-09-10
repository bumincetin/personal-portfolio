import type { MetadataRoute } from 'next';
import { locales } from '@/lib/translations';
import { volumeSlugs } from '@/lib/content/volume-pages';
import { SITE_URL } from '@/lib/seo';

/**
 * Sitemap.
 *
 * The site is a shelf, seven volumes and a contact page. Volume slugs come from
 * the same source the routes do, so a new volume cannot be added without
 * appearing here.
 *
 * The retired paths (/methodology, /assets, /services/*, /why-sme, /portal,
 * /about) are deliberately absent: they now 308 to their volume, and listing a
 * redirect in a sitemap is a instruction to crawl something that no longer
 * exists.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/front-matter', '/chapters', '/contact', ...volumeSlugs.map((slug) => `/volumes/${slug}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path === '/contact' ? 0.9 : 0.8,
      alternates: {
        languages: {
          // Every route exists in all three locales, generated from one source.
          ...Object.fromEntries(locales.map((code) => [code, `${SITE_URL}/${code}${path}`])),
          'x-default': `${SITE_URL}/en${path}`,
        },
      },
    })),
  );
}
