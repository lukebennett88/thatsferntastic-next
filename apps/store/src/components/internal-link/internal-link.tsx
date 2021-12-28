import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import { forwardRef } from "react";

export type InternalLinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  "href"
> &
  Omit<NextLinkProps, "as" | "passHref" | "children">;

export const InternalLink = forwardRef<HTMLAnchorElement, InternalLinkProps>(function InternalLink(
  { href, locale, prefetch, replace, scroll, shallow, ...rest },
  ref,
) {
  return (
    <NextLink
      href={href}
      locale={locale}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
    >
      <a ref={ref} {...rest} />
    </NextLink>
  );
});

InternalLink.displayName = "InternalLink";
