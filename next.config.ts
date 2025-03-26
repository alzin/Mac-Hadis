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
  },
};

export default nextConfig;