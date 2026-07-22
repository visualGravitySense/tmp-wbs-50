import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    prefetchInlining: true,
    optimizePackageImports: ['lucide-react', '@/components/ui'],
  },

  // Sanity Studio pulls a large client graph; keep it out of the server bundle.
  serverExternalPackages: ["sanity", "@sanity/vision"],

  // Turbopack configuration
  turbopack: {
    root: __dirname,
  },
  
  // Image optimization for Vercel
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression and optimization
  compress: true,
  poweredByHeader: false,
  
  // Enable React strict mode for development
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://cdn.sanity.io>; rel=preconnect',
          },
        ],
      },
    ]
  },

  // Cache configuration for Sanity
  async rewrites() {
    return [
      {
        source: '/api/revalidate',
        destination: '/api/revalidate',
      },
    ]
  },
};

export default nextConfig;
