import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The upload/analysis tool has nothing to index and its results are
      // per-visitor, so keep it out of search results.
      disallow: '/api/',
    },
    sitemap: 'https://bumincetin.com/sitemap.xml',
  };
}
