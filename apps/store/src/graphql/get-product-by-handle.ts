import { gql } from "@ts-gql/tag/no-transform";

import { initialiseTsGql } from "../utils/apollo-client";
import { PRODUCT_FRAGMENT } from "./product-fragments";

export const GET_PRODUCT_BY_HANDLE = gql`
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...Product_Fragment
    }
  }
  ${PRODUCT_FRAGMENT}
` as import("../../__generated__/ts-gql/GetProductByHandle").type;

export type Product = typeof GET_PRODUCT_BY_HANDLE["___type"]["result"]["product"];

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  const client = initialiseTsGql();
  try {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_HANDLE,
      variables: {
        handle,
      },
    });
    return data?.product;
  } catch (error) {
    console.error(error);
  }
}
