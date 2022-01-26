import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Button } from "@thatsferntastic/button";
import { classNames, formatPrice } from "@thatsferntastic/utils";
import NextLink from "next/link";
import * as React from "react";

import type { RemoveLineItem } from "../../context/store-context";
import { useStoreContext } from "../../context/store-context";
import type { CartLine } from "../../graphql/cart-fragment";
import { InternalLink } from "../internal-link";
import { ShopifyImage } from "../shopify-image";

interface LineItemProps {
  cartLine: CartLine;
  removeLineItem: RemoveLineItem;
}

function LineItem({ cartLine, removeLineItem }: LineItemProps) {
  const { product } = cartLine.merchandise;
  const variantImage = product.variants.edges.find(({ node }) => node.id === cartLine.merchandise.id)?.node.image;
  const [{ node: firstImage }] = product.images.edges;
  const image = variantImage ?? firstImage;
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        {image ? (
          <ShopifyImage
            src={image.transformedSrc}
            alt={image.altText ?? ""}
            height={96}
            width={96}
            className="h-full w-full object-cover object-center"
          />
        ) : null}
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <NextLink href={`/products/${product.handle}`}>
                <a>{product.title}</a>
              </NextLink>
            </h3>
            <p className="ml-4">{formatPrice(Number(cartLine.estimatedCost.subtotalAmount.amount))}</p>
          </div>
          {cartLine.merchandise.selectedOptions
            .filter(({ value }) => value !== "Default Title")
            .map(({ value }, index) => {
              const baseClasses = "mt-1 text-sm text-gray-500";
              return (
                <React.Fragment key={value}>
                  {index === 0 ? (
                    <p className={baseClasses}>{value}</p>
                  ) : (
                    <p className={classNames(baseClasses, "ml-4 border-l border-gray-200 pl-4")}>{value}</p>
                  )}
                </React.Fragment>
              );
            })}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty: {cartLine.quantity}</p>
          <div className="flex">
            <button
              type="button"
              onClick={async () => await removeLineItem([cartLine.id])}
              className="font-medium text-pink-600 hover:text-pink-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export function CartSidebar(): JSX.Element {
  const { cart, closeCart, didJustAddToCart, removeLineItem } = useStoreContext();
  return (
    <Transition.Root show={didJustAddToCart} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-30 overflow-hidden" onClose={closeCart}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={React.Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={React.Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={closeCart}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cart?.lines?.edges.map(({ node }) => (
                            <LineItem key={node.id} cartLine={node} removeLineItem={removeLineItem} />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        {cart?.estimatedCost ? formatPrice(Number(cart.estimatedCost.subtotalAmount.amount)) : null}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <Button as={InternalLink} onClick={closeCart} href="/cart" width="full">
                        Go to cart
                      </Button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="font-medium text-pink-600 hover:text-pink-500"
                          onClick={closeCart}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
