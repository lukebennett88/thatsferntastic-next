import { classNames, formatPrice } from "@thatsferntastic/utils";
import NextLink from "next/link";

import type { Products } from "../../graphql/get-products";
import { ShopifyImage } from "../shopify-image";
import styles from "./product-card.module.css";

interface ProductCardProps {
  product: Products[number]["node"];
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  const image = product.images.edges[0]?.node;
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="relative">
        <div className={classNames("aspect-w-1 aspect-h-1 flex", "group-hover:opacity-75", "sm:aspect-none sm:h-96")}>
          <div className={classNames("absolute flex flex-1 bg-teal-100", styles.nextWrapper)}>
            {image.transformedSrc ? (
              <ShopifyImage
                src={image.transformedSrc}
                alt={image.altText ?? ""}
                height={620}
                width={620}
                className="absolute h-full w-full object-cover object-center sm:h-full sm:w-full"
              />
            ) : (
              <span className="flex-1 self-center text-center">Image not found</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <NextLink href={`/products/${product.handle}`}>
            <a>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </a>
          </NextLink>
        </h3>
        <p className="text-base font-medium text-gray-900">
          {formatPrice(Number(product.priceRange.minVariantPrice.amount))}
        </p>
      </div>
    </div>
  );
}
