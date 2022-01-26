import { MenuIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import { classNames } from "@thatsferntastic/utils";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { siteSettings } from "../../utils/constants";
import { useCartCount } from "../../utils/hooks/use-cart-count";
import { Autocomplete } from "../autocomplete";
import { Logo } from "../logo";

interface DesktopMenuProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DesktopMenu({ setOpen }: DesktopMenuProps): JSX.Element {
  return (
    <header className="relative bg-teal-200">
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[4.75rem,1fr,4.75rem] items-center gap-4 py-3">
          <BackHomeLogo />
          <SearchBar />
          <CartLink />
        </div>
      </nav>
    </header>
  );
}

function BackHomeLogo() {
  const { asPath } = useRouter();
  return (
    <div className="inline-flex">
      <NextLink href="/">
        <a aria-current={asPath === "/" ? "page" : undefined} className="rounded-full shadow focus:ring">
          <span className="sr-only">{siteSettings.title}</span>
          <Logo backgroundClass="text-white" width={36} height={36} />
        </a>
      </NextLink>
    </div>
  );
}

function SearchBar() {
  return (
    <>
      <div className="flex h-9 flex-1 items-center rounded-full bg-white shadow">
        <Autocomplete />
      </div>
    </>
  );
}

function CartLink() {
  const cartCount = useCartCount();
  return (
    <div className="flex h-9">
      <NextLink href="/cart">
        <a className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-white shadow">
          <ShoppingBagIcon
            className="-ml-1 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <div className="relative w-2 text-sm font-medium text-gray-500 transition duration-300 ease-in-out group-hover:text-gray-800">
            {cartCount}
          </div>
          <span className="sr-only">items in cart, view bag</span>
        </a>
      </NextLink>
    </div>
  );
}

export function DesktopMenuOld({ setOpen }: DesktopMenuProps): JSX.Element {
  const cartCount = useCartCount();
  return (
    <header className="relative bg-teal-200">
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="mx-4 flex flex-shrink-0 lg:ml-0">
              <NextLink href="/">
                <a className="rounded-full focus:ring">
                  <span className="sr-only">{siteSettings.title}</span>
                  <div className="flex">
                    <Logo backgroundClass="text-white" width={36} height={36} />
                  </div>
                </a>
              </NextLink>
            </div>

            <div className="ml-auto flex items-center">
              {/* Search */}

              {/* Cart */}
              <div className="ml-4 flow-root text-sm lg:relative lg:ml-8">
                <NextLink href="/cart">
                  <a className="group -m-2 flex items-center gap-2 rounded-full bg-white px-4 py-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <div className="relative w-2 text-sm font-medium text-gray-500 transition duration-300 ease-in-out group-hover:text-gray-800">
                      {cartCount}
                    </div>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
