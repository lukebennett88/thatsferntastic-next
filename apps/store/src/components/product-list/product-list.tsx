import { toSlug } from "@thatsferntastic/utils";
import NextLink from "next/link";

import { TopSellingProducts as ProductsType } from "../../graphql/get-top-selling-products";
import { ShopifyImage } from "../shopify-image";

interface ProductListProps {
  heading: string;
  topSellingProducts: ProductsType;
}

export function ProductList({ heading, topSellingProducts }: ProductListProps): JSX.Element {
  return (
    <section aria-labelledby={toSlug(heading)} className="px-4 pt-24 sm:px-6 sm:pt-32 lg:mx-auto lg:max-w-7xl lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 id={toSlug(heading)} className="font-mono text-2xl tracking-tight text-pink-600">
          {heading}
        </h2>
        <NextLink href="/products">
          <a className="hidden text-sm font-semibold text-pink-600 hover:text-pink-500 sm:block">
            Browse all products<span aria-hidden="true"> &rarr;</span>
          </a>
        </NextLink>
      </div>

      <div className="mt-4 flow-root">
        <div className="-my-2">
          <div className="relative box-content h-80 overflow-x-auto py-2">
            <div className="min-w-screen-xl absolute flex space-x-8">
              {topSellingProducts.map(({ node }) => {
                const imageNode = node.images.edges[0].node;
                return (
                  <NextLink key={node.id} href={`/products/${node.handle}`}>
                    <a className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75">
                      <span aria-hidden="true" className="absolute inset-0">
                        <ShopifyImage
                          src={imageNode.transformedSrc}
                          alt={imageNode.altText ?? ""}
                          className="h-full w-full object-cover object-center"
                          height={320}
                          width={224}
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">{node.title}</span>
                    </a>
                  </NextLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-4 sm:hidden">
        <NextLink href="/products">
          <a className="block text-sm font-semibold text-pink-600 hover:text-pink-500">
            Browse all products<span aria-hidden="true"> &rarr;</span>
          </a>
        </NextLink>
      </div>
    </section>
  );
}
