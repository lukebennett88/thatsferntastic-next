import { useStoreContext } from '../../context/store-context';

export function useCartCount(): number {
  const { cart } = useStoreContext();
  if (cart?.lines?.edges && cart.lines.edges.length > 0) {
    return cart.lines.edges.reduce(
      (totalCount, lineItem) => totalCount + lineItem.node.quantity,
      0
    );
  }
  return 0;
}
