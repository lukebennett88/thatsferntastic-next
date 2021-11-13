export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

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
  const part = parts.find((part) => part.type === 'currency');
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
