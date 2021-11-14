// @ts-check
const withPreconstruct = require('@preconstruct/next');
const { withTsGql } = require('@ts-gql/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com'],
  },
  reactStrictMode: true,
};

module.exports = withTsGql(withPreconstruct({ ...nextConfig }));
