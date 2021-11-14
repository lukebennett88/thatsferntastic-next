import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';
import type { UpdatedCart } from './add-items-to-cart';

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
` as import('../../../__generated__/ts-gql/RemoveItemsFromCart').type;

export type Line = {
  merchandiseId: string;
  quantity?: number;
};

interface RemoveItemsFromCart {
  client: Client;
  cartId: string;
  lineIds: Array<string>;
}

export async function removeItemsFromCart({
  client,
  cartId,
  lineIds,
}: RemoveItemsFromCart): Promise<UpdatedCart | undefined> {
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
