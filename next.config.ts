import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: false,
  reactStrictMode: true,
  images: {
    domains: [
      'eixv30h8jqr5avph.public.blob.vercel-storage.com',
    ],
  },
};

module.exports = nextConfig
