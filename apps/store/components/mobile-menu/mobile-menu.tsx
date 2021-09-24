import { Dialog, Tab, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
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

interface MobileMenuProps {
  currencies: Array<string>;
  mobileMenuOpen: boolean;
  navigation: Navigation;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileMenu({
  currencies,
  mobileMenuOpen,
  navigation,
  setMobileMenuOpen,
}: MobileMenuProps): JSX.Element {
  return (
    <Transition.Root show={mobileMenuOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex lg:hidden"
        onClose={setMobileMenuOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={React.Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <Tab.Group as="div" className="mt-2">
              <div className="border-b border-gray-200">
                <Tab.List className="flex px-4 -mb-px space-x-8">
                  {navigation.categories.map(category => (
                    <Tab
                      key={category.name}
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'text-indigo-600 border-indigo-600'
                            : 'text-gray-900 border-transparent',
                          'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                        )
                      }
                    >
                      {category.name}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels as={React.Fragment}>
                {navigation.categories.map(category => (
                  <Tab.Panel
                    key={category.name}
                    className="px-4 py-6 space-y-12"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                      {category.featured.map(item => (
                        <div key={item.name} className="relative group">
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
                            className="block mt-6 text-sm font-medium text-gray-900"
                          >
                            <span
                              className="absolute inset-0 z-10"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                          <p
                            aria-hidden="true"
                            className="mt-1 text-sm text-gray-500"
                          >
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            <div className="px-4 py-6 space-y-6 border-t border-gray-200">
              {navigation.pages.map(page => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="block p-2 -m-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="px-4 py-6 space-y-6 border-t border-gray-200">
              <div className="flow-root">
                <a
                  href="#"
                  className="block p-2 -m-2 font-medium text-gray-900"
                >
                  Create an account
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="block p-2 -m-2 font-medium text-gray-900"
                >
                  Sign in
                </a>
              </div>
            </div>

            <div className="px-4 py-6 space-y-6 border-t border-gray-200">
              {/* Currency selector */}
              <form>
                <div className="inline-block">
                  <label htmlFor="mobile-currency" className="sr-only">
                    Currency
                  </label>
                  <div className="relative -ml-2 border-transparent rounded-md group focus-within:ring-2 focus-within:ring-white">
                    <select
                      id="mobile-currency"
                      name="currency"
                      className="bg-none border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
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
                        className="w-5 h-5 text-gray-500"
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
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
