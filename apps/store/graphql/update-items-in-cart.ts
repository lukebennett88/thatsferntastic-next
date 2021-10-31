import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';
import type { UpdatedCart } from './add-items-to-cart';

export const UPDATE_ITEMS_IN_CART = gql`
  mutation UpdateItemsInCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        ...Cart_Fragment
      }
    }
  }
` as import('../../../__generated__/ts-gql/UpdateItemsInCart').type;

interface UpdateItemsInCart {
  client: Client;
  cartId: string;
  lines: Array<{
    id: string;
    quantity: number;
  }>;
}

export async function updateItemsInCart({
  client,
  cartId,
  lines,
}: UpdateItemsInCart): Promise<UpdatedCart | undefined> {
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
