import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  CalculatorIcon,
  ChartBarIcon,
  ClipboardListIcon,
  CogIcon,
  CreditCardIcon,
  HomeIcon,
  LogoutIcon,
  MenuAlt2Icon,
  PhoneIcon,
  TagIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { ChevronLeftIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { classNames } from '../../utils';
import { VENDOR_LOGO_URL, VENDOR_NAME } from '../../utils/constants';

interface NavLink {
  type: 'navLink';
  name: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

interface NavMenu {
  type: 'navMenu';
  name: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  submenu: Array<NavSubmenu>;
}

interface NavSubmenu {
  type: 'navSubmenu';
  name: string;
  href: string;
}

type NavItem = NavLink | NavMenu | NavSubmenu;

const navigation: Array<NavItem> = [
  {
    type: 'navLink',
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    type: 'navMenu',
    name: 'Customers',
    icon: UsersIcon,
    submenu: [
      { type: 'navSubmenu', name: 'Update Customers', href: '/customers' },
      { type: 'navSubmenu', name: 'Add New Customer', href: '/customers/new' },
    ],
  },
  {
    type: 'navLink',
    name: 'New Bid Sheet',
    href: '/bids',
    icon: ClipboardListIcon,
  },
  { type: 'navLink', name: 'New Lot Sheet', href: '/lots', icon: TagIcon },
  {
    type: 'navLink',
    name: 'Create Transaction',
    href: '/create-transaction',
    icon: CreditCardIcon,
  },
  {
    type: 'navMenu',
    name: 'Contact',
    icon: PhoneIcon,
    submenu: [
      { type: 'navSubmenu', name: 'Sellers', href: '/contact/sellers' },
      { type: 'navSubmenu', name: 'Bidders', href: '/contact/bidders' },
    ],
  },
  {
    type: 'navMenu',
    name: 'Reporting',
    icon: ChartBarIcon,
    submenu: [
      {
        type: 'navSubmenu',
        name: 'Seller Results',
        href: '/reporting/seller_results',
      },
      {
        type: 'navSubmenu',
        name: 'Bidder Results',
        href: '/reporting/bidder_results',
      },
      { type: 'navSubmenu', name: 'Underbids', href: '/reporting/underbids' },
      {
        type: 'navSubmenu',
        name: 'Sold / In-store',
        href: '/reporting/sold_in_store',
      },
      {
        type: 'navSubmenu',
        name: 'Current Bids',
        href: '/reporting/current_bids',
      },
      { type: 'navSubmenu', name: 'EFT Report', href: '/reporting/eft_report' },
      {
        type: 'navSubmenu',
        name: 'Police Report',
        href: '/reporting/police_report',
      },
      {
        type: 'navSubmenu',
        name: 'Revenue Report',
        href: '/reporting/revenue_report',
      },
      {
        type: 'navSubmenu',
        name: 'Cash Report',
        href: '/reporting/cash_report',
      },
      {
        type: 'navSubmenu',
        name: 'Sales Catalogue',
        href: '/reporting/sales_catalogue',
      },
      {
        type: 'navSubmenu',
        name: 'Creditor Report',
        href: '/reporting/creditor_report',
      },
      {
        type: 'navSubmenu',
        name: 'Sold: Uncollected',
        href: '/reporting/sold_uncollected',
      },
    ],
  },
  {
    type: 'navLink',
    name: 'Process Tally',
    href: '/process-tally',
    icon: CalculatorIcon,
  },
  {
    type: 'navLink',
    name: 'Settings',
    href: '/settings',
    icon: CogIcon,
  },
  {
    type: 'navLink',
    name: 'Log Out',
    href: '/api/auth/sign-out',
    icon: LogoutIcon,
  },
];

interface UserNavItem {
  href: string;
  name: string;
}

const userNavigation: Array<UserNavItem> = [
  { name: 'Profile', href: '#' },
  /** Settings */
  navigation[navigation.length - 2] as UserNavItem,
  /** Log out */
  navigation[navigation.length - 1] as UserNavItem,
];

interface LayoutProps {
  children: React.ReactNode;
}
interface NavItemProps {
  item: NavItem;
  asPath?: string;
}

function NavItem({ asPath, item }: NavItemProps): JSX.Element {
  if (item.type === 'navMenu') {
    return (
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center w-full px-2 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group md:text-sm">
              {item.icon ? (
                <item.icon
                  className="flex-shrink-0 w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-300"
                  aria-hidden="true"
                />
              ) : null}
              <span>{item.name}</span>
              <ChevronLeftIcon
                className={classNames(
                  open && 'transform -rotate-90',
                  'w-5 h-5 ml-auto text-gray-300'
                )}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pb-2 text-sm text-gray-500">
              {item.submenu?.map(submenu => {
                return (
                  <NavItem key={submenu.name} item={submenu} asPath={asPath} />
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
  const isCurrent = asPath === item.href;
  return (
    <Link href={item.href}>
      <a
        className={classNames(
          isCurrent
            ? 'bg-gray-900 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
          'group flex items-center px-2 py-2 text-base font-medium rounded-md md:text-sm'
        )}
      >
        {item.type === 'navLink' ? (
          <item.icon
            aria-hidden="true"
            className={classNames(
              isCurrent
                ? 'text-gray-300'
                : 'text-gray-400 group-hover:text-gray-300',
              'mr-4 flex-shrink-0 h-6 w-6'
            )}
          />
        ) : (
          <div aria-hidden="true" className="w-6 h-6 mr-4"></div>
        )}
        {item.name}
      </a>
    </Link>
  );
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { asPath } = useRouter();
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
              <Transition.Child
                as={React.Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex items-center flex-shrink-0 px-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-auto h-8"
                  src={VENDOR_LOGO_URL}
                  alt={VENDOR_NAME}
                />
              </div>
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map(item => (
                    <NavItem key={item.name} item={item} asPath={asPath} />
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center flex-shrink-0 h-16 px-4 bg-gray-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-auto h-8"
                src={VENDOR_LOGO_URL}
                alt={VENDOR_NAME}
              />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1 bg-gray-800">
                {navigation.map(item => (
                  <NavItem key={item.name} item={item} asPath={asPath} />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1">
              <form className="flex w-full md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center ml-4 md:ml-6">
              <button
                type="button"
                className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full">
                      <span className="text-sm font-medium leading-none text-white">
                        TW
                      </span>
                    </span>
                  </Menu.Button>
                </div>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map(item => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {VENDOR_NAME} Portal
              </h1>
            </div>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
