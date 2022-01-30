import type { ShouldReloadFunction } from "remix";
import { useLoaderData } from "remix";

import { ProductDetails } from "~/components/product-details";
import { defaultMeta } from "~/utils/default-meta";

import type { LoaderData } from "./pdp.server";

export let unstable_shouldReload: ShouldReloadFunction = ({ prevUrl, url }) => {
  return prevUrl.toString() !== url.toString();
};

export const meta = ({ data }: { data?: LoaderData }) => {
  return data?.product?.title
    ? {
        title: data.product.title,
        description: data.product.description,
      }
    : defaultMeta;
};

export default function ProductDetailPage() {
  let { product } = useLoaderData<LoaderData>();

  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
}
