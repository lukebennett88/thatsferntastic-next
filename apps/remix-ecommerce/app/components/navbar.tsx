import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import type { To } from "react-router-dom";
import { Form, Link, PrefetchPageLinks } from "remix";

import { CartIcon, CloseIcon, MenuIcon, WishlistIcon } from "./icons";
import { OptimizedImage } from "./optimized-image";

export type NavbarCategory = {
  name: string;
  to: To;
};

export function Navbar({
  onOpenCart,
  onOpenWishlist,
  logoHref,
  storeName,
  categories,
  cartCount,
  wishlistCount,
}: {
  cartCount?: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  logoHref: string;
  storeName?: string;
  categories: NavbarCategory[];
}) {
  let [prefetchQuery, setPrefetchSeachQuery] = useState("");

  return (
    <nav className="border-b border-zinc-700 p-4 lg:px-6">
      <div className="flex">
        <div className="flex flex-1 items-center">
          <Link prefetch="intent" to="/">
            <span className="sr-only">Home</span>
            <img className="h-10 w-10" src={logoHref} alt="" width={40} height={40} />
          </Link>
          {storeName ? <h1 className="sr-only">{storeName}</h1> : null}
          <ul className="mx-4 hidden items-center overflow-x-auto lg:flex">
            {categories.map((category, i) => (
              <li key={category.name + "|" + i} className="mx-2">
                <Link className="whitespace-nowrap hover:text-gray-300" prefetch="intent" to={category.to}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <Form data-testid="search-form" action={"/search"} className="mx-auto hidden max-w-lg flex-1 lg:block">
            <input
              data-testid="search-input"
              name="q"
              className="w-full border border-zinc-700 p-2"
              placeholder="Search for products..."
              onChange={(e) => setPrefetchSeachQuery(e.target.value)}
            />
          </Form>
          {prefetchQuery && <PrefetchPageLinks page={`/search?q=${prefetchQuery}`} />}
        </div>
        <div className="flex items-center">
          <Link
            data-testid="cart-link"
            prefetch="intent"
            to="/cart"
            className="group relative ml-4 inline-block hover:text-gray-300"
            onClick={(event) => {
              event.preventDefault();
              onOpenCart();
            }}
          >
            <span className="sr-only">Cart</span>
            <CartIcon className="h-8 w-8" />
            {!!cartCount && (
              <span
                data-testid="cart-count"
                style={{ lineHeight: "0.75rem" }}
                className="translate absolute bottom-0 left-0 inline-flex translate-y-[25%] translate-x-[-25%] items-center justify-center rounded-full bg-gray-50 px-[0.25rem] py-[0.125rem] text-xs text-zinc-900 group-hover:bg-gray-300"
              >
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            data-testid="wishlist-link"
            prefetch="intent"
            to="/wishlist"
            className="group relative ml-4 hover:text-gray-300"
            onClick={(event) => {
              event.preventDefault();
              onOpenWishlist();
            }}
          >
            <span className="sr-only">Wishlist</span>
            <WishlistIcon className="h-8 w-8" />
            {!!wishlistCount && (
              <span
                data-testid="wishlist-count"
                style={{ lineHeight: "0.75rem" }}
                className="translate absolute bottom-0 left-0 inline-flex translate-y-[25%] translate-x-[-25%] items-center justify-center rounded-full bg-gray-50 px-[0.25rem] py-[0.125rem] text-xs text-zinc-900 group-hover:bg-gray-300"
              >
                {wishlistCount}
              </span>
            )}
          </Link>
          <Popover className="relative ml-4 flex items-center lg:hidden">
            {({ close }) => (
              <>
                <Popover.Button className="hover:text-gray-300">
                  <span className="sr-only">Open Menu</span>
                  <MenuIcon className="h-8 w-8" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="fixed top-0 bottom-0 left-0 right-0 z-10 p-4" focus>
                    <div className="flex">
                      <div className="flex flex-1 items-center">
                        <img className="h-10 w-10" src={logoHref} alt="" width={40} height={40} />
                      </div>
                      <div className="flex flex-row-reverse">
                        <Popover.Button className="hover:text-gray-300">
                          <span className="sr-only">Close Menu</span>
                          <CloseIcon className="h-8 w-8" />
                        </Popover.Button>
                      </div>
                    </div>
                    <ul className="mt-4">
                      {categories.map((category, i) => (
                        <li key={category.name + "|" + i} className="mb-1">
                          <Link
                            onClick={() => close()}
                            className="text-xl text-blue-400 hover:text-blue-500"
                            prefetch="intent"
                            to={category.to}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
      <Form data-testid="mobile-search-form" action="/search" className="mt-3 lg:hidden">
        <input
          data-testid="mobile-search-input"
          name="q"
          className="w-full border border-zinc-700 p-2"
          placeholder="Search for products..."
        />
      </Form>
    </nav>
  );
}
