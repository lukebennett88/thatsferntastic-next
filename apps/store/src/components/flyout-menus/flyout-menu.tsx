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
                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out",
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
            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
              <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

              <div className="relative bg-white">
                <div className="mx-auto max-w-7xl px-8">
                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">{open && children}</div>
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
  return <div className="col-start-2 grid grid-cols-2 gap-x-8">{children}</div>;
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
    <div className="group relative text-base sm:text-sm">
      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
        <div>
          <ShopifyImage src={imgSrc} height={280} width={280} layout="fill" alt={altText ?? ""} />
        </div>
      </div>
      <a href={href} className="mt-6 block font-medium text-gray-900">
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
      <ul aria-labelledby={headingId} role="list" className="mt-6 grid grid-flow-col grid-rows-6 gap-4">
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
