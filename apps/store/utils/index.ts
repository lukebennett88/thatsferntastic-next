export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

export function slugify(text: string): string {
  return (
    text
      ?.trim()
      ?.toLowerCase()
      ?.replace(/[^\w ]+/g, '')
      ?.replace(/ +/g, '-') ?? ''
  );
}
