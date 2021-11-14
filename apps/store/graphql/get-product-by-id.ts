import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      ...Product_Fragment
    }
  }
` as import('../../../__generated__/ts-gql/GetProductById').type;

export type Product = typeof GET_PRODUCT_BY_ID['___type']['result']['product'];

export async function getProductById(
  client: Client,
  id: string
): Promise<Product | undefined> {
  try {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_ID,
      variables: {
        id,
      },
    });
    return data?.product;
  } catch (error) {
    console.error(error);
  }
}
