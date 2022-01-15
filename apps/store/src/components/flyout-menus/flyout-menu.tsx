import { Popover, Transition } from "@headlessui/react";
import { classNames } from "@thatsferntastic/utils";
import * as React from "react";

import { ShopifyImage } from "../shopify-image";

export function FlyoutMenu({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <Popover className="flex">
      {({ open }) => (
        <>
          <div className="relative flex">
            <Popover.Button
              className={classNames(
                open ? "border-pink-600 text-pink-600" : "border-transparent text-gray-700 hover:text-gray-800",
                "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px",
              )}
            >
              {label}
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
              <div aria-hidden="true" className="absolute inset-0 bg-white shadow top-1/2" />

              <div className="relative bg-white">
                <div className="px-8 mx-auto max-w-7xl">
                  <div className="grid grid-cols-2 py-16 gap-y-10 gap-x-8">{open && children}</div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export function FlyoutCtas({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 col-start-2 gap-x-8">{children}</div>;
}

export function FlyoutCta({
  imgSrc,
  altText,
  href,
  title,
}: {
  imgSrc: string;
  altText?: string;
  href: string;
  title: string;
}) {
  return (
    <div className="relative text-base group sm:text-sm">
      <div className="overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1 group-hover:opacity-75">
        <div>
          <ShopifyImage src={imgSrc} height={280} width={280} layout="fill" alt={altText ?? ""} />
        </div>
      </div>
      <a href={href} className="block mt-6 font-medium text-gray-900">
        <span aria-hidden="true" className="absolute inset-0 z-10" />
        {title}
      </a>
      <p aria-hidden="true" className="mt-1">
        Shop now
      </p>
    </div>
  );
}

export function FlyoutList({
  children,
  headingId,
  heading,
}: {
  children: React.ReactNode;
  headingId: string;
  heading: string;
}) {
  return (
    <div className="row-start-1">
      <p id={headingId} className="font-medium text-gray-900">
        {heading}
      </p>
      <ul aria-labelledby={headingId} role="list" className="grid grid-flow-col grid-rows-6 gap-4 mt-6">
        {children}
      </ul>
    </div>
  );
}

export function FlyoutListItem({ href, title }: { href: string; title: string }) {
  return (
    <li className="flex">
      <a href={href} className="hover:text-gray-800">
        {title}
      </a>
    </li>
  );
}
