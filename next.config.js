/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
   * Build output directory: dev and production never share one.
   *
   * A dev server and a production server writing the same `.next` corrupt each
   * other. Dev rewrites the directory continuously while `next start` is still
   * handing out asset URLs stamped with the previous build id, so the browser
   * asks for chunks that no longer exist and gets 404s — on a page that
   * otherwise looks fine, which is what makes it confusing rather than obvious.
   *
   * This used to be documented as "run dev with NEXT_DIST_DIR=.next-dev", and
   * `"dev": "next dev"` never set it, so the separation existed only in a
   * comment. Deciding it here instead means it cannot be forgotten, and it
   * needs no cross-platform env-var shim in the npm script.
   *
   * The variable still wins when it is set, which is what the smoke and
   * accessibility runs use to point a second server at a build of their own.
   */
  distDir: process.env.NEXT_DIST_DIR || (process.env.NODE_ENV === 'development' ? '.next-dev' : '.next'),

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
    optimizePackageImports: ['lucide-react', 'motion/react'],
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

      /*
       * The icon iOS asks for before it has read the document.
       *
       * `src/app/apple-icon.png` makes Next emit a `<link rel="apple-touch-icon">`,
       * which is the real fix — a client that parses the page never guesses. But
       * anything that does not parse it first still asks for these two paths by
       * convention, and both answered 404 in production. They cost two lines.
       */
      { source: '/apple-touch-icon.png', destination: '/apple-icon.png', permanent: true },
      { source: '/apple-touch-icon-precomposed.png', destination: '/apple-icon.png', permanent: true },

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

      // The biography and CV have their own home, separate from inquiries.
      { source: '/:locale(en|tr|it)/about', destination: '/:locale/chapters', permanent: true },
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
