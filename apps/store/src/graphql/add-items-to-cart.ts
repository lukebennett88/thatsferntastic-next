import { gql } from "@ts-gql/tag/no-transform";

import type { Client } from "../utils/apollo-client";
import { CART_FRAGMENT } from "./cart-fragment";

export const ADD_ITEMS_TO_CART = gql`
  mutation AddItemsToCart($lines: [CartLineInput!]!, $cartId: ID!) {
    cartLinesAdd(lines: $lines, cartId: $cartId) {
      cart {
        id
        ...Cart_Fragment
      }
      userErrors {
        code
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
` as import("../../../__generated__/ts-gql/AddItemsToCart").type;

export type UpdatedCart = NonNullable<typeof ADD_ITEMS_TO_CART["___type"]["result"]["cartLinesAdd"]>["cart"];

export type Line = {
  merchandiseId: string;
  quantity?: number;
};

interface AddItemsToCart {
  client: Client;
  cartId: string;
  lines: Line | Array<Line>;
}

export async function addItemsToCart({ client, cartId, lines }: AddItemsToCart): Promise<UpdatedCart | undefined> {
  try {
    const { data } = await client.mutate({
      mutation: ADD_ITEMS_TO_CART,
      variables: {
        cartId,
        lines,
      },
    });
    return data?.cartLinesAdd?.cart;
  } catch (error) {
    console.error(error);
  }
}
