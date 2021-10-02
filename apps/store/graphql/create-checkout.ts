import { gql } from '@ts-gql/tag';

import type { Client } from '../utils/apollo-client';

const CREATE_CHECKOUT = gql`
  mutation CreateCheckout {
    checkoutCreate(input: {}) {
      checkout {
        id
        completedAt
        webUrl
      }
    }
  }
` as import('../../../__generated__/ts-gql/CreateCheckout').type;

export type InitialCheckout = NonNullable<
  typeof CREATE_CHECKOUT['___type']['result']['checkoutCreate']
>['checkout'];

export async function createCheckout(
  client: Client
): Promise<InitialCheckout | void> {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CHECKOUT,
    });
    return data?.checkoutCreate?.checkout;
  } catch (error) {
    console.error(error);
  }
}
