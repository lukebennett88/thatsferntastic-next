import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';

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
` as import('../../../__generated__/ts-gql/Products').type;

export type Products =
  typeof PRODUCTS['___type']['result']['products']['edges'];

export const SORT_KEYS = {
  BEST_SELLING: 'Best selling',
  CREATED_AT: 'Created at',
  PRICE: 'Price',
  PRODUCT_TYPE: 'Product type',
  RELEVANCE: 'Relevance',
  TITLE: 'Title',
  UPDATED_AT: 'Updated at',
  VENDOR: 'Vendor',
} as const;

export type SortKey = keyof typeof SORT_KEYS;

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
}: GetProducts): Promise<Products | void> {
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
