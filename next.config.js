/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  output: "export",
   trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true, // ← export uchun MAJBURIY
  },

  trailingSlash: false,

  // ❌ headers() — o'chirildi (static exportda ishlamaydi)
  // ❌ redirects() — o'chirildi (static exportda ishlamaydi)
};

module.exports = nextConfig;