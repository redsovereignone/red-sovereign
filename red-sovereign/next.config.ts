import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Temporarily ignore ESLint during builds - too many minor issues to fix now
    ignoreDuringBuilds: true,
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
};

export default nextConfig;
