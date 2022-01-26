import { useId } from "@reach/auto-id";
import cn from "classnames";
import type { To } from "react-router-dom";
import { Form, Link, useLocation } from "remix";

import { WishlistIcon } from "~/components/icons";
import { OptimizedImage } from "~/components/optimized-image";

export type CdpGridItemProduct = {
  id: string;
  title: string;
  formattedPrice: string;
  favorited: boolean;
  image: string;
  to: To;
  defaultVariantId: string;
};

export function CdpProductGridItem({ product }: { product: CdpGridItemProduct }) {
  let id = `three-product-grid-item-${useId()}`;
  let location = useLocation();

  return (
    <li>
      <div className="group relative block aspect-square overflow-hidden bg-zinc-800">
        <Link className="group block" prefetch="intent" to={product.to} aria-labelledby={id}>
          <OptimizedImage
            className="h-full w-full transform object-cover transition duration-500 motion-safe:group-hover:scale-110 motion-safe:group-focus:scale-110"
            src={product.image}
            width={480}
            height={480}
            responsive={[
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
            ]}
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
                  product.favorited
                    ? "text-red-500"
                    : "hover:bg-pink-500 hover:text-zinc-900 focus:bg-pink-500 focus:text-zinc-900 group-hover:bg-pink-500 group-focus:bg-pink-500",
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
