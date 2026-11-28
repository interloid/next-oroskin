import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // The icon SVGs (public/assets, public/icons) are read from disk at runtime:
  // ship them with every server function when deployed (e.g. Vercel).
  outputFileTracingIncludes: {
    '/**': ['./public/assets/**/*.svg', './public/icons/**/*.svg'],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
