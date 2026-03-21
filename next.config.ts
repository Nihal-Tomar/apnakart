import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Authorization for high-definition photography from Unsplash */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
