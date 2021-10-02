import isEqual from 'lodash/isEqual';
import * as React from 'react';

import { createCheckout, InitialCheckout } from '../graphql/create-checkout';
import { initialiseTsGql } from '../utils/apollo-client';
import { useLocalStorageState } from '../utils/hooks';

type Cart = InitialCheckout;

interface CartState {
  cart?: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
}

const StoreContext = React.createContext<CartState | undefined>(undefined);

export const CART = 'shopify_local_store__cart';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps): JSX.Element {
  const [cart, setCart] = useLocalStorageState(CART);
  // If we don't have a cart in local storage, create a new one
  const prevCartRef = React.useRef(cart);
  React.useEffect(() => {
    const getNewCart = async (): Promise<void> => {
      const prevCart = prevCartRef.current;
      // Not sure if this comparison will work or not
      if (isEqual(prevCart, cart)) {
        const client = initialiseTsGql();
        const newCart = await createCheckout(client);
        setCart(newCart);
        prevCartRef.current = cart;
      }
    };
    // If cart as been purchased, create a new cart
    if (!cart || cart?.completedAt) {
      getNewCart();
    }
  }, [cart, setCart]);
  return (
    <StoreContext.Provider
      value={{
        cart,
        setCart,
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
