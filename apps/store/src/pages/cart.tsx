import { CheckIcon, ClockIcon, XIcon } from "@heroicons/react/solid";
import { Button } from "@thatsferntastic/button";
import { formatPrice } from "@thatsferntastic/utils";
import NextLink from "next/link";
import * as React from "react";

import { ShopifyImage } from "../components/shopify-image";
import { Spinner } from "../components/spinner";
import { useStoreContext } from "../context/store-context";
import type { CartLine } from "../graphql/cart-fragment";
import { useCartCount } from "../utils/hooks/use-cart-count";

interface CartPreviewItemProps {
  cartLine: CartLine;
  index: number;
}

function CartPreviewItem({ cartLine, index }: CartPreviewItemProps): JSX.Element {
  const { isLoading, removeLineItem, updateLineItem } = useStoreContext();
  const { product } = cartLine.merchandise;
  const variantImage = product.variants.edges.find(({ node }) => node.id === cartLine.merchandise.id)?.node.image;
  const [{ node: firstImage }] = product.images.edges;
  const image = variantImage ?? firstImage;

  const handleUpdateLineItem = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    await updateLineItem([
      {
        id: cartLine.id,
        quantity: Number(event.target.value),
      },
    ]);
  };
  const handleRemoveLineItem = async () => await removeLineItem([cartLine.id]);
  return (
    <li className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <div className="relative">
          <ShopifyImage
            src={image.transformedSrc}
            alt={image.altText ?? ""}
            height={96}
            width={96}
            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
          />
          {isLoading ? (
            <div className="absolute inset-0 flex w-full items-center justify-center bg-white bg-opacity-40">
              <Spinner />
            </div>
          ) : null}
        </div>
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <NextLink href={`/products/${product.handle}`}>
                  <a className="font-medium text-gray-700 hover:text-gray-800">{product.title}</a>
                </NextLink>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              {cartLine.merchandise.selectedOptions?.map(({ value }, index) => (
                <React.Fragment key={value}>
                  {index === 0 ? (
                    <p className="text-gray-500">{value}</p>
                  ) : (
                    <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{value}</p>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {formatPrice(Number(cartLine.estimatedCost.subtotalAmount.amount))}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label htmlFor={`quantity-${index}`} className="sr-only">
              Quantity, {product.title}
            </label>
            <select
              id={`quantity-${index}`}
              name={`quantity-${index}`}
              defaultValue={cartLine.quantity}
              onChange={handleUpdateLineItem}
              className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
            >
              {Array.from({ length: 8 }, (_, i) => {
                const value = i + 1;
                return (
                  <option key={i} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>

            <div className="absolute top-0 right-0">
              <button
                type="button"
                onClick={handleRemoveLineItem}
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
          {product.availableForSale ? (
            <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
          ) : (
            <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
          )}

          <span>{product.availableForSale ? "In stock" : `Out of stock`}</span>
        </p>
      </div>
    </li>
  );
}

export default function CartPage(): JSX.Element {
  const { cart, isLoading } = useStoreContext();
  const cartCount = useCartCount();
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cart?.lines?.edges.map(({ node }, index) => (
                <CartPreviewItem key={node.id} cartLine={node} index={index} />
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Items in cart</dt>
                <dd className="text-sm font-medium text-gray-900">{cartCount}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">Shipping estimate</dt>
                <dd className="text-sm font-medium text-gray-900">Calculated at checkout</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                <dd className="text-base font-medium text-gray-900">
                  {cart?.estimatedCost ? formatPrice(Number(cart.estimatedCost.subtotalAmount.amount)) : null}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Button as="a" width="full" size="xl" href={cart?.checkoutUrl}>
                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <span className="absolute inset-y-0 -left-3 -translate-x-full transform-gpu">
                      <Spinner />
                    </span>
                  ) : null}
                  Checkout
                </span>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
