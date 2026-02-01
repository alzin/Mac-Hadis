/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Turbopack for faster dev builds
  turbopack: {},
  reactStrictMode: true,
  output: 'standalone',

  images: {
    // ✅ Prioritize AVIF (30% smaller than WebP) -> WebP -> JPEG
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'mac-hadis.s3.ap-northeast-1.amazonaws.com', pathname: '**' },
      { protocol: 'https', hostname: 'mac-hadis.com', pathname: '**' },
    ],
    // ✅ Optimized device sizes - covers all major breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // ✅ Image size variants for icons and small images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // ✅ Cache images for 1 year
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ✅ Enable compression
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    // ✅ Optimize CSS delivery (critical for LCP!)
    optimizeCss: true,
    
    // ✅ Tree-shake heavy libraries to reduce bundle size
    optimizePackageImports: [
      'swiper', 
      'sweetalert2', 
      'lucide-react', 
      'framer-motion',
      'lodash',
      'react-icons',
    ],
  },

  // ✅ Webpack optimizations for better code splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // ✅ Optimize chunk splitting strategy
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk (React, Next.js core)
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Vendor chunk (all other node_modules)
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
            },
            // Common components chunk
            common: {
              name: 'common',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },
  
  // ✅ Security and performance headers
  async headers() {
    return [
      // Security headers for all routes
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
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      
      // ✅ CRITICAL: Cache Next.js optimized images forever
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      
      // ✅ Cache static assets (images, fonts) forever
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        locale: false,
        headers: [
          { 
            key: 'Cache-Control', 
            value: 'public, max-age=31536000, immutable' 
          },
        ],
      },
      
      // ✅ Cache Next.js static chunks forever
      {
        source: '/_next/static/:path*',
        headers: [
          { 
            key: 'Cache-Control', 
            value: 'public, max-age=31536000, immutable' 
          },
        ],
      },
      
      // ✅ Cache fonts forever
      {
        source: '/:path*.(woff2|woff|ttf|otf)',
        headers: [
          { 
            key: 'Cache-Control', 
            value: 'public, max-age=31536000, immutable' 
          },
        ],
      },
    ];
  },
};

export default nextConfig;