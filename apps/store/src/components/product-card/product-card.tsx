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
    <div className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group">
      <div className="relative">
        <div className={classNames("aspect-w-1 aspect-h-1 flex", "group-hover:opacity-75", "sm:aspect-none sm:h-96")}>
          <div className={classNames("absolute flex flex-1 bg-teal-100", styles.nextWrapper)}>
            {image.transformedSrc ? (
              <ShopifyImage
                src={image.transformedSrc}
                alt={image.altText ?? ""}
                height={620}
                width={620}
                className="absolute object-cover object-center w-full h-full sm:w-full sm:h-full"
              />
            ) : (
              <span className="self-center flex-1 text-center">Image not found</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 space-y-2">
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
