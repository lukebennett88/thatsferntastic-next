import { MenuIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { classNames } from '@thatsferntastic/utils';
import NextLink from 'next/link';
import * as React from 'react';

import { siteSettings } from '../../utils/constants';
import { useCartCount } from '../../utils/hooks/use-cart-count';
import { FlyoutMenus } from '../flyout-menus';
import { Logo } from '../logo';
import { SearchButton } from '../search-button';

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
            <div className="flex flex-shrink-0 mx-4 lg:ml-0">
              <NextLink href="/">
                <a className="rounded-full focus:ring">
                  <span className="sr-only">{siteSettings.title}</span>
                  <div className="flex">
                    <Logo width={32} height={32} />
                  </div>
                </a>
              </NextLink>
            </div>

            {/* Flyout menus */}
            <FlyoutMenus />

            <div className="flex items-center ml-auto">
              {/* Search */}
              <SearchButton />

              {/* Cart */}
              <div className="flow-root ml-4 text-sm lg:relative lg:ml-8">
                <NextLink href="/cart">
                  <a className="flex items-center p-2 -m-2 group">
                    <ShoppingBagIcon
                      className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <div
                      className={classNames(
                        cartCount ? 'opacity-100' : 'opacity-0',
                        'relative w-2 ml-2 text-sm font-medium text-gray-700 transition duration-300 ease-in-out group-hover:text-gray-800'
                      )}
                    >
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
