const { withTsGql } = require("@ts-gql/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.shopify.com"],
  },
  reactStrictMode: true,
};

module.exports = withTsGql(nextConfig);
