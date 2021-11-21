import { gql } from '@ts-gql/tag/no-transform';

import type { Client } from '../utils/apollo-client';

const GET_FIRST_PRODUCTS = gql`
  query GetFirstProducts {
    products(sortKey: TITLE, first: 250) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          handle
          productType
          updatedAt
        }
      }
    }
  }
` as import('../../../__generated__/ts-gql/GetFirstProducts').type;

const GET_NEXT_PRODUCTS = gql`
  query GetNextProducts($cursor: String!) {
    products(sortKey: TITLE, first: 250, after: $cursor) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          handle
          productType
          updatedAt
        }
      }
    }
  }
` as import('../../../__generated__/ts-gql/GetNextProducts').type;

export type Product =
  typeof GET_FIRST_PRODUCTS['___type']['result']['products']['edges'][number];

export async function getAllProducts(client: Client): Promise<Product[]> {
  let products: Product[] = [];
  async function getAllProductsFromQuery() {
    let newCursor = '';

    async function getNextProducts(
      cursor: string
    ): Promise<Product[] | undefined> {
      try {
        const { data } = await client.query({
          query: GET_NEXT_PRODUCTS,
          variables: { cursor: cursor },
        });
        if (data) products = products.concat(data.products.edges);
        if (data?.products.pageInfo.hasNextPage) {
          newCursor =
            data.products.edges[data.products.edges.length - 1].cursor;
          return getNextProducts(newCursor);
        } else {
          return products;
        }
      } catch (error) {
        console.error(error, 'getNextProducts');
      }
    }

    try {
      const { data } = await client.query({
        query: GET_FIRST_PRODUCTS,
      });
      if (data) products = products.concat(data.products.edges);
      if (data?.products.pageInfo.hasNextPage) {
        newCursor = data.products.edges[data.products.edges.length - 1].cursor;
        return getNextProducts(newCursor);
      } else {
        return products;
      }
    } catch (error) {
      console.error(error, 'getAllProductsFromQuery');
    }
  }
  await getAllProductsFromQuery();
  return products;
}
