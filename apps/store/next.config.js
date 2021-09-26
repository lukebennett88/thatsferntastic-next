const { withTsGql } = require('@ts-gql/next');
const withPreconstruct = require('@preconstruct/next');

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // For client-side requests we want to avoid CORS issues, so we setup a
        // pass-through proxy here
        source: `${process.env.NEXT_PUBLIC_CLIENT_GRAPHQL_API}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_SERVER_GRAPHQL_API}/:path*`,
      },
    ];
  },
};

/** @type {import('next').NextConfig} */
module.exports =
  process.env.NODE_ENV === 'production'
    ? withPreconstruct({ ...nextConfig })
    : withTsGql({ ...nextConfig });
