/* eslint-disable @next/next/no-img-element */
import { Popover, Transition } from '@headlessui/react';
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
} from '@heroicons/react/outline';
import { classNames } from '@thatsferntastic/utils';
import Link from 'next/link';
import * as React from 'react';

import navigation from '../../components/navigation/navigation.json';
import { useCartCount } from '../../utils/hooks/use-cart-count/use-cart-count';

interface DesktopMenuProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DesktopMenu({ setOpen }: DesktopMenuProps): JSX.Element {
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
              </div>
            </Popover.Group>

            <div className="flex items-center ml-auto">
              {/* Search */}
              <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <SearchIcon aria-hidden="true" className="w-6 h-6" />
                </a>
              </div>

              {/* Cart */}
              <div className="flow-root ml-4 text-sm lg:relative lg:ml-8">
                <Link href="/cart">
                  <a className="flex items-center p-2 -m-2 group">
                    <ShoppingBagIcon
                      className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <div className="relative w-2 ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartCount}
                    </div>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
