import algoliasearch from 'algoliasearch/lite';

export const algoliaClient = algoliasearch(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);
