import { gql } from "@ts-gql/tag/no-transform";

import { initialiseTsGql } from "../utils/apollo-client";

const CREATE_CART = gql`
  mutation CreateCart {
    cartCreate {
      cart {
        checkoutUrl
        id
      }
    }
  }
` as import("../../__generated__/ts-gql/CreateCart").type;

export type InitialCart = NonNullable<typeof CREATE_CART["___type"]["result"]["cartCreate"]>["cart"];

export async function createCart(): Promise<InitialCart | undefined> {
  const client = initialiseTsGql();
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CART,
    });
    return data?.cartCreate?.cart;
  } catch (error) {
    console.error(error);
  }
}
