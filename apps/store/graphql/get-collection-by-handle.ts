import { gql } from '@ts-gql/tag';

import { Client } from '../utils/apollo-client';

const GET_COLLECTION = gql`
  query GetCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      description
      products(sortKey: TITLE, first: 250) {
        edges {
          node {
            id
            compareAtPriceRange {
              minVariantPrice {
                amount
              }
            }
            handle
            images(first: 1) {
              edges {
                node {
                  id
                  altText
                  originalSrc
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
            title
            variants(first: 1) {
              edges {
                node {
                  id
                  selectedOptions {
                    name
                  }
                }
              }
            }
          }
        }
      }
      title
    }
  }
` as import('../../../__generated__/ts-gql/GetCollection').type;

export type Collection =
  typeof GET_COLLECTION['___type']['result']['collectionByHandle'];

interface Variables {
  handle: string;
}

export async function getCollectionByHandle(
  client: Client,
  variables: Variables
): Promise<Collection | void> {
  try {
    const { data } = await client.query({
      query: GET_COLLECTION,
      variables,
    });
    return data?.collectionByHandle;
  } catch (error) {
    console.error(error);
  }
}
