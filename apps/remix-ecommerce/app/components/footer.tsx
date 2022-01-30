import type { To } from "react-router-dom";
import { Link } from "remix";

import type { Collection } from "~/route-containers/layout/layout.component";

import { FacebookIcon, InstagramIcon, TwitterIcon } from "./icons";

export type FooterPage = {
  id: string;
  title: string;
  to: To;
};

export function Footer({
  collections,
  logoHref,
  pages,
  storeName,
  year,
}: {
  collections: Array<Collection>;
  logoHref: string;
  pages: Array<FooterPage>;
  storeName?: string;
  year?: number;
}) {
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-50">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 py-20">
          <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
              <a className="inline-flex rounded-full focus:ring" href="/">
                <span className="sr-only">{storeName}</span>
                <img src={logoHref} alt="" width={32} height={32} />
              </a>
            </div>
            <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
              <FooterCollections collections={collections} />
              <FooterServicesLinks pages={pages} />
            </div>
            <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <FooterNewsletterForm />
              <div className="mt-12">
                <h3 className="text-sm font-medium text-gray-900">{storeName}</h3>
                <p className="mt-6 text-sm text-gray-500">
                  {storeName} is an online store focusing on the little things that make you smile. Pencil cases,
                  planner pouches and coin purses, all handmade in Australia, plus accessories, stationery and stickers
                  to add a little more sunshine to your day. Offering flat rate shipping from my little studio on the
                  coast of NSW.
                </p>
                <FooterSocialLinks />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-10 text-center">
          <p className="text-sm text-gray-500">
            &copy; {year} {storeName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCollections({ collections }: { collections: Array<Collection> }) {
  return (
    <div className="sm:col-span-2">
      <h3 className="text-sm font-medium text-gray-900 sm:col-span-2">Collections</h3>
      <ul role="list" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        {collections.map(({ name, to }) => (
          <FooterLink key={name} to={to} name={name} />
        ))}
      </ul>
    </div>
  );
}

function FooterServicesLinks({ pages }: { pages: Array<FooterPage> }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
      <ul role="list" className="mt-6 space-y-6">
        {pages.map((page) => (
          <FooterLink key={page.id} to={page.to} name={page.title} />
        ))}
        <li className="text-sm">
          <a className="text-gray-500 hover:text-gray-600" href="/about">
            About
          </a>
        </li>
        <li className="text-sm">
          <a className="text-gray-500 hover:text-gray-600" href="/privacy-policy">
            Privacy Policy
          </a>
        </li>
        <li className="text-sm">
          <a className="text-gray-500 hover:text-gray-600" href="/refund-policy">
            Refund Policy
          </a>
        </li>
        <li className="text-sm">
          <a className="text-gray-500 hover:text-gray-600" href="/shipping-and-processing-times">
            Shipping and Processing Times
          </a>
        </li>
        <li className="text-sm">
          <a className="text-gray-500 hover:text-gray-600" href="/terms-of-service">
            Terms of Service
          </a>
        </li>
      </ul>
    </div>
  );
}

function FooterLink({ to, name }: { to: To; name: string }) {
  return (
    <li className="text-sm">
      <Link className="text-gray-500 hover:text-gray-600" to={to}>
        {name}
      </Link>
    </li>
  );
}

function FooterNewsletterForm() {
  return (
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
          type="text"
          id="email-address"
          autoComplete="email"
          required
          placeholder="Enter your email"
          className="w-full min-w-0 appearance-none rounded-full border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
        />
        <div className="ml-4 flex-shrink-0">
          <button
            className="inline-flex transform-gpu items-center justify-center rounded-full border border-transparent bg-pink-200 px-5 py-2 text-center font-mono text-base font-medium text-pink-700 transition duration-300 ease-in-out hover:bg-pink-100 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

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

function FooterSocialLinks() {
  return (
    <div className="mt-6 flex space-x-6">
      {socialLinks.map(({ href, icon: Icon, name }) => (
        <a key={href} href={href} className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">{name}</span>
          <Icon />
        </a>
      ))}
    </div>
  );
}
