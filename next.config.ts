import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Page JSON (src/data/pages) and the icon SVGs (public/assets) are read from disk at runtime:
  // ship them with every server function when deployed (e.g. Vercel).
  outputFileTracingIncludes: {
    '/**': ['./src/data/pages/**/*', './public/assets/**/*.svg'],
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
