import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import * as React from 'react';

import { ProductCard } from '../../components/product-card';
import {
  DesktopProductFilters,
  MobileProductFilters,
} from '../../components/product-filters';
import type { Products } from '../../graphql/get-products';
import { getProducts, SORT_KEYS } from '../../graphql/get-products';
import { addApolloState, initialiseTsGql } from '../../utils/apollo-client';

interface ProductsProps {
  products: NonNullable<Products>;
}

export const getServerSideProps: GetServerSideProps<ProductsProps> = async ({
  query,
}) => {
  // Optional filters
  const first = !isNaN(Number(query.first)) ? Number(query.first) : undefined;
  const reverse = query.reverse === 'true';
  const sortKey = SORT_KEYS.find(key => key === query.sortKey);

  const client = initialiseTsGql();
  const products = await getProducts({
    client,
    first,
    sortKey,
    reverse,
  });

  if (!products) {
    return { notFound: true };
  }

  return addApolloState(client, {
    props: {
      products,
    },
  });
};

const ProductsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ products }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  return (
    <>
      <MobileProductFilters
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />
      <main className="max-w-2xl px-4 mx-auto lg:max-w-7xl lg:px-8">
        <div className="pt-24 pb-10 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Products
          </h1>
        </div>
        <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <DesktopProductFilters
            products={products}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
          <section
            aria-labelledby="product-heading"
            className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
          >
            <h2 id="product-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
              {products.map(({ node }) => (
                <ProductCard key={node.id} product={node} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
