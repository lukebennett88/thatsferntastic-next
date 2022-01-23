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
    <nav className="p-4 border-b lg:px-6 border-zinc-700">
      <div className="flex">
        <div className="flex items-center flex-1">
          <Link prefetch="intent" to="/">
            <span className="sr-only">Home</span>
            <img className="w-10 h-10" src={logoHref} alt="" width={40} height={40} />
          </Link>
          {storeName ? <h1 className="sr-only">{storeName}</h1> : null}
          <ul className="items-center hidden mx-4 overflow-x-auto lg:flex">
            {categories.map((category, i) => (
              <li key={category.name + "|" + i} className="mx-2">
                <Link className="whitespace-nowrap hover:text-gray-300" prefetch="intent" to={category.to}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <Form data-testid="search-form" action={"/search"} className="flex-1 hidden max-w-lg mx-auto lg:block">
            <input
              data-testid="search-input"
              name="q"
              className="w-full p-2 border border-zinc-700"
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
            className="relative inline-block ml-4 group hover:text-gray-300"
            onClick={(event) => {
              event.preventDefault();
              onOpenCart();
            }}
          >
            <span className="sr-only">Cart</span>
            <CartIcon className="w-8 h-8" />
            {!!cartCount && (
              <span
                data-testid="cart-count"
                style={{ lineHeight: "0.75rem" }}
                className="absolute bottom-0 left-0 translate translate-y-[25%] translate-x-[-25%] inline-flex items-center justify-center px-[0.25rem] py-[0.125rem] text-xs text-zinc-900 bg-gray-50 group-hover:bg-gray-300 rounded-full"
              >
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            data-testid="wishlist-link"
            prefetch="intent"
            to="/wishlist"
            className="relative ml-4 group hover:text-gray-300"
            onClick={(event) => {
              event.preventDefault();
              onOpenWishlist();
            }}
          >
            <span className="sr-only">Wishlist</span>
            <WishlistIcon className="w-8 h-8" />
            {!!wishlistCount && (
              <span
                data-testid="wishlist-count"
                style={{ lineHeight: "0.75rem" }}
                className="absolute bottom-0 left-0 translate translate-y-[25%] translate-x-[-25%] inline-flex items-center justify-center px-[0.25rem] py-[0.125rem] text-xs text-zinc-900 bg-gray-50 group-hover:bg-gray-300 rounded-full"
              >
                {wishlistCount}
              </span>
            )}
          </Link>
          <Popover className="relative flex items-center ml-4 lg:hidden">
            {({ close }) => (
              <>
                <Popover.Button className="hover:text-gray-300">
                  <span className="sr-only">Open Menu</span>
                  <MenuIcon className="w-8 h-8" />
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
                      <div className="flex items-center flex-1">
                        <img className="w-10 h-10" src={logoHref} alt="" width={40} height={40} />
                      </div>
                      <div className="flex flex-row-reverse">
                        <Popover.Button className="hover:text-gray-300">
                          <span className="sr-only">Close Menu</span>
                          <CloseIcon className="w-8 h-8" />
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
          className="w-full p-2 border border-zinc-700"
          placeholder="Search for products..."
        />
      </Form>
    </nav>
  );
}
