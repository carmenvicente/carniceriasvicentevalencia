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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "carniceriasvicentevalencia.vercel.app",
          },
        ],
        destination: "https://carniceriavicentevalencia.es/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;