import { gql } from "@ts-gql/tag/no-transform";

import { initialiseTsGql } from "../utils/apollo-client";
import { PRODUCT_FRAGMENT } from "./product-fragments";

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      ...Product_Fragment
    }
  }
  ${PRODUCT_FRAGMENT}
` as import("../../__generated__/ts-gql/GetProductById").type;

export type Product = typeof GET_PRODUCT_BY_ID["___type"]["result"]["product"];

export async function getProductById(id: string): Promise<Product | undefined> {
  const client = initialiseTsGql();
  try {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_ID,
      variables: {
        id,
      },
    });
    return data?.product;
  } catch (error) {
    console.error(error);
  }
}
