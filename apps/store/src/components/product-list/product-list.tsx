import { slugify } from "@thatsferntastic/utils";
import NextLink from "next/link";

import { TopSellingProducts as ProductsType } from "../../graphql/get-top-selling-products";
import { ShopifyImage } from "../shopify-image";

interface ProductListProps {
  heading: string;
  topSellingProducts: ProductsType;
}

export function ProductList({ heading, topSellingProducts }: ProductListProps): JSX.Element {
  return (
    <section aria-labelledby={slugify(heading)} className="px-4 pt-24 sm:pt-32 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 id={slugify(heading)} className="font-mono text-2xl tracking-tight text-pink-600">
          {heading}
        </h2>
        <NextLink href="/products">
          <a className="hidden text-sm font-semibold text-pink-600 hover:text-pink-500 sm:block">
            Browse all products<span aria-hidden="true"> &rarr;</span>
          </a>
        </NextLink>
      </div>

      <div className="flow-root mt-4">
        <div className="-my-2">
          <div className="box-content relative py-2 overflow-x-auto h-80">
            <div className="absolute flex space-x-8 min-w-screen-xl">
              {topSellingProducts.map(({ node }) => {
                const imageNode = node.images.edges[0].node;
                return (
                  <NextLink key={node.id} href={`/products/${node.handle}`}>
                    <a className="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75">
                      <span aria-hidden="true" className="absolute inset-0">
                        <ShopifyImage
                          src={imageNode.transformedSrc}
                          alt={imageNode.altText ?? ""}
                          className="object-cover object-center w-full h-full"
                          height={320}
                          width={224}
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
                      />
                      <span className="relative mt-auto text-xl font-bold text-center text-white">{node.title}</span>
                    </a>
                  </NextLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 sm:hidden">
        <NextLink href="/products">
          <a className="block text-sm font-semibold text-pink-600 hover:text-pink-500">
            Browse all products<span aria-hidden="true"> &rarr;</span>
          </a>
        </NextLink>
      </div>
    </section>
  );
}
