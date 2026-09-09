/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
   * Build output directory, overridable per process.
   *
   * A dev server and a production server sharing one `.next` corrupt each
   * other: dev rewrites the directory continuously while `next start` is still
   * serving asset URLs stamped with the previous build id, which shows up as
   * 400s on chunks and then 500s on pages. Running dev with
   * `NEXT_DIST_DIR=.next-dev` keeps the two apart so the browser smoke tests
   * can run against a production build while dev stays up.
   */
  distDir: process.env.NEXT_DIST_DIR || '.next',

  images: {
    // Serve modern formats first; the source art in /public is already WebP.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Rewrites barrel imports to per-icon/per-export paths so a single `import
  // { ArrowRight }` does not pull the whole library into the client bundle.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
  productionBrowserSourceMaps: false,

  /**
   * The locale segment owns the document (see src/app/[locale]/layout.tsx), so
   * there is no page at the bare root to redirect from. A config redirect does
   * the job before any React runs, and 308 tells crawlers the canonical home is
   * /en rather than /.
   */
  async redirects() {
    /*
     * The site is now a shelf of seven volumes plus a contact page. The pages
     * that used to hold this material — a services index, four service pages, a
     * work index, four case studies, the SME page, the About page and the demo
     * portal — are gone, and their content is bound into the volumes.
     *
     * Every one of those URLs was live and indexable, so each redirects
     * permanently to the volume that now carries its content rather than being
     * left to 404. `:locale` keeps the visitor in the language they arrived in.
     */
    const volume = (from, slug) => ({
      source: `/:locale(en|tr|it)${from}`,
      destination: `/:locale/volumes/${slug}`,
      permanent: true,
    });

    return [
      { source: '/', destination: '/en', permanent: true },

      // Service pages -> the four service volumes.
      volume('/services/ai-nlp', 'document-intelligence'),
      volume('/services/financial-analytics', 'forecasting'),
      volume('/services/business-intelligence', 'reporting'),
      volume('/services/financial-consultancy', 'cross-border'),

      // Case studies -> the three evidence volumes.
      volume('/assets/greenwashing-risk-scoring', 'greenwashing-risk-scoring'),
      volume('/assets/parliamentary-seat-forecast', 'parliamentary-seat-forecast'),
      volume('/assets/portfolio-optimizer', 'portfolio-optimizer'),
      volume('/assets/statement-review', 'document-intelligence'),

      /*
       * Indexes and the retired pages go to the shelf, which is where their
       * subject matter now lives. The SME page's argument survives as the
       * "what it costs" section of the home page; the demo portal is retired.
       */
      { source: '/:locale(en|tr|it)/services', destination: '/:locale', permanent: true },
      { source: '/:locale(en|tr|it)/methodology', destination: '/:locale', permanent: true },
      { source: '/:locale(en|tr|it)/assets', destination: '/:locale', permanent: true },
      { source: '/:locale(en|tr|it)/why-sme', destination: '/:locale', permanent: true },
      { source: '/:locale(en|tr|it)/portal', destination: '/:locale', permanent: true },

      // About is now part of the contact page, alongside the portrait.
      { source: '/:locale(en|tr|it)/about', destination: '/:locale/contact', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // The build-time image pipeline gives these content-hashed output, and
        // they are only replaced by a redeploy.
        source: '/:file(.*\\.(?:webp|png|jpg|jpeg|svg|ico))',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

module.exports = nextConfig;
