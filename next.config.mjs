/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is enabled by default in dev in newer versions, keeping object for config if needed
  turbopack: {},
  reactStrictMode: true,
  // Standalone output is perfect for GCP Cloud Run / Docker
  output: 'standalone',

  images: {
    // Prioritize AVIF (smaller/faster) -> WebP -> JPEG
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'mac-hadis.s3.ap-northeast-1.amazonaws.com', pathname: '**' },
      { protocol: 'https', hostname: 'mac-hadis.com', pathname: '**' },
    ],
    // Optimized device sizes to reduce the number of generated variants while covering all standard breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Increase cache to reduce S3 hits and re-processing
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    // Add heavy UI libraries here to tree-shake them effectively
    optimizePackageImports: ['swiper', 'sweetalert2', 'react-icons', 'lucide-react', 'framer-motion'],
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Aggressive caching for Next.js optimized images
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache static assets forever
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        locale: false,
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.(woff2|woff|ttf|otf)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;