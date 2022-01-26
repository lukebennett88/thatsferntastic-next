import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { FullWishlistItem } from "~/models/ecommerce-provider.server";

import { CloseIcon, WishlistIcon } from "./icons";
import { WishlistListItem } from "./wishlist-listitem";

export function WishlistPopover({
  wishlist,
  wishlistCount,
  open,
  onClose,
}: {
  wishlist?: FullWishlistItem[];
  wishlistCount?: number;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10" onClose={onClose}>
        <div className="relative min-h-screen w-full">
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
            <div className="fixed top-0 bottom-0 right-0 flex w-full max-w-md transform flex-col overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
              <div className="flex justify-between p-4 lg:px-6">
                <button
                  data-testid="close-wishlist"
                  className="relative flex items-center hover:text-gray-300"
                  onClick={onClose}
                >
                  <CloseIcon className="h-6 w-6" />
                  <span className="ml-2">Close</span>
                </button>
                <span className="relative flex items-center">
                  <WishlistIcon className="h-8 w-8" />
                  {!!wishlistCount && (
                    <span
                      style={{ lineHeight: "0.75rem" }}
                      className="translate absolute bottom-0 left-0 inline-flex translate-y-[25%] translate-x-[-25%] items-center justify-center rounded-full bg-gray-50 px-[0.25rem] py-[0.125rem] text-xs text-zinc-900"
                    >
                      {wishlistCount}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto">
                {!wishlist ? (
                  <div className="flex h-full flex-col items-center justify-center p-4 lg:px-6">
                    <span className="border-primary bg-secondary text-secondary flex h-24 w-24 items-center justify-center rounded-full border border-dashed">
                      <WishlistIcon className="block h-8 w-8" />
                    </span>
                    <Dialog.Title as="h1" className="pt-6 text-center text-2xl font-bold tracking-wide">
                      Your wishlist is empty
                    </Dialog.Title>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 px-4 lg:px-6">
                      <Dialog.Title as="h1" className="mb-6 text-2xl font-semibold">
                        Wishlist
                      </Dialog.Title>
                      <ul>
                        {wishlist.map((item) => (
                          <WishlistListItem
                            key={item.variantId}
                            formattedOptions={item.info.formattedOptions}
                            quantity={item.quantity}
                            formattedPrice={item.info.formattedPrice}
                            image={item.info.image}
                            title={item.info.title}
                            variantId={item.variantId}
                            productId={item.productId}
                          />
                        ))}
                      </ul>
                    </div>
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
