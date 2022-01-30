import { useMemo } from "react";
import { useLoaderData } from "remix";

import { CtaBanner } from "~/components/cta-banner";
import { ScrollingProductList } from "~/components/scrolling-product-list";
import { ThreeProductGrid } from "~/components/three-product-grid";

import type { LoaderData } from "./home.server";

function chunkProducts<T>(start: number, goal: number, products: Array<T>) {
  let slice = products.slice(start, start + 3);

  if (products.length < goal) return slice;
  for (let i = start + 3; slice.length < goal; i++) {
    slice.push(products[i % products.length]);
  }

  return slice;
}

export default function IndexPage() {
  let { featuredProducts } = useLoaderData<LoaderData>();

  return (
    <main>
      <ThreeProductGrid
        variant="primary"
        products={useMemo(() => chunkProducts(0, 3, featuredProducts), [featuredProducts])}
      />
      <ScrollingProductList
        variant="secondary"
        products={useMemo(() => chunkProducts(3, 3, featuredProducts), [featuredProducts])}
      />
      <CtaBanner
        headline="Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake."
        ctaText="Read it here"
        ctaTo="/"
        variant="secondary"
      />
      <ThreeProductGrid
        variant="secondary"
        products={useMemo(() => chunkProducts(6, 3, featuredProducts), [featuredProducts])}
      />
      <ScrollingProductList
        variant="primary"
        products={useMemo(() => chunkProducts(9, 3, featuredProducts), [featuredProducts])}
      />
    </main>
  );
}
