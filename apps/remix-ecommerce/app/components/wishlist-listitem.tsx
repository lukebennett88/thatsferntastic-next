import cn from "classnames";
import type { ReactNode } from "react";
import { useFetcher, useLocation } from "remix";

import { CartIcon, CloseIcon, MinusIcon, PlusIcon } from "./icons";
import { OptimizedImage } from "./optimized-image";

export function WishlistListItem({
  formattedOptions,
  formattedPrice,
  image,
  quantity,
  title,
  variantId,
  productId,
}: {
  formattedOptions: ReactNode;
  formattedPrice: ReactNode;
  image: string;
  quantity: number;
  title: ReactNode;
  variantId: string;
  productId: string;
}) {
  let location = useLocation();
  let { Form } = useFetcher();

  return (
    <li key={variantId} className="mb-6">
      <div className="flex">
        <div className="relative mr-4 block aspect-square w-16">
          <OptimizedImage
            className="absolute inset-0 bg-pink-500"
            src={image}
            alt=""
            responsive={[
              {
                size: {
                  width: 64,
                  height: 64,
                },
              },
              {
                size: {
                  width: 128,
                  height: 128,
                },
              },
            ]}
          />
        </div>
        <div className="flex-1 pr-2">
          <h2 className="text-lg">{title}</h2>
          {formattedOptions ? <p className="text-sm text-gray-300">{formattedOptions}</p> : null}
        </div>
        <p className="text-sm">{formattedPrice}</p>
      </div>
      <div className="mt-2 flex">
        <Form method="post" action="/wishlist">
          <input type="hidden" name="_action" defaultValue="delete" />
          <input
            key={location.pathname + location.search}
            type="hidden"
            name="redirect"
            defaultValue={location.pathname + location.search}
          />
          <input key={variantId} type="hidden" defaultValue={variantId} name="variantId" />
          <button
            data-testid="remove-from-wishlist"
            type="submit"
            className="mr-2 flex h-9 w-9 items-center justify-center border border-zinc-700"
          >
            <span className="sr-only">Remove from wishlist</span>
            <CloseIcon className="h-6 w-6" />
          </button>
        </Form>
        <div className="h-9 flex-1 border border-zinc-700 p-1 px-3">
          <span className="sr-only">{"Quantity: $1".replace("$1", quantity.toString())}</span>
          <span aria-hidden={true}>{quantity}</span>
        </div>
        <Form action="/wishlist" method="post">
          <input type="hidden" name="_action" defaultValue="set-quantity" />
          <input
            key={location.pathname + location.search}
            type="hidden"
            name="redirect"
            defaultValue={location.pathname + location.search}
          />
          <input key={productId} type="hidden" defaultValue={productId} name="productId" />
          <input key={variantId} type="hidden" defaultValue={variantId} name="variantId" />
          <input
            key={quantity - 1 <= 0 ? 1 : quantity - 1}
            type="hidden"
            name="quantity"
            disabled={quantity - 1 <= 0}
            defaultValue={quantity - 1 <= 0 ? 1 : quantity - 1}
          />
          <button
            data-testid="decrement-wishlist"
            type="submit"
            disabled={quantity - 1 <= 0}
            className={cn(
              "flex h-9 w-9 items-center justify-center border border-l-0 border-zinc-700",
              quantity - 1 <= 0 && "text-gray-300",
            )}
          >
            <span className="sr-only">Subtract item</span>
            <MinusIcon className="h-6 w-6" />
          </button>
        </Form>
        <Form action="/wishlist" method="post">
          <input type="hidden" name="_action" defaultValue="set-quantity" />
          <input
            key={location.pathname + location.search}
            type="hidden"
            name="redirect"
            defaultValue={location.pathname + location.search}
          />
          <input key={productId} type="hidden" defaultValue={productId} name="productId" />
          <input key={variantId} type="hidden" defaultValue={variantId} name="variantId" />
          <input key={quantity + 1} type="hidden" name="quantity" defaultValue={quantity + 1} />
          <button
            data-testid="increment-wishlist"
            type="submit"
            className="flex h-9 w-9 items-center justify-center border border-l-0 border-zinc-700"
          >
            <span className="sr-only">Add item</span>
            <PlusIcon className="h-6 w-6" />
          </button>
        </Form>
        <Form method="post" action="/wishlist">
          <input type="hidden" name="_action" defaultValue="move-to-cart" />
          <input
            key={location.pathname + location.search}
            type="hidden"
            name="redirect"
            defaultValue={location.pathname + location.search}
          />
          <input key={variantId} type="hidden" defaultValue={variantId} name="variantId" />
          <button
            data-testid="move-to-cart"
            type="submit"
            className="ml-2 flex h-9 w-9 items-center justify-center border border-zinc-700"
            title="Move to cart"
          >
            <span className="sr-only">Move to cart</span>
            <CartIcon className="h-6 w-6" />
          </button>
        </Form>
      </div>
    </li>
  );
}
