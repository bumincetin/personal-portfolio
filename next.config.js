/** @type {import('next').NextConfig} */
const nextConfig = {
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
