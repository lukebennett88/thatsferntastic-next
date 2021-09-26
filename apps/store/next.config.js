const { withTsGql } = require('@ts-gql/next');
const withPreconstruct = require('@preconstruct/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports =
  process.env.NODE_ENV === 'production'
    ? withPreconstruct({ ...nextConfig })
    : withTsGql(withPreconstruct({ ...nextConfig }));
