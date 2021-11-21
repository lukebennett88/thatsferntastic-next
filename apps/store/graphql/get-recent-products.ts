import { gql } from '@ts-gql/tag/no-transform';

import type { Client } from '../utils/apollo-client';
import { PRODUCT_FRAGMENT } from './product-fragments';

const RECENT_PRODUCTS = gql`
  query RecentProducts($first: Int = 4, $query: String) {
    products(first: $first, sortKey: CREATED_AT, query: $query, reverse: true) {
      edges {
        node {
          ...Product_Fragment
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
` as import('../../../__generated__/ts-gql/RecentProducts').type;

export type RecentProducts =
  typeof RECENT_PRODUCTS['___type']['result']['products']['edges'];

interface GetRecentProducts {
  client: Client;
  first?: number;
  productType?: string;
}

export async function getRecentProducts({
  client,
  first,
  productType,
}: GetRecentProducts): Promise<RecentProducts | undefined> {
  try {
    const { data } = await client.query({
      query: RECENT_PRODUCTS,
      variables: {
        first,
        query: `${
          productType ? `product_type:${productType}, ` : ''
        }available_for_sale:true`,
      },
    });
    return data?.products.edges;
  } catch (error) {
    console.error(error);
  }
}
