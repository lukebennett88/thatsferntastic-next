import { gql } from "@ts-gql/tag/no-transform";

import type { Client } from "../utils/apollo-client";
import { PRODUCT_FRAGMENT } from "./product-fragments";

const TOP_SELLING_PRODUCTS = gql`
  query TopSellingProducts($first: Int = 4, $query: String) {
    products(first: $first, sortKey: BEST_SELLING, query: $query) {
      edges {
        node {
          ...Product_Fragment
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
` as import("../../__generated__/ts-gql/TopSellingProducts").type;

export type TopSellingProducts = typeof TOP_SELLING_PRODUCTS["___type"]["result"]["products"]["edges"];

interface GetTopSellingProducts {
  client: Client;
  first?: number;
  productType?: string;
}

export async function getTopSellingProducts({
  client,
  first,
  productType,
}: GetTopSellingProducts): Promise<TopSellingProducts | undefined> {
  try {
    const { data } = await client.query({
      query: TOP_SELLING_PRODUCTS,
      variables: {
        first,
        query: `${productType ? `product_type:${productType}, ` : ""}available_for_sale:true`,
      },
    });
    return data?.products.edges;
  } catch (error) {
    console.error(error);
  }
}
