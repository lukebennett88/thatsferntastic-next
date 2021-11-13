import { Popover, Transition } from '@headlessui/react';
import { classNames } from '@thatsferntastic/utils';
import * as React from 'react';

import navigation from '../../components/navigation/navigation.json';

export function FlyoutMenus(): JSX.Element {
  return (
    <Popover.Group className="z-30 hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {navigation.categories.map((category) => (
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
                            {category.featured.map((item) => (
                              <div
                                key={item.name}
                                className="relative text-base group sm:text-sm"
                              >
                                <div className="overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1 group-hover:opacity-75">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
                            {category.sections.map((section) => (
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
                                  {section.items.map((item) => (
                                    <li key={item.name} className="flex">
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
  );
}
