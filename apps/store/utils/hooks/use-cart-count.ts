import { useStoreContext } from '../../context/store-context';

export function useCartCount(): number {
  const { checkout } = useStoreContext();
  if (checkout == null || checkout.lineItems.length === 0) {
    return 0;
  }
  return checkout.lineItems.reduce(
    (totalCount, lineItem) => totalCount + lineItem.quantity,
    0
  );
}
