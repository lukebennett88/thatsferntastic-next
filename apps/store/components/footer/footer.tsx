import { Button } from '@thatsferntastic/button';
import NextLink from 'next/link';
import * as React from 'react';

import {
  Collection,
  getAllCollections,
} from '../../graphql/get-all-collections';
import { getAllProducts, Product } from '../../graphql/get-all-products';
import { initialiseTsGql } from '../../utils/apollo-client';
import { siteSettings } from '../../utils/constants';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../icons';
import { Logo } from '../logo';

const footerNavigation = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
};

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/thatsferntastic/',
    icon: FacebookIcon,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/thatsferntastic/',
    icon: InstagramIcon,
  },
  {
    name: 'Twitter',
    href: 'https://www.twitter.com/thatsferntastic/',
    icon: TwitterIcon,
  },
];

export function Footer(): JSX.Element {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [collections, setCollections] = React.useState<Collection[]>([]);
  React.useEffect(() => {
    (async () => {
      // Initialise client
      const client = initialiseTsGql();

      // Get all products and save to state
      const products = await getAllProducts(client);
      setProducts(products);

      // Get all collections and save to state
      const collections = await getAllCollections(client);
      setCollections(collections);
    })();
  }, []);
  const productTypes = [
    ...new Set(
      products
        .filter(({ node }) => Boolean(node.productType))
        .map(({ node }) => node.productType)
    ),
  ];
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-50">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="py-20 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
            {/* Image section */}
            <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
              <NextLink href="/">
                <a className="inline-flex rounded-full focus:ring">
                  <span className="sr-only">{siteSettings.title}</span>
                  <div className="flex">
                    <Logo width={32} height={32} />
                  </div>
                </a>
              </NextLink>
            </div>

            {/* Sitemap sections */}
            <div className="grid grid-cols-2 col-span-6 gap-8 mt-10 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6">
              <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Collections
                  </h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {collections.map(({ node }) => (
                      <li key={node.id} className="text-sm">
                        <NextLink href={`/collections/${node.handle}`}>
                          <a className="text-gray-500 hover:text-gray-600">
                            {node.title}
                          </a>
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Product categories
                  </h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {productTypes.map((type) => (
                      <li key={type} className="text-sm">
                        <a
                          href={`/product-types?type=${type}`}
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {type}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Customer Service
                </h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.customerService.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
              {/* Newsletter section */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Sign up for our newsletter
                </h3>
                <p className="mt-6 text-sm text-gray-500">
                  Intermittent updates, when I remember to send them, about new
                  releases, sales and good news!
                </p>
                <form className="flex mt-2 sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="text"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    className="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-full appearance-none sm:text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                  />
                  <div className="flex-shrink-0 ml-4">
                    <Button type="submit" size="lg">
                      Sign up
                    </Button>
                  </div>
                </form>
              </div>
              {/* Blurb */}
              <div className="mt-12">
                <h3 className="text-sm font-medium text-gray-900">
                  @thatsferntastic
                </h3>
                <p className="mt-6 text-sm text-gray-500">
                  @thatsferntastic is an online store focusing on the little
                  things that make you smile. Pencil cases, planner pouches and
                  coin purses, all handmade in Australia, plus accessories,
                  stationery and stickers to add a little more sunshine to your
                  day. Offering flat rate shipping from my little studio on the
                  coast of NSW.
                </p>
                <div className="flex mt-6 space-x-6">
                  {socialLinks.map(({ href, icon: Icon, name }) => (
                    <a
                      key={name}
                      href={href}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">{name}</span>
                      <Icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 text-center border-t border-gray-200">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {siteSettings.title}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
