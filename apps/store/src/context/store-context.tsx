import { Maybe } from "graphql/jsutils/Maybe";
import * as React from "react";

import type { Line, UpdatedCart } from "../graphql/add-items-to-cart";
import { addItemsToCart } from "../graphql/add-items-to-cart";
import { createCart } from "../graphql/create-cart";
import { removeItemsFromCart } from "../graphql/remove-items-from-cart";
import { updateItemsInCart } from "../graphql/update-items-in-cart";
import { initialiseTsGql } from "../utils/apollo-client";
import { useLocalStorageState } from "../utils/hooks/use-local-storage-state";

const SHOPIFY_CART_KEY = "thatsferntastic:cart";

export type AddVariantToCart = (lines: Line | Array<Line>) => Promise<void>;
export type RemoveLineItem = (lineIds: Array<string>) => Promise<void>;
export type UpdateLineItem = (
  lines: Array<{
    id: string;
    quantity: number;
  }>,
) => Promise<void>;

type EstimatedCost = NonNullable<UpdatedCart>["estimatedCost"];
type Lines = NonNullable<UpdatedCart>["lines"];

type Cart = Maybe<{
  id: string;
  checkoutUrl: string;
  estimatedCost?: EstimatedCost;
  lines?: Lines;
  __typename: "Cart";
}>;

interface StoreState {
  addVariantToCart: AddVariantToCart;
  cart: Cart | undefined;
  didJustAddToCart: boolean;
  isLoading: boolean;
  removeLineItem: RemoveLineItem;
  updateLineItem: UpdateLineItem;
  closeCart: () => void;
}

const StoreContext = React.createContext<StoreState | undefined>(undefined);

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps): JSX.Element {
  const [cart, setCart] = useLocalStorageState<Cart>(SHOPIFY_CART_KEY);
  const [isLoading, setIsLoading] = React.useState(false);
  const [didJustAddToCart, setDidJustAddToCart] = React.useState(false);

  const closeCart = () => setDidJustAddToCart(false);

  const client = initialiseTsGql();

  // Create a new cart if we don't already have one saved in localStorage
  React.useEffect(() => {
    if (cart) return;
    (async () => {
      const newCart = await createCart(client);
      newCart && setCart(newCart);
    })();
  }, [cart, client, setCart]);

  const addVariantToCart = async (lines: Line | Array<Line>) => {
    const cartId = cart?.id;
    if (cartId) {
      try {
        setIsLoading(true);
        const newCart = await addItemsToCart({ client, cartId, lines });
        console.log({
          calledBy: "addVariantToCart",
          newCart,
        });
        setCart(newCart);
        setDidJustAddToCart(true);
      } catch (error) {
        console.error("Error in addVariantToCart:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const removeLineItem = async (lineIds: Array<string>) => {
    setIsLoading(true);
    if (cart?.id) {
      try {
        const newCart = await removeItemsFromCart({
          client,
          cartId: cart.id,
          lineIds,
        });
        console.log({
          calledBy: "removeLineItem",
          newCart,
        });
        setCart(newCart);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in in removeLineItem:", error);
      }
    }
  };

  const updateLineItem = async (
    lines: Array<{
      id: string;
      quantity: number;
    }>,
  ) => {
    if (cart?.id) {
      setIsLoading(true);
      try {
        const newCart = await updateItemsInCart({
          client,
          cartId: cart.id,
          lines,
        });
        setCart(newCart);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in updateLineItem:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <StoreContext.Provider
      value={{
        addVariantToCart,
        cart,
        didJustAddToCart,
        isLoading,
        removeLineItem,
        closeCart,
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
      "useStoreContext must be used inside of StoreContext.Provider, " + "otherwise it will not function correctly.",
    );
  }

  // Because of TypeScript's type narrowing, if we make it past
  // the error the compiler knows that context is always defined
  // at this point, so we don't need to do any conditional
  // checking on its values when we use this hook!
  return context;
}
