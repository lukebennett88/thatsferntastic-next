import type { To } from "react-router-dom";
import type { LoaderFunction } from "remix";
import { json } from "remix";

import commerce from "~/commerce.server";
import type { Category, SortByOption } from "~/models/ecommerce-provider.server";

export type CDPProduct = {
  id: string;
  title: string;
  formattedPrice: string;
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
  let url = new URL(request.url);

  let category = url.searchParams.get("category") || undefined;
  let sort = url.searchParams.get("sort") || undefined;
  let search = url.searchParams.get("q") || undefined;
  let cursor = url.searchParams.get("cursor") || undefined;
  let nocache = url.searchParams.has("nocache");

  let [categories, sortByOptions, productsPage] = await Promise.all([
    commerce.getCollections(250, nocache),
    commerce.getSortByOptions(),
    commerce.getProducts(category, sort, search, cursor, 30, nocache),
  ]);

  return json<LoaderData>({
    category,
    sort,
    categories,
    search,
    sortByOptions,
    hasNextPage: productsPage.hasNextPage,
    nextPageCursor: productsPage.nextPageCursor,
    products: productsPage.products.map((product) => ({
      formattedPrice: product.formattedPrice,
      id: product.id,
      image: product.image,
      title: product.title,
      to: `/product/${product.slug}`,
      defaultVariantId: product.defaultVariantId,
    })),
  });
};
