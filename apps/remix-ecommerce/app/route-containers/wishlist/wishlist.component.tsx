import { useLoaderData } from "remix";

import { WishlistIcon } from "~/components/icons";
import { WishlistListItem } from "~/components/wishlist-listitem";

import type { LoaderData } from "./wishlist.server";

export default function Wishlist() {
  let { wishlist } = useLoaderData<LoaderData>();

  return (
    <main className="mx-auto max-w-xl p-4 lg:p-6">
      <h1 className="mb-8 text-3xl">Wishlist</h1>
      {!wishlist ? (
        <div className="flex flex-col items-center justify-center">
          <span className="border-primary bg-secondary text-secondary flex h-24 w-24 items-center justify-center rounded-full border border-dashed">
            <WishlistIcon className="block h-8 w-8" />
          </span>
          <h1 className="pt-6 text-center text-2xl font-bold tracking-wide">Your wishlist is empty</h1>
        </div>
      ) : (
        <>
          <ul>
            {wishlist.map((item) => (
              <WishlistListItem
                key={item.variantId}
                formattedOptions={item.info.formattedOptions}
                quantity={item.quantity}
                formattedPrice={item.info.formattedPrice}
                image={item.info.image}
                title={item.info.title}
                variantId={item.variantId}
                productId={item.productId}
              />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
