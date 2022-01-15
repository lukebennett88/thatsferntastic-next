import * as React from "react";

import type { Product } from "../../graphql/get-all-products";
import { getAllProducts } from "../../graphql/get-all-products";

export interface Category {
  category: string;
  href: string;
}

export function useGetAllCategories(): Category[] {
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    (async () => {
      // Get all products and save to state
      const products = await getAllProducts();
      setProducts(products);
    })();
  }, []);

  const categories: string[] = [
    // @ts-expect-error: Type 'Set<string>' is not an array type or a string type. Use compiler option '--downlevelIteration' to allow iterating of iterators.
    ...new Set(products.filter(({ node }) => Boolean(node.productType)).map(({ node }) => node.productType)),
  ];
  return categories.map((category) => ({
    category,
    href: `/categories?type=${category}`,
  }));
}
