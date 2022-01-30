import type { LoaderFunction, MetaFunction } from "remix";
import { json } from "remix";
import { Page } from "types/sanity-schema";

import { getClient } from "~/utils/sanity/get-client";
import { pageQuery } from "~/utils/sanity/queries";

export const meta: MetaFunction = ({ data }: { data?: LoaderData }) => {
  return data
    ? {
        title: `${data?.sanityPage.title} | @thatsferntastic`,
        // TODO: Add description
      }
    : {
        title: "",
      };
};

export type LoaderData = {
  sanityPage: Page;
};

export const loader: LoaderFunction = async ({ params }) => {
  // Query for _all_ documents with this slug
  // There could be two: Draft and Published!
  const queryParams = { slug: params.slug };
  const sanityPage = await getClient().fetch<Page>(pageQuery, queryParams);

  return json<LoaderData>({
    sanityPage,
  });
};
