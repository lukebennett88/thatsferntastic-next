import { gql } from '@ts-gql/tag/no-transform';

import type { Client } from '../utils/apollo-client';
import { PRODUCT_FRAGMENT } from './product-fragments';

const PRODUCTS = gql`
  query Products(
    $first: Int = 20
    $query: String
    $reverse: Boolean = false
    $sortKey: ProductSortKeys = BEST_SELLING
  ) {
    products(
      first: $first
      query: $query
      reverse: $reverse
      sortKey: $sortKey
    ) {
      edges {
        node {
          ...Product_Fragment
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
` as import('../../../__generated__/ts-gql/Products').type;

export type Products =
  typeof PRODUCTS['___type']['result']['products']['edges'];

export const SORT_KEYS = [
  'BEST_SELLING',
  'CREATED_AT',
  'PRICE',
  'PRODUCT_TYPE',
  'RELEVANCE',
  'TITLE',
  'UPDATED_AT',
  'VENDOR',
] as const;

export type SortKey = typeof SORT_KEYS[number];

interface GetProducts {
  client: Client;
  first?: number;
  productType?: string;
  reverse?: boolean;
  sortKey?: SortKey;
}

export async function getProducts({
  client,
  first,
  productType,
  reverse,
  sortKey,
}: GetProducts): Promise<Products | undefined> {
  try {
    const { data } = await client.query({
      query: PRODUCTS,
      variables: {
        first,
        query: `${
          productType ? `product_type:${productType}, ` : ''
        }available_for_sale:true`,
        reverse,
        sortKey,
      },
    });
    return data?.products.edges;
  } catch (error) {
    console.error(error);
  }
}
