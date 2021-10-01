import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';

const TOP_SELLING_PRODUCTS = gql`
  query TopSellingProducts($first: Int = 4, $query: String) {
    products(first: $first, sortKey: BEST_SELLING, query: $query) {
      edges {
        node {
          id
          compareAtPriceRange {
            minVariantPrice {
              amount
            }
          }
          handle
          images(first: 1) {
            edges {
              node {
                altText
                id
                originalSrc
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          title
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
` as import('../../../__generated__/ts-gql/TopSellingProducts').type;

export type TopSellingProducts =
  typeof TOP_SELLING_PRODUCTS['___type']['result']['products']['edges'];

export async function getTopSellingProducts(
  client: Client,
  productType?: string,
  first?: number
): Promise<TopSellingProducts | void> {
  const { data } = await client.query({
    query: TOP_SELLING_PRODUCTS,
    variables: {
      first,
      query: `${
        productType ? `product_type:${productType}, ` : ''
      }available_for_sale:true`,
    },
  });
  return data?.products.edges;
}
