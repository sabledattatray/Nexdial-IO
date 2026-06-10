import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Performance ─────────────────────────────────────── */
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  /* ── Image Optimization ──────────────────────────────── */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  /* ── Compiler — strip console.log in production ──────── */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;
