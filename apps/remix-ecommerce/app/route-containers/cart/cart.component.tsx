import { useLoaderData } from "remix";

import { CartListItem } from "~/components/cart-listitem";
import { CheckoutForm } from "~/components/checkout-form";
import { CartIcon } from "~/components/icons";

import type { LoaderData } from "./cart.server";

export default function Cart() {
  let { cart } = useLoaderData<LoaderData>();

  return (
    <main className="mx-auto max-w-xl p-4 lg:p-6">
      <h1 className="mb-8 text-3xl">Cart</h1>
      {!cart?.items ? (
        <div className="flex flex-col items-center justify-center">
          <span className="border-primary bg-secondary text-secondary flex h-24 w-24 items-center justify-center rounded-full border border-dashed">
            <CartIcon className="block h-8 w-8" />
          </span>
          <h1 className="pt-6 text-center text-2xl font-bold tracking-wide">Your cart is empty</h1>
        </div>
      ) : (
        <>
          <ul>
            {cart.items.map((item) => (
              <CartListItem
                key={item.variantId}
                formattedOptions={item.info.formattedOptions}
                quantity={item.quantity}
                formattedPrice={item.info.formattedPrice}
                image={item.info.image}
                title={item.info.title}
                variantId={item.variantId}
              />
            ))}
          </ul>

          <CheckoutForm className="mt-24 border-t border-zinc-700 pt-4" cart={cart} />
        </>
      )}
    </main>
  );
}
