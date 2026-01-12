/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // REMOVED: Must be removed for API routes to work on Vercel
  // basePath: '/personal-portfolio', // REMOVED: Not needed for Vercel
  // assetPrefix: '/personal-portfolio/', // REMOVED: Not needed for Vercel
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // unoptimized: true, // Optional: You can remove this on Vercel to get faster image loading
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
}

module.exports = nextConfig;