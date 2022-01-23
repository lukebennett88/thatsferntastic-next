import type { ReactNode } from "react";
import { lazy, Suspense, useMemo, useState } from "react";
import type { MetaFunction, ShouldReloadFunction } from "remix";
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from "remix";

import { ClientOnly } from "~/components/client-only";
import { Footer } from "~/components/footer";
import { Navbar, NavbarCategory } from "~/components/navbar";
import logoHref from "~/images/thatsferntastic-logo.svg";
import globalStylesheetHref from "~/styles/global.css";

import { GenericCatchBoundary } from "../boundaries/generic-catch-boundary";
import { GenericErrorBoundary } from "../boundaries/generic-error-boundary";
import type { LoaderData } from "./layout.server";

let CartPopover = lazy(() =>
  import("~/components/cart-popover").then(({ CartPopover }) => ({
    default: CartPopover,
  })),
);
let WishlistPopover = lazy(() =>
  import("~/components/wishlist-popover").then(({ WishlistPopover }) => ({
    default: WishlistPopover,
  })),
);

export const meta: MetaFunction = () => {
  return {
    title: "Remix Ecommerce",
    description: "An example ecommerce site built with Remix.",
  };
};

export let links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.ico",
      sizes: "any",
    },
    {
      rel: "icon",
      href: logoHref,
      type: "image/svg+xml",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: globalStylesheetHref,
    },
  ];
};

export function Document({ children, loaderData }: { children: ReactNode; loaderData?: LoaderData }) {
  const cart = loaderData?.cart;
  const categories = loaderData?.categories;
  const pages = loaderData?.pages ?? [];
  const wishlist = loaderData?.wishlist;

  let allCategories = useMemo(() => {
    let results: NavbarCategory[] = [
      {
        name: "All",
        to: "/search",
      },
    ];

    if (categories) {
      results.push(...categories);
    }
    return results;
  }, [categories]);

  let [cartOpen, setCartOpen] = useState(false);
  let [wishlistOpen, setWishlistOpen] = useState(false);

  let cartCount = useMemo(() => cart?.items?.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  let wishlistCount = useMemo(() => wishlist?.reduce((sum, item) => sum + item.quantity, 0), [wishlist]);

  return (
    <html lang="en-AU" className="text-gray-800">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          logoHref={logoHref}
          storeName="Store Name"
          categories={allCategories}
          onOpenCart={() => setCartOpen(true)}
          onOpenWishlist={() => setWishlistOpen(true)}
        />
        <div className="flex-1">{children}</div>
        <Footer logoHref={logoHref} pages={pages} storeName="Store Name" />

        <ClientOnly>
          <Suspense fallback="">
            <WishlistPopover
              wishlistCount={wishlistCount}
              wishlist={wishlist}
              open={wishlistOpen}
              onClose={() => setWishlistOpen(false)}
            />
          </Suspense>
        </ClientOnly>

        <ClientOnly>
          <Suspense fallback="">
            <CartPopover cartCount={cartCount} cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} />
          </Suspense>
        </ClientOnly>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return (
    <Document>
      <GenericCatchBoundary />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <GenericErrorBoundary error={error} />
    </Document>
  );
}

export let unstable_shouldReload: ShouldReloadFunction = ({ url }) => {
  return !url.pathname.startsWith("/search");
};

export default function Root() {
  let loaderData = useLoaderData<LoaderData>();

  return (
    <Document loaderData={loaderData}>
      <Outlet />
    </Document>
  );
}