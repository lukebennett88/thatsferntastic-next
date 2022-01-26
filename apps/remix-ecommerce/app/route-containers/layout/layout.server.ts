import type { LoaderFunction } from "remix";
import { json } from "remix";

import commerce from "~/commerce.server";
import type { FooterPage } from "~/components/footer";
import type { NavbarCategory } from "~/components/navbar";
import type { CartInfo, FullWishlistItem } from "~/models/ecommerce-provider.server";
import { getSession } from "~/session.server";

export type LoaderData = {
  cart?: CartInfo;
  categories: NavbarCategory[];
  pages: FooterPage[];
  storeName: string;
  wishlist?: FullWishlistItem[];
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request);
  let [categories, pages, cart, wishlist] = await Promise.all([
    commerce.getCategories(250),
    commerce.getPages(),
    session.getCart().then((cartItems) => commerce.getCartInfo(cartItems)),
    session.getWishlist().then((wishlistItems) => commerce.getWishlistInfo(wishlistItems)),
  ]);

  return json<LoaderData>({
    cart,
    categories: [
      ...categories.map(({ name, slug }) => ({
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
  });
};
