import { SearchIcon, ShoppingBagIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useRef, useState } from "react";
import { Form, Link, PrefetchPageLinks } from "remix";

import logoHref from "~/images/thatsferntastic-logo-white.svg";

import { Container } from "./container";

const bannerText = ["Free Australian shipping for order over $60", "Free Worldwide Shipping for orders over $100 AUD"];

function AnnouncementBanner(): JSX.Element {
  return (
    <div className="bg-teal-50">
      <Container>
        <p className="py-1 text-center text-sm font-medium text-teal-900">
          {bannerText.map((line, index) => (
            <Fragment key={index}>
              <span className="block lg:inline-block">{line}</span>
              {index !== bannerText.length - 1 ? (
                <span aria-hidden="true" className="mx-4 hidden lg:inline-block">
                  |
                </span>
              ) : null}
            </Fragment>
          ))}
        </p>
      </Container>
    </div>
  );
}

function BackHomeLogo({ storeName }: { storeName?: string }) {
  return (
    <div className="inline-flex">
      <Link prefetch="intent" to="/" className="rounded-full shadow focus:outline-none focus:ring">
        <span className="sr-only">Home</span>
        <img className="h-9 w-9" src={logoHref} alt={storeName ? `${storeName} logo` : ""} width={36} height={36} />
      </Link>
    </div>
  );
}

function SearchBar() {
  let [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  return (
    <Form action="/search">
      <label className="sr-only" htmlFor="search-input" id="search-label">
        Search
      </label>
      <div className="relative rounded-full text-gray-400 shadow focus-within:text-gray-600 focus-within:ring">
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <SearchIcon aria-hidden="true" className="h-5 w-5" />
        </div>
        <input
          ref={searchInputRef}
          id="search-input"
          name="q"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          enterKeyHint="go"
          maxLength={512}
          spellCheck="false"
          className="block w-full rounded-full border-transparent bg-white px-10 py-2 leading-5 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />
        {searchQuery && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <button
              type="reset"
              onClick={(event) => {
                event.preventDefault;
                setSearchQuery("");
                searchInputRef.current?.focus();
              }}
              className="focus:outline-none focus:ring"
            >
              <XIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      {searchQuery && <PrefetchPageLinks page={`/search?q=${searchQuery}`} />}
    </Form>
  );
}

function CartLink({ cartCount, onOpenCart }: { cartCount?: number; onOpenCart: () => void }) {
  return (
    <div className="flex h-9">
      <Link
        to="/cart"
        onClick={(event) => {
          event.preventDefault();
          onOpenCart();
        }}
        className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-white shadow focus:outline-none focus:ring"
      >
        <ShoppingBagIcon
          className="-ml-1 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <div className="relative w-2 text-sm font-medium text-gray-500 transition duration-300 ease-in-out group-hover:text-gray-800">
          {cartCount ?? 0}
        </div>
        <span className="sr-only">items in cart, view bag</span>
      </Link>
    </div>
  );
}

export function Navbar({
  onOpenCart,
  storeName,
  cartCount,
}: {
  cartCount?: number;
  onOpenCart: () => void;
  storeName?: string;
}) {
  return (
    <header className=" sticky top-0 z-20 bg-white">
      <AnnouncementBanner />
      <div className="bg-teal-200">
        <Container>
          <div className="grid grid-cols-[4.75rem,1fr,4.75rem] items-center gap-4 py-3">
            <BackHomeLogo storeName={storeName} />
            <SearchBar />
            <CartLink cartCount={cartCount} onOpenCart={onOpenCart} />
          </div>
        </Container>
      </div>
    </header>
  );
}
