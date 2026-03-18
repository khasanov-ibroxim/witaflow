const nextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
module.exports = nextConfig;