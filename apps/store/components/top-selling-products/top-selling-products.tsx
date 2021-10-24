import Link from 'next/link';

import { TopSellingProducts as TopSellingProductsType } from '../../graphql/get-top-selling-products';

interface TopSellingProductsProps {
  topSellingProducts: TopSellingProductsType;
}

export function TopSellingProducts({
  topSellingProducts,
}: TopSellingProductsProps): JSX.Element {
  return (
    <section
      aria-labelledby="category-heading"
      className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
    >
      <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
        <h2
          id="category-heading"
          className="font-mono text-2xl tracking-tight text-pink-600"
        >
          Top Selling Products
        </h2>
        <Link href="/products">
          <a className="hidden text-sm font-semibold text-pink-600 hover:text-pink-500 sm:block">
            Browse all products<span aria-hidden="true"> &rarr;</span>
          </a>
        </Link>
      </div>

      <div className="flow-root mt-4">
        <div className="-my-2">
          <div className="box-content relative py-2 overflow-x-auto h-80 xl:overflow-visible">
            <div className="absolute flex px-4 space-x-8 min-w-screen-xl sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
              {topSellingProducts.map(({ node }) => (
                <Link key={node.id} href={`/products/${node.handle}`}>
                  <a className="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto">
                    <span aria-hidden="true" className="absolute inset-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={node.images.edges[0].node.transformedSrc}
                        alt={node.images.edges[0].node.altText ?? ''}
                        className="object-cover object-center w-full h-full"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
                    />
                    <span className="relative mt-auto text-xl font-bold text-center text-white">
                      {node.title}
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 sm:hidden">
        <a
          href="#"
          className="block text-sm font-semibold text-pink-600 hover:text-pink-500"
        >
          Browse all products<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </section>
  );
}
