/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_APP_GOOGLE_MAP_KEY: process.env.NEXT_APP_GOOGLE_MAP_KEY,
    NEXT_APP_API_KEY: process.env.NEXT_APP_API_KEY,
  },
  output: "standalone",
  images: { domains: ['pana-tree-planting-test-be.aegona.work', 'pana-tree-planting-uat-be.aegona.work', 'api.songkhoegopxanh.com', 'pana-tree-planting-uat-be.aegona.work'] },
};

module.exports = nextConfig;
