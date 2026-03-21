import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Enable Turbopack compatibility by defining an empty config
  // @ts-ignore - types might not be updated yet for Next.js 16 alpha/beta
  // turbo: {},
};

export default nextConfig;
