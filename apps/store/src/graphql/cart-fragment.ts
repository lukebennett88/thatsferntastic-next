import { gql } from "@ts-gql/tag/no-transform";

import { MONEY_V2_FRAGMENT, PRODUCT_FRAGMENT } from "./product-fragments";

export const CART_FRAGMENT = gql`
  fragment Cart_Fragment on Cart {
    id
    checkoutUrl
    estimatedCost {
      subtotalAmount {
        ...MoneyV2_Fragment
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          estimatedCost {
            subtotalAmount {
              ...MoneyV2_Fragment
            }
          }
          quantity
          merchandise {
            ... on ProductVariant {
              id
              selectedOptions {
                name
                value
              }
              product {
                ...Product_Fragment
              }
            }
          }
        }
      }
    }
  }
  ${MONEY_V2_FRAGMENT}
  ${PRODUCT_FRAGMENT}
` as import("../../../__generated__/ts-gql/Cart_Fragment").type;

export type CartLine = NonNullable<typeof CART_FRAGMENT["___type"]["result"]["lines"]>["edges"][number]["node"];
