import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';

const GET_FIRST_COLLECTIONS = gql`
  query GetFirstCollections {
    collections(sortKey: TITLE, first: 250) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          descriptionHtml
          handle
          image {
            id
            altText
            transformedSrc
          }
          title
        }
      }
    }
  }
` as import('../../../__generated__/ts-gql/GetFirstCollections').type;

const GET_NEXT_COLLECTIONS = gql`
  query getNextCollections($cursor: String!) {
    collections(sortKey: TITLE, first: 250, after: $cursor) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          descriptionHtml
          handle
          image {
            id
            altText
            transformedSrc
          }
          title
        }
      }
    }
  }
` as import('../../../__generated__/ts-gql/getNextCollections').type;

export type Collection =
  typeof GET_FIRST_COLLECTIONS['___type']['result']['collections']['edges'][number];

export async function getAllCollections(client: Client): Promise<Collection[]> {
  let collections: Collection[] = [];
  async function getAllCollectionsFromQuery() {
    let newCursor = '';

    async function getNextCollections(
      cursor: string
    ): Promise<Collection[] | undefined> {
      try {
        const { data } = await client.query({
          query: GET_NEXT_COLLECTIONS,
          variables: { cursor: cursor },
        });
        if (data) collections = collections.concat(data.collections.edges);
        if (data?.collections.pageInfo.hasNextPage) {
          newCursor =
            data.collections.edges[data.collections.edges.length - 1].cursor;
          return getNextCollections(newCursor);
        } else {
          return collections;
        }
      } catch (error) {
        console.error(error, 'getNextCollections');
      }
    }

    try {
      const { data } = await client.query({
        query: GET_FIRST_COLLECTIONS,
      });
      if (data) collections = collections.concat(data.collections.edges);
      if (data?.collections.pageInfo.hasNextPage) {
        newCursor =
          data.collections.edges[data.collections.edges.length - 1].cursor;
        return getNextCollections(newCursor);
      } else {
        return collections;
      }
    } catch (error) {
      console.error(error, 'getAllCollectionsFromQuery');
    }
  }
  await getAllCollectionsFromQuery();
  return collections;
}
