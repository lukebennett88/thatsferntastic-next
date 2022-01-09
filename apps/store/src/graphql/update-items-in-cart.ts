import { gql } from "@ts-gql/tag/no-transform";

import { initialiseTsGql } from "../utils/apollo-client";
import type { UpdatedCart } from "./add-items-to-cart";
import { CART_FRAGMENT } from "./cart-fragment";

export const UPDATE_ITEMS_IN_CART = gql`
  mutation UpdateItemsInCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
` as import("../../__generated__/ts-gql/UpdateItemsInCart").type;

interface UpdateItemsInCart {
  cartId: string;
  lines: Array<{
    id: string;
    quantity: number;
  }>;
}

export async function updateItemsInCart({ cartId, lines }: UpdateItemsInCart): Promise<UpdatedCart | undefined> {
  const client = initialiseTsGql();
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_ITEMS_IN_CART,
      variables: {
        cartId,
        lines,
      },
    });
    return data?.cartLinesUpdate?.cart;
  } catch (error) {
    console.error(error);
  }
}
