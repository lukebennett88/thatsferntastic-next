// @ts-check
import withPreconstruct from '@preconstruct/next';
import { withTsGql } from '@ts-gql/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com'],
  },
  reactStrictMode: true,
};

export default withTsGql(withPreconstruct({ ...nextConfig }));
