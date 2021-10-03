import type { Product } from '../graphql/get-product-by-handle';

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

export const formatCurrency = (dollars: number): string => {
  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });
  return formatter.format(dollars);
};

export const formatPrice = (value: number, currency?: string): string => {
  return Intl.NumberFormat('en-AU', {
    currency: currency || 'AUD',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(value);
};

type CurrencySymbol =
  | {
      symbol: string | undefined;
      symbolAtEnd: boolean;
    }
  | undefined;

export const getCurrencySymbol = (
  currency: string,
  locale: string | string[] | undefined = undefined
): CurrencySymbol => {
  if (!currency) {
    return;
  }

  const formatter = Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
  });
  const parts = formatter.formatToParts(100);
  const part = parts.find(part => part.type === 'currency');
  const symbol = part?.value;
  const formatted = formatter.format(100);
  const symbolAtEnd = formatted.endsWith(symbol as string);
  return { symbol: part?.value, symbolAtEnd };
};

export function slugify(text: string): string {
  return (
    text
      ?.trim()
      ?.toLowerCase()
      ?.replace(/[^\w ]+/g, '')
      ?.replace(/ +/g, '-') ?? ''
  );
}

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
