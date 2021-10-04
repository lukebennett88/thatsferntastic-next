import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';

export const GET_PRODUCT_BY_HANDLE = gql`
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...Product_Fragment
    }
  }
` as import('../../../__generated__/ts-gql/GetProductByHandle').type;

export type Product =
  typeof GET_PRODUCT_BY_HANDLE['___type']['result']['product'];

export async function getProductByHandle(
  client: Client,
  handle: string
): Promise<Product | void> {
  try {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_HANDLE,
      variables: {
        handle,
      },
    });
    return data?.product;
  } catch (error) {
    console.error(error);
  }
}
