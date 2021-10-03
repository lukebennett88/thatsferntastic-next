/* eslint-disable @next/next/no-img-element */
import { Popover, Transition } from '@headlessui/react';
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import * as React from 'react';

import { classNames } from '../../utils';
import { buttonClasses } from '../../utils/hooks/button-styles';
import { useCartCount } from '../../utils/hooks/use-cart-count/use-cart-count';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];

interface Navigation {
  categories: {
    id: string;
    name: string;
    featured: Array<{
      name: string;
      href: string;
      imageSrc: string;
      imageAlt: string;
    }>;
    sections: {
      id: string;
      name: string;
      items: Array<{
        name: string;
        href: string;
      }>;
    }[];
  }[];
  pages: Array<{
    name: string;
    href: string;
  }>;
}

interface DesktopMenuProps {
  navigation: Navigation;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DesktopMenu({
  navigation,
  setOpen,
}: DesktopMenuProps): JSX.Element {
  const cartCount = useCartCount();
  return (
    <header className="relative bg-white">
      <nav aria-label="Top" className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex items-center h-16">
            <button
              type="button"
              className="p-2 text-gray-400 bg-white rounded-md lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon aria-hidden="true" className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="flex ml-4 lg:ml-0">
              <Link href="/">
                <a>
                  <span className="sr-only">Workflow</span>
                  <img
                    className="w-auto h-8"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=pink&shade=600"
                    alt=""
                  />
                </a>
              </Link>
            </div>

            {/* Flyout menus */}
            <Popover.Group className="z-30 hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.categories.map(category => (
                  <Popover key={category.name} className="flex">
                    {({ open }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button
                            className={classNames(
                              open
                                ? 'border-pink-600 text-pink-600'
                                : 'border-transparent text-gray-700 hover:text-gray-800',
                              'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                            )}
                          >
                            {category.name}
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
                              aria-hidden="true"
                              className="absolute inset-0 bg-white shadow top-1/2"
                            />

                            <div className="relative bg-white">
                              <div className="px-8 mx-auto max-w-7xl">
                                <div className="grid grid-cols-2 py-16 gap-y-10 gap-x-8">
                                  <div className="grid grid-cols-2 col-start-2 gap-x-8">
                                    {category.featured.map(item => (
                                      <div
                                        key={item.name}
                                        className="relative text-base group sm:text-sm"
                                      >
                                        <div className="overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1 group-hover:opacity-75">
                                          <img
                                            src={item.imageSrc}
                                            alt={item.imageAlt}
                                            className="object-cover object-center"
                                          />
                                        </div>
                                        <a
                                          href={item.href}
                                          className="block mt-6 font-medium text-gray-900"
                                        >
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0 z-10"
                                          />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="grid grid-cols-3 row-start-1 text-sm gap-y-10 gap-x-8">
                                    {category.sections.map(section => (
                                      <div key={section.name}>
                                        <p
                                          id={`${section.name}-heading`}
                                          className="font-medium text-gray-900"
                                        >
                                          {section.name}
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map(item => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <a
                                                href={item.href}
                                                className="hover:text-gray-800"
                                              >
                                                {item.name}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
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
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </a>
                ))}
              </div>
            </Popover.Group>

            <div className="flex items-center ml-auto">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Sign in
                </a>
                <span className="w-px h-6 bg-gray-200" aria-hidden="true" />
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Create account
                </a>
              </div>

              <div className="hidden lg:ml-8 lg:flex">
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-gray-800"
                >
                  <img
                    src="https://tailwindui.com/img/flags/flag-australia.svg"
                    alt=""
                    className="flex-shrink-0 block w-5 h-auto"
                  />
                  <span className="block ml-3 text-sm font-medium">AUD</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>

              {/* Search */}
              <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <SearchIcon aria-hidden="true" className="w-6 h-6" />
                </a>
              </div>

              {/* Cart */}
              <Popover className="flow-root ml-4 text-sm lg:relative lg:ml-8">
                <Popover.Button className="flex items-center p-2 -m-2 group">
                  <ShoppingBagIcon
                    className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cartCount}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Popover.Button>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5 z-30">
                    {({ close }) => (
                      <>
                        <h2 className="sr-only">Shopping Cart</h2>

                        <div className="max-w-2xl px-4 mx-auto">
                          <ul role="list" className="divide-y divide-gray-200">
                            {products.map(product => (
                              <li
                                key={product.id}
                                className="flex items-center py-6"
                              >
                                <img
                                  src={product.imageSrc}
                                  alt={product.imageAlt}
                                  className="flex-none w-16 h-16 border border-gray-200 rounded-md"
                                />
                                <div className="flex-auto ml-4">
                                  <h3 className="font-medium text-gray-900">
                                    <a href={product.href}>{product.name}</a>
                                  </h3>
                                  <p className="text-gray-500">
                                    {product.color}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <Link href="/cart">
                            <a
                              onClick={() => close()}
                              className={buttonClasses({ width: 'full' })}
                            >
                              View cart
                            </a>
                          </Link>
                        </div>
                      </>
                    )}
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
