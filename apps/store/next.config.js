const { withTsGql } = require('@ts-gql/next');
const withPreconstruct = require('@preconstruct/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com'],
  },
  reactStrictMode: true,
};

module.exports = withTsGql(withPreconstruct({ ...nextConfig }));
