import { gql } from '@ts-gql/tag';

import { Client } from '../utils/apollo-client';

const GET_PRODUCT_TYPES = gql`
  query GetProductTypes {
    productTypes(first: 250) {
      edges {
        node
      }
    }
  }
` as import('../../../__generated__/ts-gql/GetProductTypes').type;

export async function getProductTypes(
  client: Client
): Promise<string[] | undefined> {
  const { data } = await client.query({
    query: GET_PRODUCT_TYPES,
  });
  return data?.productTypes.edges
    .filter(productType => Boolean(productType.node))
    .map(p => p.node);
}
