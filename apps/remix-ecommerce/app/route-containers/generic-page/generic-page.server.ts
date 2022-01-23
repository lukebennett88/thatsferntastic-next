import type { LoaderFunction } from "remix";
import { json } from "remix";

import commerce from "~/commerce.server";
import type { FullPage } from "~/models/ecommerce-provider.server";

export type LoaderData = {
  page: FullPage;
};

export let loader: LoaderFunction = async ({ params }) => {
  let page = await commerce.getPage(params["*"]!);

  if (!page) {
    throw json("Page not found", { status: 404 });
  }

  return json<LoaderData>({
    page,
  });
};
