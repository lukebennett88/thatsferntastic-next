export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
});

export const formatCurrency = (dollars: number): string => {
  return formatter.format(dollars);
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
