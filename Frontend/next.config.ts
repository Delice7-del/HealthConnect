import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output as a standalone app for production deployment
  output: 'standalone',
  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
  // Rewrites to proxy API requests to backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
