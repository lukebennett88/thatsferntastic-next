import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import * as React from "react";

import { ProductCard } from "../../components/product-card";
import { DesktopProductFilters, MobileProductFilters } from "../../components/product-filters";
import type { Collection } from "../../graphql/get-collection-by-handle";
import { getCollectionByHandle } from "../../graphql/get-collection-by-handle";
import { addApolloState, initialiseTsGql } from "../../utils/apollo-client";

interface CollectionProps {
  collection: NonNullable<Collection>;
}

export const getServerSideProps: GetServerSideProps<CollectionProps> = async ({ query }) => {
  const { collectionHandle } = query;
  if (typeof collectionHandle !== "string") {
    return { notFound: true };
  }
  const collection = await getCollectionByHandle({
    handle: collectionHandle,
  });
  if (!collection) {
    return { notFound: true };
  }
  return addApolloState({
    props: {
      collection,
    },
  });
};

const CollectionPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ collection }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  return (
    <>
      <MobileProductFilters mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} />
      <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pt-24 pb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{collection.title}</h1>
          {collection.description ? <p className="mt-4 text-base text-gray-500">{collection.description}</p> : null}
        </div>
        <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <DesktopProductFilters setMobileFiltersOpen={setMobileFiltersOpen} />
          <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <h2 id="product-heading" className="sr-only">
              Products
            </h2>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
              {collection.products.edges.map(({ node }) => (
                <ProductCard key={node.id} product={node} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default CollectionPage;
