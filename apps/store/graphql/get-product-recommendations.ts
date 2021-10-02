import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';

export const PRODUCT_RECOMMENDATIONS = gql`
  query productRecommendations(
    $productId: ID!
    $variantsFirst: Int = 1
    $imagesFirst: Int = 5
  ) {
    productRecommendations(productId: $productId) {
      description
      handle
      id
      images(first: $imagesFirst) {
        edges {
          node {
            id
            originalSrc
            altText
          }
        }
      }
      priceRange {
        maxVariantPrice {
          amount
        }
        minVariantPrice {
          amount
        }
      }
      productType
      tags
      title
      variants(first: $variantsFirst) {
        edges {
          node {
            sku
            availableForSale
            id
            compareAtPriceV2 {
              amount
              currencyCode
            }
            priceV2 {
              amount
              currencyCode
            }
            title
            image {
              id
              originalSrc
              altText
            }
          }
        }
      }
    }
  }
` as import('../../../__generated__/ts-gql/productRecommendations').type;

export type ProductRecommendations =
  typeof PRODUCT_RECOMMENDATIONS['___type']['result']['productRecommendations'];

/**
 * This is returning an empty array currently, I think this feature might not be
 * enabled on the Shopify Lite plan.
 */
export async function getProductRecommendations(
  client: Client,
  productId: string,
  variantsFirst?: number,
  imagesFirst?: number
): Promise<ProductRecommendations | void> {
  try {
    const { data } = await client.query({
      query: PRODUCT_RECOMMENDATIONS,
      variables: {
        productId,
        variantsFirst,
        imagesFirst,
      },
    });
    return data?.productRecommendations;
  } catch (error) {
    console.error(error);
  }
}
