import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { CartInfo } from "~/models/ecommerce-provider.server";

import { CartListItem } from "./cart-listitem";
import { CheckoutForm } from "./checkout-form";
import { CartIcon, CloseIcon } from "./icons";

export function CartPopover({
  cart,
  cartCount,
  open,
  onClose,
}: {
  cart?: CartInfo;
  cartCount?: number;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10" onClose={onClose}>
        <div className="relative w-full min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed top-0 bottom-0 right-0 flex flex-col w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
              <div className="flex justify-between p-4 lg:px-6">
                <button className="relative flex items-center hover:text-gray-300" onClick={onClose}>
                  <CloseIcon className="w-6 h-6" />
                  <span className="ml-2">Close</span>
                </button>
                <span className="relative flex items-center">
                  <CartIcon className="w-8 h-8" />
                  {!!cartCount && (
                    <span
                      style={{ lineHeight: "0.75rem" }}
                      className="absolute bottom-0 left-0 translate translate-y-[25%] translate-x-[-25%] inline-flex items-center justify-center px-[0.25rem] py-[0.125rem] text-xs text-zinc-900 bg-gray-50 rounded-full"
                    >
                      {cartCount}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex flex-col flex-1 overflow-y-auto">
                {!cart?.items ? (
                  <div className="flex flex-col items-center justify-center h-full p-4 lg:px-6">
                    <span className="flex items-center justify-center w-24 h-24 border border-dashed rounded-full border-primary bg-secondary text-secondary">
                      <CartIcon className="block w-8 h-8" />
                    </span>
                    <Dialog.Title as="h1" className="pt-6 text-2xl font-bold tracking-wide text-center">
                      Your cart is empty
                    </Dialog.Title>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 px-4 lg:px-6">
                      <Dialog.Title as="h1" className="mb-6 text-2xl font-semibold">
                        Cart
                      </Dialog.Title>
                      <ul>
                        {cart.items.map((item) => (
                          <CartListItem
                            key={item.variantId}
                            formattedOptions={item.info.formattedOptions}
                            quantity={item.quantity}
                            formattedPrice={item.info.formattedPrice}
                            image={item.info.image}
                            title={item.info.title}
                            variantId={item.variantId}
                          />
                        ))}
                      </ul>
                    </div>
                    <CheckoutForm
                      className="sticky bottom-0 py-4 pt-4 mx-4 bg-white border-t border-zinc-700 lg:mx-6 "
                      cart={cart}
                    />
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
