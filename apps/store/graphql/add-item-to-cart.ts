import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart(
    $checkoutLineItemsAddLineItems: [CheckoutLineItemInput!]!
    $checkoutLineItemsAddCheckoutId: ID!
  ) {
    checkoutLineItemsAdd(
      lineItems: $checkoutLineItemsAddLineItems
      checkoutId: $checkoutLineItemsAddCheckoutId
    ) {
      checkout {
        id
        lineItems {
          edges {
            node {
              id
              quantity
              title
              unitPrice {
                amount
              }
              # variant {
              #   id
              #   image {
              #     id
              #     altText
              #     transformedSrc
              #   }
              #   priceV2 {
              #     amount
              #   }
              # }
            }
          }
        }
        webUrl
      }
    }
  }
` as import('../../../__generated__/ts-gql/AddItemToCart').type;

export type Checkout =
  typeof ADD_ITEM_TO_CART['___type']['result']['checkoutLineItemsAdd'];

interface CheckoutLineItemsAddLineItems {
  quantity: number;
  variantId: string;
}

interface AddItemToCart {
  client: Client;
  checkoutLineItemsAddLineItems: CheckoutLineItemsAddLineItems[];
  checkoutLineItemsAddCheckoutId: string;
}

export async function addItemToCart({
  client,
  checkoutLineItemsAddLineItems,
  checkoutLineItemsAddCheckoutId,
}: AddItemToCart): Promise<Checkout | undefined> {
  try {
    const { data } = await client.mutate({
      mutation: ADD_ITEM_TO_CART,
      variables: {
        checkoutLineItemsAddLineItems,
        checkoutLineItemsAddCheckoutId,
      },
    });
    return data?.checkoutLineItemsAdd;
  } catch (error) {
    console.error(error);
  }
}
