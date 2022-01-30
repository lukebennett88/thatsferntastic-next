import { useId } from "@reach/auto-id";
import cn from "classnames";
import type { ReactNode } from "react";
import { useMemo } from "react";
import type { To } from "react-router-dom";
import { Link, useFetcher, useLocation } from "remix";

import { WishlistIcon } from "./icons";
import { OptimizedImage } from "./optimized-image";

export type ThreeProductGridProduct = {
  id: string;
  defaultVariantId: string;
  title: ReactNode;
  formattedPrice: ReactNode;
  favorited: boolean;
  image: string;
  to: To;
};

function ThreeProductGridItem({
  backgroundColor,
  wishlistColors,
  product,
  index,
}: {
  backgroundColor: string;
  wishlistColors: Array<string>;
  product: ThreeProductGridProduct;
  index: number;
}) {
  let id = `three-product-grid-item-${useId()}`;
  let { Form } = useFetcher();
  let location = useLocation();

  return (
    <li key={product.id} className={`three-product-grid__item-${index % 3}`}>
      <div className={cn("group relative block aspect-square overflow-hidden", backgroundColor)}>
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
            <Form replace action="/wishlist" method="post">
              <input
                key={product.favorited.toString()}
                type="hidden"
                name="_action"
                defaultValue={product.favorited ? "delete" : "add"}
              />
              <input type="hidden" name="redirect" defaultValue={location.pathname + location.search} />
              <input key={product.id} type="hidden" name="productId" defaultValue={product.id} />
              <input
                key={product.defaultVariantId}
                type="hidden"
                name="variantId"
                defaultValue={product.defaultVariantId}
              />

              <button
                data-testid="add-to-wishlist"
                className={cn(
                  "focus:  hover: p-2 transition-colors duration-300 ease-in-out",
                  product.favorited ? "text-red-500" : wishlistColors,
                )}
              >
                <span className="sr-only">{product.favorited ? "Remove from wishlist" : "Add to wishlist"}</span>
                <WishlistIcon className="h-8 w-8" />
              </button>
            </Form>
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
  let [backgroundColors, wishlistColors] = useMemo(
    () =>
      [
        ["bg-pink-500", "bg-yellow-500", "bg-blue-500"],
        [
          [
            "group-focus:bg-pink-500",
            "group-hover:bg-pink-500",
            "focus:bg-pink-500",
            "hover:bg-pink-500",
            "focus:text-zinc-900",
            "hover:text-zinc-900",
          ],
          [
            "group-focus:bg-yellow-500",
            "group-hover:bg-yellow-500",
            "focus:bg-yellow-500",
            "hover:bg-yellow-500",
            "focus:text-zinc-900",
            "hover:text-zinc-900",
          ],
          [
            "group-focus:bg-blue-500",
            "group-hover:bg-blue-500",
            "focus:bg-blue-500",
            "hover:bg-blue-500",
            "focus:text-zinc-900",
            "hover:text-zinc-900",
          ],
        ],
      ].map((colors) => {
        if (variant === "primary") return colors;

        return [colors[1], colors[0], colors[2]];
      }) as [Array<string>, Array<Array<string>>],
    [variant],
  );

  return (
    <section>
      <ul className={`three-product-grid-${variant} md:grid`}>
        {products.map((product, index) => (
          <ThreeProductGridItem
            key={product.id}
            product={product}
            index={index}
            backgroundColor={backgroundColors[index % 3]}
            wishlistColors={wishlistColors[index % 3]}
          />
        ))}
      </ul>
    </section>
  );
}
