import NextLink from 'next/link';
import * as React from 'react';

import { NextPageWithLayoutProps } from '../types';
import { siteSettings } from '../utils/constants';

const nav = [
  {
    name: 'Contact Support',
    href: '/',
  },
  {
    name: 'Status',
    href: '/',
  },
  {
    name: 'Twitter',
    href: '/',
  },
];

const NotFoundPage: NextPageWithLayoutProps = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white lg:relative">
      <div className="flex flex-col flex-grow">
        <main className="flex flex-col flex-grow bg-white">
          <div className="flex flex-col flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex-shrink-0 pt-10 sm:pt-16">
              <NextLink href="/">
                <a className="inline-flex">
                  <span className="sr-only">{siteSettings.title}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-auto h-12"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=pink&shade=600"
                    alt=""
                  />
                </a>
              </NextLink>
            </div>
            <div className="flex-shrink-0 py-16 my-auto sm:py-32">
              <p className="text-sm font-semibold tracking-wide text-pink-600 uppercase">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <NextLink href="/">
                  <a className="text-base font-medium text-pink-600 hover:text-pink-500">
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </a>
                </NextLink>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 bg-gray-50">
          <div className="w-full px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <nav className="flex space-x-4">
              {nav.map(({ name, href }, index) => (
                <React.Fragment key={index}>
                  <a
                    href={href}
                    className="text-sm font-medium text-gray-500 hover:text-gray-600"
                  >
                    {name}
                  </a>
                  {index !== nav.length - 1 ? (
                    <span
                      className="inline-block border-l border-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </footer>
      </div>
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

NotFoundPage.layoutProps = {
  Layout: React.Fragment,
};

export default NotFoundPage;
