import * as React from 'react';

// TODO: add type for cart
type Cart = any;

interface CartState {
  cart?: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
}

const StoreContext = React.createContext<CartState | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = React.useState<Cart>(undefined);
  return (
    <StoreContext.Provider value={{ cart, setCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext(): CartState {
  const context = React.useContext(StoreContext);
  // If context is undefined, we know we used Progress
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
