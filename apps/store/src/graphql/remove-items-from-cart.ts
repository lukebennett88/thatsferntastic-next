import { gql } from "@ts-gql/tag/no-transform";

import { initialiseTsGql } from "../utils/apollo-client";
import type { UpdatedCart } from "./add-items-to-cart";
import { CART_FRAGMENT } from "./cart-fragment";

export const REMOVE_ITEMS_FROM_CART = gql`
  mutation RemoveItemsFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
` as import("../../__generated__/ts-gql/RemoveItemsFromCart").type;

export type Line = {
  merchandiseId: string;
  quantity?: number;
};

interface RemoveItemsFromCart {
  cartId: string;
  lineIds: Array<string>;
}

export async function removeItemsFromCart({ cartId, lineIds }: RemoveItemsFromCart): Promise<UpdatedCart | undefined> {
  const client = initialiseTsGql();
  try {
    const { data } = await client.mutate({
      mutation: REMOVE_ITEMS_FROM_CART,
      variables: {
        cartId,
        lineIds,
      },
    });
    return data?.cartLinesRemove?.cart;
  } catch (error) {
    console.error(error);
  }
}
