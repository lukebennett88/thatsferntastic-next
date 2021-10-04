import type { Product } from '../graphql/get-product-by-handle';

// Taken from here: https://github.com/Shopify/js-buy-sdk/blob/28c85805ee21bdebf9611da6b92c39858b15dc0a/src/product-helpers.js#L21
export const variantForOptions = (
  product: NonNullable<Product>,
  options: NonNullable<Product>['variants']['edges'][number]
): NonNullable<Product>['variants']['edges'][number] | undefined => {
  return product.variants.edges.find(variant => {
    return variant.node.selectedOptions.every(selectedOption => {
      // @ts-expect-error I think types might be too strict here
      return options[selectedOption.name] === selectedOption.value.valueOf();
    });
  });
};
