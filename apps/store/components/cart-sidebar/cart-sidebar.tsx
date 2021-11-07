import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Button } from '@thatsferntastic/button';
import { formatPrice } from '@thatsferntastic/utils';
import * as React from 'react';

import { RemoveLineItem, useStoreContext } from '../../context/store-context';
import { LineItem as LineItemType } from '../../types';

interface LineItemProps {
  checkoutId: string;
  lineItem: LineItemType;
  removeLineItem: RemoveLineItem;
}

function LineItem({ checkoutId, lineItem, removeLineItem }: LineItemProps) {
  return (
    <li className="flex py-6">
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lineItem.variant.image?.src}
          alt={lineItem.variant.image?.altText ?? ''}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="flex flex-col flex-1 ml-4">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href={lineItem.variant.product.handle}>{lineItem.title}</a>
            </h3>
            <p className="ml-4">
              {formatPrice(Number(lineItem.variant.priceV2.amount))}
            </p>
          </div>
          {lineItem.variant.selectedOptions.map(({ value }, index) => (
            <React.Fragment key={value}>
              {index === 0 ? (
                <p className="mt-1 text-sm text-gray-500">{value}</p>
              ) : (
                <p className="pl-4 mt-1 ml-4 text-sm text-gray-500 border-l border-gray-200">
                  {value}
                </p>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-end justify-between flex-1 text-sm">
          <p className="text-gray-500">Qty {lineItem.quantity}</p>

          <div className="flex">
            <button
              type="button"
              onClick={async () =>
                await removeLineItem(checkoutId, lineItem.id)
              }
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
  const { checkout, closeCart, didJustAddToCart, removeLineItem } =
    useStoreContext();
  return (
    <Transition.Root show={didJustAddToCart} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-hidden"
        onClose={closeCart}
      >
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
            <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
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
                <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          type="button"
                          className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                          onClick={closeCart}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {checkout?.lineItems.map((lineItem) => (
                            <LineItem
                              key={lineItem.id}
                              // TODO: fix types here
                              lineItem={lineItem as any as LineItemType}
                              removeLineItem={removeLineItem}
                              // TODO: fix types here
                              checkoutId={checkout.id as string}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        {checkout?.subtotalPrice
                          ? formatPrice(Number(checkout.subtotalPrice))
                          : null}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Button
                        width="full"
                        as="a"
                        // @ts-expect-error: Types don't have webUrl for some reason
                        href={checkout?.webUrl as string}
                      >
                        Checkout
                      </Button>
                    </div>
                    <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                      <p>
                        or{' '}
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
