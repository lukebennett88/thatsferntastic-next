import { gql } from "@ts-gql/tag/no-transform";

import { Client } from "../utils/apollo-client";
import { COLLECTION_FRAGMENT } from "./collection-fragments";
import { PRODUCT_FRAGMENT } from "./product-fragments";

const GET_COLLECTION = gql`
  query GetCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      ...Collection_Fragment
      products(sortKey: TITLE, first: 250) {
        edges {
          node {
            ...Product_Fragment
          }
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_FRAGMENT}
` as import("../../../__generated__/ts-gql/GetCollection").type;

export type Collection = typeof GET_COLLECTION["___type"]["result"]["collectionByHandle"];

interface Variables {
  handle: string;
}

export async function getCollectionByHandle(client: Client, variables: Variables): Promise<Collection | undefined> {
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
