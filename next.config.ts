import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sandbox.api.pagseguro.com",
      },
      {
        protocol: "https",
        hostname: "api.pagseguro.com",
      },
    ],
  },
};

export default nextConfig;
