import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';

import {
  Collection,
  getAllCollections,
} from '../../graphql/get-all-collections';
import { addApolloState, initialiseTsGql } from '../../utils/apollo-client';

interface CollectionProps {
  collections: NonNullable<Collection[]>;
}

export const getServerSideProps: GetServerSideProps<CollectionProps> =
  async () => {
    const client = initialiseTsGql();
    const collections = await getAllCollections(client);
    if (!collections) {
      return { notFound: true };
    }
    return addApolloState(client, {
      props: {
        collections,
      },
    });
  };

export default function CollectionPage({
  collections,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <main className="max-w-2xl px-4 mx-auto lg:max-w-7xl lg:px-8">
        <div className="pt-24 pb-10 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Collections
          </h1>
        </div>

        <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <section
            aria-labelledby="product-heading"
            className="mt-6 lg:mt-0 lg:col-span-3 xl:col-span-4"
          >
            <h2 id="product-heading" className="sr-only">
              Collections
            </h2>

            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
              {collections.map(({ node: collection }) => (
                <div
                  key={collection.id}
                  className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group"
                >
                  <div className="bg-gray-200 aspect-w-3 aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={collection.image?.transformedSrc}
                      alt={collection.image?.altText ?? ''}
                      className="object-cover object-center w-full h-full sm:w-full sm:h-full"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-4 space-y-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      <NextLink href={`/collections/${collection.handle}`}>
                        <a href="">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {collection.title}
                        </a>
                      </NextLink>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
