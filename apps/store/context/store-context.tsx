import fetch from 'isomorphic-unfetch';
import * as React from 'react';
import ShopifyBuy from 'shopify-buy';

const client = ShopifyBuy.buildClient(
  {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    storefrontAccessToken:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
  // @ts-expect-error: Types are wrong here. Second param in fetch function.
  fetch
);

interface StoreState {
  addVariantToCart: (variantId: string, quantity: number) => Promise<void>;
  checkout?: ShopifyBuy.Cart;
  client: ShopifyBuy.Client;
  didJustAddToCart: boolean;
  isLoading: boolean;
  removeLineItem: (checkoutId: string, lineItemId: string) => Promise<void>;
  updateLineItem: (
    checkoutId: string,
    lineItemId: string,
    quantity: number
  ) => Promise<void>;
}

const StoreContext = React.createContext<StoreState | undefined>(undefined);

const isBrowser = typeof window !== 'undefined';
const localStorageKey = 'shopify_checkout_id';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps): JSX.Element {
  const [checkout, setCheckout] = React.useState<ShopifyBuy.Cart>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [didJustAddToCart, setDidJustAddToCart] = React.useState(false);

  const setCheckoutItem = (checkout: ShopifyBuy.Cart) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id as string);
    }

    setCheckout(checkout);
  };

  React.useEffect(() => {
    const initializeCheckout = async () => {
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
          localStorage.removeItem(localStorageKey);
        }
      }

      const newCheckout = await client.checkout.create();
      setCheckoutItem(newCheckout);
    };

    initializeCheckout();
  }, []);

  const addVariantToCart = async (variantId: string, quantity: number) => {
    setIsLoading(true);

    const checkoutId = checkout?.id as string;

    const lineItemsToUpdate = [
      {
        variantId,
        quantity,
      },
    ];

    try {
      const newCheckout = await client.checkout.addLineItems(
        checkoutId,
        lineItemsToUpdate
      );
      setCheckout(newCheckout);
      setDidJustAddToCart(true);
      setTimeout(() => setDidJustAddToCart(false), 3000);
    } catch (error) {
      console.error('Error in addVariantToCart:', error);
      setIsLoading(false);
    }
  };

  const removeLineItem = async (checkoutId: string, lineItemId: string) => {
    setIsLoading(true);

    try {
      const newCheckout = await client.checkout.removeLineItems(checkoutId, [
        lineItemId,
      ]);
      setCheckout(newCheckout);
      setIsLoading(false);
    } catch (error) {
      console.error('removeLineItem in addVariantToCart:', error);
      setIsLoading(false);
    }
  };

  const updateLineItem = async (
    checkoutId: string,
    lineItemId: string,
    quantity: number
  ) => {
    setIsLoading(true);

    const lineItemsToUpdate = [{ id: lineItemId, quantity }];

    try {
      const newCheckout = await client.checkout.updateLineItems(
        checkoutId,
        lineItemsToUpdate
      );
      setCheckout(newCheckout);
      setIsLoading(false);
    } catch (error) {
      console.error('Error in updateLineItem:', error);
      setIsLoading(false);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        addVariantToCart,
        checkout,
        client,
        didJustAddToCart,
        isLoading,
        removeLineItem,
        updateLineItem,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext(): StoreState {
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
