import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import type { useApolloClient } from '@ts-gql/apollo';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import type { GetServerSideProps } from 'next';
import { useMemo } from 'react';

import { AnyObject } from '../types';

const isServer = typeof window === 'undefined';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: isServer
        ? process.env.NEXT_PUBLIC_SERVER_GRAPHQL_API
        : process.env.NEXT_PUBLIC_CLIENT_GRAPHQL_API, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState = null
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export const initializeTsGqlClient = initializeApollo as (
  ...args: Parameters<typeof initializeApollo>
) => ReturnType<typeof useApolloClient>;

interface PageProps extends AnyObject {
  [APOLLO_STATE_PROP_NAME]: any;
  props: AnyObject;
}

export function addApolloState(
  client: any,
  pageProps: any
): ReturnType<GetServerSideProps> {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(
  pageProps: PageProps
): ApolloClient<NormalizedCacheObject> {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  console.log(state);
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
