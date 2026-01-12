/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled to allow AI API routes to run
  // basePath: '/personal-portfolio', // Enable this only if deploying to a sub-path like GitHub Pages
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // unoptimized: true, // Only needed for static export
  },
  // Optimize build performance
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;