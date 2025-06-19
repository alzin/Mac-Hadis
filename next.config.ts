import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['mac-hadis.s3.ap-northeast-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mac-hadis.s3.ap-northeast-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'mac-hadis.com',
        pathname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
};

export default nextConfig;