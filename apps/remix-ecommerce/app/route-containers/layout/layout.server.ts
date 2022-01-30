import type { LoaderFunction } from "remix";
import { json } from "remix";
import { Page } from "types/sanity-schema";

import commerce from "~/commerce.server";
import type { CartInfo } from "~/models/ecommerce-provider.server";
import type { Collection } from "~/route-containers/layout/layout.component";
import { getSession } from "~/session.server";
import { getClient } from "~/utils/sanity/get-client";
import { allPagesQuery } from "~/utils/sanity/queries";

export type LoaderData = {
  cart?: CartInfo;
  collections: Array<Collection>;
  pages: Array<Page>;
  storeName: string;
  year: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const [cart, collections, pages] = await Promise.all([
    session.getCart().then((cartItems) => commerce.getCartInfo(cartItems)),
    commerce.getCollections(250),
    getClient().fetch<Array<Page>>(allPagesQuery),
  ]);

  return json<LoaderData>({
    cart,
    collections: [
      ...collections.map(({ name, slug }) => ({
        name,
        to: `/search?category=${slug}`,
      })),
    ],
    pages,
    storeName: "@thatsferntastic",
    year: new Date().getFullYear(),
  });
};
