/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_APP_GOOGLE_MAP_KEY: process.env.NEXT_APP_GOOGLE_MAP_KEY,
    NEXT_APP_API_KEY: process.env.NEXT_APP_API_KEY,
  },
  output: "standalone",
  images: {
    domains: [
      "plant-api-uat.marvyco.com",
      "plant-api.marvyco.com",
      "pana-tree-planting-test-be.aegona.work",
      "pana-tree-planting-uat-be.aegona.work",
      "api.songkhoegopxanh.com",
      "pana-tree-planting-uat-be.aegona.work",
      "plant-api-v2.marvyco.com",
    ],
  },
};

module.exports = nextConfig;
