import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: { 
    formats: ['image/avif', 'image/webp'], 
    }
};

export default nextConfig;
