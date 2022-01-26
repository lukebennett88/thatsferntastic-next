import { Button } from "@thatsferntastic/button";
import NextLink from "next/link";
import * as React from "react";

import { Collection, getAllCollections } from "../../graphql/get-all-collections";
import { getAllProducts, Product } from "../../graphql/get-all-products";
import { siteSettings } from "../../utils/constants";
import { useGetAllCategories } from "../../utils/hooks/use-get-all-categories";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../icons";
import { Logo } from "../logo";

const footerNavigation = [
  { name: "About", href: "/about" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Shipping and Processing Times", href: "/shipping-and-processing-times" },
  { name: "Terms of Service", href: "/terms-of-service" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/thatsferntastic/",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/thatsferntastic/",
    icon: InstagramIcon,
  },
  {
    name: "Twitter",
    href: "https://www.twitter.com/thatsferntastic/",
    icon: TwitterIcon,
  },
];

export function Footer(): JSX.Element {
  const [collections, setCollections] = React.useState<Collection[]>([]);
  React.useEffect(() => {
    (async () => {
      // Get all collections and save to state
      const collections = await getAllCollections();
      setCollections(collections);
    })();
  }, []);
  const categories = useGetAllCategories();
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-50">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 py-20">
          <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            {/* Image section */}
            <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
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
            <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
              <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Collections</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {collections.map(({ node }) => (
                      <li key={node.id} className="text-sm">
                        <NextLink href={`/collections/${node.handle}`}>
                          <a className="text-gray-500 hover:text-gray-600">{node.title}</a>
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Product categories</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {categories.map(({ category, href }) => (
                      <li key={category} className="text-sm">
                        <a href={href} className="text-gray-500 hover:text-gray-600">
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.map((item) => (
                    <li key={item.name} className="text-sm">
                      <NextLink href={item.href}>
                        <a className="text-gray-500 hover:text-gray-600">{item.name}</a>
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              {/* Newsletter section */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
                <p className="mt-6 text-sm text-gray-500">
                  Intermittent updates, when I remember to send them, about new releases, sales and good news!
                </p>
                <form className="mt-2 flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="text"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    className="w-full min-w-0 appearance-none rounded-full border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                  />
                  <div className="ml-4 flex-shrink-0">
                    <Button type="submit" size="lg">
                      Sign up
                    </Button>
                  </div>
                </form>
              </div>
              {/* Blurb */}
              <div className="mt-12">
                <h3 className="text-sm font-medium text-gray-900">@thatsferntastic</h3>
                <p className="mt-6 text-sm text-gray-500">
                  @thatsferntastic is an online store focusing on the little things that make you smile. Pencil cases,
                  planner pouches and coin purses, all handmade in Australia, plus accessories, stationery and stickers
                  to add a little more sunshine to your day. Offering flat rate shipping from my little studio on the
                  coast of NSW.
                </p>
                <div className="mt-6 flex space-x-6">
                  {socialLinks.map(({ href, icon: Icon, name }) => (
                    <a key={name} href={href} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">{name}</span>
                      <Icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 py-10 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {siteSettings.title}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
