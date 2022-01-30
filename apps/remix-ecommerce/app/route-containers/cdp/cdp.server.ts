import type { To } from "react-router-dom";
import type { LoaderFunction } from "remix";
import { json } from "remix";

import commerce from "~/commerce.server";
import type { Category, SortByOption } from "~/models/ecommerce-provider.server";
import { getSession } from "~/session.server";

export type CDPProduct = {
  id: string;
  title: string;
  formattedPrice: string;
  favorited: boolean;
  image: string;
  to: To;
  defaultVariantId: string;
};

export type LoaderData = {
  category?: string;
  sort?: string;
  categories: Array<Category>;
  search?: string;
  sortByOptions: Array<SortByOption>;
  products: Array<CDPProduct>;
  hasNextPage: boolean;
  nextPageCursor?: string;
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request);
  let url = new URL(request.url);

  let category = url.searchParams.get("category") || undefined;
  let sort = url.searchParams.get("sort") || undefined;
  let search = url.searchParams.get("q") || undefined;
  let cursor = url.searchParams.get("cursor") || undefined;
  let nocache = url.searchParams.has("nocache");

  let [categories, sortByOptions, productsPage, wishlist] = await Promise.all([
    commerce.getCategories(250, nocache),
    commerce.getSortByOptions(),
    commerce.getProducts(category, sort, search, cursor, 30, nocache),
    session.getWishlist(),
  ]);

  let wishlistHasProduct = new Set(wishlist.map<string>((item) => item.productId));

  return json<LoaderData>({
    category,
    sort,
    categories,
    search,
    sortByOptions,
    hasNextPage: productsPage.hasNextPage,
    nextPageCursor: productsPage.nextPageCursor,
    products: productsPage.products.map((product) => ({
      favorited: wishlistHasProduct.has(product.id),
      formattedPrice: product.formattedPrice,
      id: product.id,
      image: product.image,
      title: product.title,
      to: `/product/${product.slug}`,
      defaultVariantId: product.defaultVariantId,
    })),
  });
};
