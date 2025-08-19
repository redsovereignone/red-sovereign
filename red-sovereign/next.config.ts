import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // ESLint is now enforced during builds to maintain code quality
    ignoreDuringBuilds: false,
  },
  typescript: {
    // TypeScript will be checked during builds to ensure type safety
    ignoreBuildErrors: false,
  },
  // Ensure proper Vercel deployment
  images: {
    unoptimized: true,
  },
  // Optimize for production
  reactStrictMode: true,

  // Fix cross-origin issues in development
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },

  // Allow development origins for iframe embedding
  experimental: {
    allowedOrigins: [
      '*.fly.dev',
      'localhost:*',
      '127.0.0.1:*',
    ],
  },
};

export default nextConfig;
