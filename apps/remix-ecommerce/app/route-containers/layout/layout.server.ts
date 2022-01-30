import type { LoaderFunction } from "remix";
import { json } from "remix";

import commerce from "~/commerce.server";
import type { FooterPage } from "~/components/footer";
import type { CartInfo, FullWishlistItem } from "~/models/ecommerce-provider.server";
import type { Collection } from "~/route-containers/layout/layout.component";
import { getSession } from "~/session.server";

export type LoaderData = {
  cart?: CartInfo;
  collections: Array<Collection>;
  pages: Array<FooterPage>;
  storeName: string;
  wishlist?: Array<FullWishlistItem>;
  year: number;
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request);
  let [collections, pages, cart, wishlist] = await Promise.all([
    commerce.getCategories(250),
    commerce.getPages(),
    session.getCart().then((cartItems) => commerce.getCartInfo(cartItems)),
    session.getWishlist().then((wishlistItems) => commerce.getWishlistInfo(wishlistItems)),
  ]);

  return json<LoaderData>({
    cart,
    collections: [
      ...collections.map(({ name, slug }) => ({
        name,
        to: `/search?category=${slug}`,
      })),
    ],
    pages: [
      {
        id: "home",
        title: "Home",
        to: "/",
      },
      ...pages.map(({ id, slug, title }) => ({
        id,
        title,
        to: `/${slug}`,
      })),
    ],
    storeName: "@thatsferntastic",
    wishlist,
    year: new Date().getFullYear(),
  });
};
