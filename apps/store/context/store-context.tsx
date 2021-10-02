import fetch from 'isomorphic-unfetch';
import * as React from 'react';
import type { Cart, Client } from 'shopify-buy';
import ShopifyBuy from 'shopify-buy';

const client: Client = ShopifyBuy.buildClient(
  {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    storefrontAccessToken:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
  // @ts-expect-error Types are wrong here, second param is fetch function.
  fetch
);

import { useLocalStorageState } from '../utils/hooks';

interface CartState {
  addVariantToCart: (variantId: string, quantity: number) => Promise<void>;
  cart?: Cart;
  client?: Client;
  removeLineItem: (checkoutId: string, lineItemId: string) => Promise<void>;
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
  updateLineItem: (
    checkoutId: string,
    lineItemId: string,
    quantity: number
  ) => Promise<void>;
}

const StoreContext = React.createContext<CartState | undefined>(undefined);

const localStorageKey = 'shopify_checkout_id';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps): JSX.Element {
  const [cart, setCart] = useLocalStorageState(localStorageKey);
  // // If we don't have a cart in local storage, create a new one
  // const prevCartRef = React.useRef(cart);
  // React.useEffect(() => {
  //   const getNewCart = async (): Promise<void> => {
  //     const prevCart = prevCartRef.current;
  //     // Not sure if this comparison will work or not
  //     if (isEqual(prevCart, cart)) {
  //       const client = initialiseTsGql();
  //       const newCart = await createCheckout(client);
  //       setCart(newCart);
  //       prevCartRef.current = cart;
  //     }
  //   };
  //   // If cart as been purchased, create a new cart
  //   if (!cart || cart?.completedAt) {
  //     getNewCart();
  //   }
  // }, [cart, setCart]);
  const isBrowser = typeof window !== 'undefined';

  React.useEffect(() => {
    const setCheckoutItem = (cart: Cart) => {
      if (isBrowser) {
        localStorage.setItem(localStorageKey, cart.id as string);
      }
      setCart(cart);
    };
    const initialiseCheckout = async () => {
      const existingCheckoutId = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null;

      if (existingCheckoutId && existingCheckoutId !== 'null') {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutId
          );
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout);
            return;
          }
        } catch (error) {
          console.error('initialiseCheckout', error);
          localStorage.removeItem(localStorageKey);
        }
      }

      const newCheckout = await client.checkout.create();
      setCheckoutItem(newCheckout);
    };

    initialiseCheckout();
  }, [isBrowser, setCart]);

  const addVariantToCart = async (
    variantId: string,
    quantity: number
  ): Promise<void> => {
    const checkoutId = cart.id;

    const lineItemsToUpdate = [
      {
        variantId,
        quantity,
      },
    ];

    try {
      const newCart = await client.checkout.addLineItems(
        checkoutId,
        lineItemsToUpdate
      );
      setCart(newCart);
    } catch (error) {
      console.error('addVariantToCart', error);
      localStorage.removeItem(localStorageKey);
    }
  };

  const removeLineItem = async (
    checkoutId: string,
    lineItemId: string
  ): Promise<void> => {
    try {
      const newCart = await client.checkout.removeLineItems(checkoutId, [
        lineItemId,
      ]);
      setCart(newCart);
    } catch (error) {
      console.error('removeLineItem', error);
      localStorage.removeItem(localStorageKey);
    }
  };

  const updateLineItem = async (
    checkoutId: string,
    lineItemId: string,
    quantity: number
  ): Promise<void> => {
    const lineItemsToUpdate = [
      {
        id: lineItemId,
        quantity,
      },
    ];

    try {
      const newCart = await client.checkout.updateLineItems(
        checkoutId,
        lineItemsToUpdate
      );
      setCart(newCart);
    } catch (error) {
      console.error('updateLineItem', error);
      localStorage.removeItem(localStorageKey);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        addVariantToCart,
        cart,
        client,
        removeLineItem,
        setCart,
        updateLineItem,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext(): CartState {
  const context = React.useContext(StoreContext);
  // If context is undefined, we know we used useStoreContext
  // outside of our provider so we can throw a more helpful
  // error!
  if (context === undefined) {
    throw Error(
      'useStoreContext must be used inside of StoreContext.Provider, ' +
        'otherwise it will not function correctly.'
    );
  }

  // Because of TypeScript's type narrowing, if we make it past
  // the error the compiler knows that context is always defined
  // at this point, so we don't need to do any conditional
  // checking on its values when we use this hook!
  return context;
}
