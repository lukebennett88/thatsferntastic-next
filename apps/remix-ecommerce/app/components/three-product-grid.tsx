import { useId } from "@reach/auto-id";
import type { ReactNode } from "react";
import type { To } from "react-router-dom";
import { Link } from "remix";

import { OptimizedImage } from "./optimized-image";

export type ThreeProductGridProduct = {
  id: string;
  defaultVariantId: string;
  title: ReactNode;
  formattedPrice: ReactNode;
  image: string;
  to: To;
};

function ThreeProductGridItem({ product, index }: { product: ThreeProductGridProduct; index: number }) {
  let id = `three-product-grid-item-${useId()}`;

  return (
    <li key={product.id} className={`three-product-grid__item-${index % 3}`}>
      <div className="group relative block aspect-square overflow-hidden">
        <Link className="group block" prefetch="intent" to={product.to} aria-labelledby={id}>
          <OptimizedImage
            className="h-full w-full transform object-cover transition duration-500 motion-safe:group-hover:scale-110 motion-safe:group-focus:scale-110"
            src={product.image}
            width={480}
            height={480}
            responsive={
              index % 3 === 0
                ? [
                    {
                      size: {
                        height: 480,
                        width: 480,
                      },
                    },
                    {
                      size: {
                        height: 767,
                        width: 767,
                      },
                    },
                    {
                      size: {
                        height: 1024,
                        width: 1024,
                      },
                    },
                  ]
                : [
                    {
                      size: {
                        height: 480,
                        width: 480,
                      },
                    },
                    {
                      size: {
                        height: 600,
                        width: 600,
                      },
                    },
                  ]
            }
            alt=""
          />
        </Link>
        <div className="absolute top-0 left-0 right-0">
          <div className="flex">
            <Link prefetch="intent" to={product.to} className="group-tpgi block flex-1" tabIndex={-1} id={id}>
              <h1 className="inline-block px-4 py-2 text-2xl font-semibold">{product.title}</h1>
              <br />
              <p className="inline-block px-4 py-2 text-sm ">{product.formattedPrice}</p>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export function ThreeProductGrid({
  products,
  variant = "primary",
}: {
  products: Array<ThreeProductGridProduct>;
  variant?: "primary" | "secondary";
}) {
  return (
    <section>
      <ul className={`three-product-grid-${variant} md:grid`}>
        {products.map((product, index) => (
          <ThreeProductGridItem key={product.id} product={product} index={index} />
        ))}
      </ul>
    </section>
  );
}
