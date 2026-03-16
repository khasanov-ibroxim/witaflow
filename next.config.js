/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  output: "export",
  trailingSlash: true,   // faqat bitta, TRUE bo'lsin
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
};

module.exports = nextConfig;