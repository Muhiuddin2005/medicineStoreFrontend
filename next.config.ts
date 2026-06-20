import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Configure Turbopack root directory so that it resolves dependencies (like tailwindcss) correctly.
  // @ts-ignore
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

