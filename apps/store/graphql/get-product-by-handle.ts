import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';

export const GET_PRODUCT_BY_HANDLE = gql`
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      availableForSale
      description
      descriptionHtml
      images(first: 1) {
        edges {
          node {
            id
            altText
            height
            width
            transformedSrc
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
        }
      }
      title
    }
  }
` as import('../../../__generated__/ts-gql/GetProductByHandle').type;

export type Product =
  typeof GET_PRODUCT_BY_HANDLE['___type']['result']['productByHandle'];

export async function getProductByHandle(
  client: Client,
  handle: string
): Promise<Product | void> {
  const { data } = await client.query({
    query: GET_PRODUCT_BY_HANDLE,
    variables: {
      handle,
    },
  });
  return data?.productByHandle;
}
