import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/<rick-and-morty-next-js>",
  assetPrefix: "/<rick-and-morty-next-js>",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
};

export default nextConfig;
