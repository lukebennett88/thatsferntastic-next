import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';

export const GET_PRODUCT_RECOMMENDATIONS = gql`
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...Product_Fragment
    }
  }
` as import('../../../__generated__/ts-gql/GetProductRecommendations').type;

export type ProductRecommendations =
  typeof GET_PRODUCT_RECOMMENDATIONS['___type']['result']['productRecommendations'];

/**
 * This is returning an empty array currently, I think this feature might not be
 * enabled on the Shopify Lite plan.
 */
export async function getProductRecommendations(
  client: Client,
  productId: string
): Promise<ProductRecommendations | void> {
  try {
    const { data } = await client.query({
      query: GET_PRODUCT_RECOMMENDATIONS,
      variables: {
        productId,
      },
    });
    return data?.productRecommendations;
  } catch (error) {
    console.error(error);
  }
}
