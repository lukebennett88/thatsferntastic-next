import type { LoaderFunction } from "remix";
import { json } from "remix";

import commerce from "~/commerce.server";
import type { ThreeProductGridProduct } from "~/components/three-product-grid";
import { getSession } from "~/session.server";

export type LoaderData = {
  featuredProducts: Array<ThreeProductGridProduct>;
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request);
  let [featuredProducts, wishlist] = await Promise.all([commerce.getFeaturedProducts(), session.getWishlist()]);

  let wishlistHasProduct = new Set(wishlist.map<string>((item) => item.productId));

  return json<LoaderData>({
    featuredProducts: featuredProducts.map(({ formattedPrice, id, image, slug, title, defaultVariantId }) => ({
      favorited: wishlistHasProduct.has(id),
      formattedPrice,
      id,
      defaultVariantId,
      image,
      title,
      to: `/product/${slug}`,
    })),
  });
};
