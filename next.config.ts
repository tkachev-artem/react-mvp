import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['87.242.117.38'], // Добавляем домен API
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '87.242.117.38',
        port: '8080',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
