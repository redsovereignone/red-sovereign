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
};

export default nextConfig;
