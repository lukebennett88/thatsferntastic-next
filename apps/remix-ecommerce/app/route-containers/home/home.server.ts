import type { LoaderFunction } from "remix";
import { json } from "remix";

import commerce from "~/commerce.server";
import type { ThreeProductGridProduct } from "~/components/three-product-grid";

export type LoaderData = {
  featuredProducts: Array<ThreeProductGridProduct>;
};

export let loader: LoaderFunction = async () => {
  let featuredProducts = await commerce.getFeaturedProducts();

  return json<LoaderData>({
    featuredProducts: featuredProducts.map(({ formattedPrice, id, image, slug, title, defaultVariantId }) => ({
      formattedPrice,
      id,
      defaultVariantId,
      image,
      title,
      to: `/product/${slug}`,
    })),
  });
};
