import type { NextConfig } from "next";

// Automatically detects GitHub Pages subpath if deployed as a project page (e.g. /portfolio_v2)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
