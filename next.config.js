/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/personal-portfolio',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  assetPrefix: '/personal-portfolio/',
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

module.exports = nextConfig 