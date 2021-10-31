import NextLink from 'next/link';

import { Collection } from '../../graphql/get-all-collections';

interface CollectionSectionProps {
  collections: Collection[];
}

export function CollectionSection({
  collections,
}: CollectionSectionProps): JSX.Element {
  return (
    <section
      aria-labelledby="collection-heading"
      className="max-w-xl px-4 pt-24 mx-auto sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2
        id="collection-heading"
        className="font-mono text-2xl tracking-tight text-pink-600"
      >
        Shop by Collection
      </h2>
      <p className="mt-4 text-base text-gray-500">
        Each season, we collaborate with world-class designers to create a
        collection inspired by the natural world.
      </p>

      <div className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-6">
        {collections.map(({ node: collection }) => (
          <NextLink
            key={collection.id}
            href={`/collections/${collection.handle}`}
          >
            <a className="block group">
              <div
                aria-hidden="true"
                className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2 group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
              >
                {collection.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={collection.image.altText ?? ''}
                    loading="lazy"
                    src={`${collection.image.transformedSrc}&width=1080`}
                    srcSet={`${collection.image.transformedSrc}&width=640 1x, ${collection.image.transformedSrc}&width=1080 2x`}
                    className="object-cover object-center w-full h-full"
                  />
                ) : null}
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {collection.title}
              </h3>
              <div
                className="mt-2 text-sm text-gray-500"
                dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
              />
            </a>
          </NextLink>
        ))}
      </div>
    </section>
  );
}
