/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ REMOVED: Turbopack empty object (unless you are explicitly using --turbo)
  // reactStrictMode is good.
  reactStrictMode: true,
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mac-hadis.s3.ap-northeast-1.amazonaws.com",
        pathname: "**",
      },
      { protocol: "https", hostname: "mac-hadis.com", pathname: "**" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    // ✅ CRITICAL: Inline critical CSS automatically
    optimizeCss: true,
    // ✅ Tree-shake heavy packages
    optimizePackageImports: [
      "swiper",
      "sweetalert2",
      "lucide-react",
      "framer-motion",
      "lodash",
      "react-icons",
    ],
    // ✅ NEW: Enable server actions for better SSR performance
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // ✅ Turbopack config (Next.js 16+ default bundler)
  // Empty config allows webpack fallback without errors
  turbopack: {},

  // ✅ Webpack config for backwards compatibility
  // Note: Turbopack handles CSS optimization automatically
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // ✅ Prevent CSS code splitting for critical paths
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          cacheGroups: {
            // ✅ Bundle all CSS into fewer chunks
            styles: {
              name: "styles",
              test: /\.css$/,
              chunks: "all",
              enforce: true,
              priority: 20,
            },
          },
        },
      };
    }
    return config;
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(woff2|woff|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
