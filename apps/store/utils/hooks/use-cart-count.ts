import * as React from 'react';

import { useStoreContext } from '../../context/store-context';

export function useCartCount(): number {
  const [cartCount, setCartCount] = React.useState(0);
  const { cart } = useStoreContext();
  React.useEffect(() => {
    if (cart?.lines?.edges && cart.lines.edges.length > 0) {
      setCartCount(
        cart.lines.edges.reduce(
          (totalCount, lineItem) => totalCount + lineItem.node.quantity,
          0
        )
      );
    }
  }, [cart?.lines?.edges, cartCount]);
  return cartCount;
}
