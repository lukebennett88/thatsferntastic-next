import { Popover, Transition } from '@headlessui/react';
import {
  MenuIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ShoppingBagIcon,
} from '@heroicons/react/outline';
import * as React from 'react';

import { classNames } from '../../utils';

interface Navigation {
  categories: Array<{
    name: string;
    featured: Array<{
      name: string;
      href: string;
      imageSrc: string;
      imageAlt: string;
    }>;
  }>;
  pages: Array<{
    name: string;
    href: string;
  }>;
}

interface HeroProps {
  currencies: Array<string>;
  navigation: Navigation;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Hero({
  currencies,
  navigation,
  setMobileMenuOpen,
}: HeroProps): JSX.Element {
  return (
    <div className="relative bg-gray-900">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
          alt=""
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-50"
      />

      {/* Navigation */}
      <header className="relative z-10">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="flex items-center justify-between h-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              {/* Currency selector */}
              <form>
                <div>
                  <label htmlFor="desktop-currency" className="sr-only">
                    Currency
                  </label>
                  <div className="relative -ml-2 bg-gray-900 border-transparent rounded-md group focus-within:ring-2 focus-within:ring-white">
                    <select
                      id="desktop-currency"
                      name="currency"
                      className="bg-none bg-gray-900 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent"
                    >
                      {currencies.map(currency => (
                        <option key={currency}>{currency}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                        className="w-5 h-5 text-gray-300"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M6 8l4 4 4-4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>

              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Sign in
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Create an account
                </a>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white backdrop-blur-md backdrop-filter bg-opacity-10">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div>
                <div className="flex items-center justify-between h-16">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex-1 lg:flex lg:items-center">
                    <a href="#">
                      <span className="sr-only">Workflow</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-auto h-8"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="inset-x-0 bottom-0 px-4">
                      <div className="flex justify-center h-full space-x-8">
                        {navigation.categories.map(category => (
                          <Popover key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button className="relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                                    {category.name}
                                    <span
                                      className={classNames(
                                        open ? 'bg-white' : '',
                                        'absolute -bottom-px inset-x-0 h-0.5 transition ease-out duration-200'
                                      )}
                                      aria-hidden="true"
                                    />
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={React.Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute inset-x-0 text-sm text-gray-500 top-full">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div
                                      className="absolute inset-0 bg-white shadow top-1/2"
                                      aria-hidden="true"
                                    />

                                    <div className="relative bg-white">
                                      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                        <div className="grid grid-cols-4 py-16 gap-y-10 gap-x-8">
                                          {category.featured.map(item => (
                                            <div
                                              key={item.name}
                                              className="relative group"
                                            >
                                              <div className="overflow-hidden bg-gray-100 rounded-md aspect-w-1 aspect-h-1 group-hover:opacity-75">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                  src={item.imageSrc}
                                                  alt={item.imageAlt}
                                                  className="object-cover object-center"
                                                />
                                              </div>
                                              <a
                                                href={item.href}
                                                className="block mt-4 font-medium text-gray-900"
                                              >
                                                <span
                                                  className="absolute inset-0 z-10"
                                                  aria-hidden="true"
                                                />
                                                {item.name}
                                              </a>
                                              <p
                                                aria-hidden="true"
                                                className="mt-1"
                                              >
                                                Shop now
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {navigation.pages.map(page => (
                          <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-white"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex items-center flex-1 lg:hidden">
                    <button
                      type="button"
                      className="p-2 -ml-2 text-white"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a href="#" className="p-2 ml-2 text-white">
                      <span className="sr-only">Search</span>
                      <SearchIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Workflow</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                      alt=""
                      className="w-auto h-8"
                    />
                  </a>

                  <div className="flex items-center justify-end flex-1">
                    <a
                      href="#"
                      className="hidden text-sm font-medium text-white lg:block"
                    >
                      Search
                    </a>

                    <div className="flex items-center lg:ml-8">
                      {/* Help */}
                      <a href="#" className="p-2 text-white lg:hidden">
                        <span className="sr-only">Help</span>
                        <QuestionMarkCircleIcon
                          className="w-6 h-6"
                          aria-hidden="true"
                        />
                      </a>
                      <a
                        href="#"
                        className="hidden text-sm font-medium text-white lg:block"
                      >
                        Help
                      </a>

                      {/* Cart */}
                      <div className="flow-root ml-4 lg:ml-8">
                        <a
                          href="#"
                          className="flex items-center p-2 -m-2 group"
                        >
                          <ShoppingBagIcon
                            className="flex-shrink-0 w-6 h-6 text-white"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-white">
                            0
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="relative flex flex-col items-center max-w-3xl px-6 py-32 mx-auto text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
          New arrivals are here
        </h1>
        <p className="mt-4 text-xl text-white">
          The new arrivals have, well, newly arrived. Check out the latest
          options from our summer small-batch release while they&lsquo;re still
          in stock.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 mt-8 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-100"
        >
          Shop New Arrivals
        </a>
      </div>
    </div>
  );
}
