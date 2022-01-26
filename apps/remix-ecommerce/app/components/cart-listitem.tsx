import cn from "classnames";
import type { ReactNode } from "react";
import { useFetcher, useLocation } from "remix";

import { CloseIcon, MinusIcon, PlusIcon } from "./icons";
import { OptimizedImage } from "./optimized-image";

enum Actions {
  setQuantity = "set-quantity",
  delete = "delete",
}

export function CartListItem({
  formattedOptions,
  formattedPrice,
  image,
  quantity,
  title,
  variantId,
}: {
  formattedOptions: ReactNode;
  formattedPrice: ReactNode;
  image: string;
  quantity: number;
  title: ReactNode;
  variantId: string;
}) {
  let location = useLocation();
  let fetcher = useFetcher();
  let optimisticQuantity = quantity;
  let optimisticDeleting = false;

  if (fetcher.submission) {
    let values = Object.fromEntries(fetcher.submission.formData);
    if (typeof values.quantity === "string") {
      optimisticQuantity = parseInt(values.quantity, 10);
    }

    if (values._action === Actions.delete) {
      optimisticDeleting = true;
    }
  }

  return (
    <li key={variantId} className="mb-6" hidden={optimisticDeleting}>
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
        <fetcher.Form method="post" action="/cart">
          <input type="hidden" name="_action" defaultValue={Actions.delete} />
          <input
            key={location.pathname + location.search}
            type="hidden"
            name="redirect"
            defaultValue={location.pathname + location.search}
          />
          <input key={variantId} type="hidden" defaultValue={variantId} name="variantId" />
          <button
            data-testid="remove-from-cart"
            type="submit"
            className="mr-2 flex h-9 w-9 items-center justify-center border border-zinc-700"
          >
            <span className="sr-only">Remove from cart</span>
            <CloseIcon className="h-6 w-6" />
          </button>
        </fetcher.Form>
        <div className="h-9 flex-1 border border-zinc-700 p-1 px-3">
          <span className="sr-only">{"Quantity: $1"?.replace("$1", optimisticQuantity.toString())}</span>
          <span aria-hidden={true}>{optimisticQuantity}</span>
        </div>
        <fetcher.Form action="/cart" method="post">
          <input type="hidden" name="_action" value={Actions.setQuantity} />
          <input type="hidden" name="redirect" value={location.pathname + location.search} />
          <input type="hidden" value={variantId} name="variantId" />
          <input
            type="hidden"
            name="quantity"
            disabled={quantity - 1 <= 0}
            value={Math.max(0, optimisticQuantity - 1)}
          />
          <button
            data-testid="decrement-cart"
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
        </fetcher.Form>
        <fetcher.Form action="/cart" method="post">
          <input type="hidden" name="_action" defaultValue={Actions.setQuantity} />
          <input
            key={location.pathname + location.search}
            type="hidden"
            name="redirect"
            value={location.pathname + location.search}
          />
          <input type="hidden" value={variantId} name="variantId" />
          <input type="hidden" name="quantity" value={optimisticQuantity + 1} />
          <button
            data-testid="increment-cart"
            type="submit"
            className="flex h-9 w-9 items-center justify-center border border-l-0 border-zinc-700"
          >
            <span className="sr-only">Add item</span>
            <PlusIcon className="h-6 w-6" />
          </button>
        </fetcher.Form>
      </div>
    </li>
  );
}
