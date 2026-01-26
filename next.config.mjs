/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbo is the future, keep it enabled if using --turbo
  turbopack: {},
  reactStrictMode: true,

  // Better for Cloud Run: smaller runtime image
  output: 'standalone',

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'mac-hadis.s3.ap-northeast-1.amazonaws.com', pathname: '**' },
      { protocol: 'https', hostname: 'mac-hadis.com', pathname: '**' },
    ],
    // Reduced device sizes to match actual breakpoints, preventing generation of unused large images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression
  compress: true,

  // Disable powered by header
  poweredByHeader: false,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    // optimizePackageImports can help with tree-shaking specific large libraries
    optimizePackageImports: ['swiper', 'sweetalert2', 'react-icons'],
  },

  // Removed manual splitChunks. Next.js defaults are highly optimized for Core Web Vitals.
  // Manual chunking often increases Total Blocking Time (TBT).
  
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
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=31536000, stale-while-revalidate=86400',
          },
        ],
      },
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