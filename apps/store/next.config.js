const { withTsGql } = require('@ts-gql/next');
const withPreconstruct = require('@preconstruct/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com'],
  },
  reactStrictMode: true,
};

module.exports =
  process.env.NODE_ENV === 'production'
    ? withPreconstruct({ ...nextConfig })
    : withTsGql(withPreconstruct({ ...nextConfig }));
