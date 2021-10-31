import { CheckIcon, ClockIcon, XIcon } from '@heroicons/react/solid';
import { Button } from '@thatsferntastic/button';
import { formatPrice } from '@thatsferntastic/utils';
import NextLink from 'next/link';
import * as React from 'react';

import { ShopifyImage } from '../components/shopify-image';
import { Spinner } from '../components/spinner';
import { useStoreContext } from '../context/store-context';
import type { CartLine } from '../graphql/cart-fragment';
import { useCartCount } from '../utils/hooks/use-cart-count';

interface CartPreviewItemProps {
  cartLine: CartLine;
  index: number;
}

function CartPreviewItem({
  cartLine,
  index,
}: CartPreviewItemProps): JSX.Element {
  const { isLoading, removeLineItem, updateLineItem } = useStoreContext();
  const { product } = cartLine.merchandise;
  const [{ node: image }] = product.images.edges;
  return (
    <li className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <div className="relative">
          <ShopifyImage
            src={image.transformedSrc}
            alt={image.altText ?? ''}
            height={96}
            width={96}
            className="object-cover object-center w-24 h-24 rounded-md sm:w-48 sm:h-48"
          />
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center w-full bg-white bg-opacity-40">
              <Spinner />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <NextLink href={`/products/${product.handle}`}>
                  <a className="font-medium text-gray-700 hover:text-gray-800">
                    {product.title}
                  </a>
                </NextLink>
              </h3>
            </div>
            <div className="flex mt-1 text-sm">
              {cartLine.merchandise.selectedOptions.map(({ value }, index) => (
                <React.Fragment key={value}>
                  {index === 0 ? (
                    <p className="text-gray-500">{value}</p>
                  ) : (
                    <p className="pl-4 ml-4 text-gray-500 border-l border-gray-200">
                      {value}
                    </p>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {formatPrice(
                Number(cartLine.estimatedCost.subtotalAmount.amount)
              )}
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
              onChange={async event =>
                await updateLineItem([
                  {
                    id: product.id,
                    quantity: Number(event.target.value),
                  },
                ])
              }
              className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            >
              {Array.from({ length: 8 })
                .fill('')
                .map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </select>

            <div className="absolute top-0 right-0">
              <button
                type="button"
                onClick={async () => await removeLineItem([product.id])}
                className="inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <XIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <p className="flex mt-4 space-x-2 text-sm text-gray-700">
          {product.availableForSale ? (
            <CheckIcon
              className="flex-shrink-0 w-5 h-5 text-green-500"
              aria-hidden="true"
            />
          ) : (
            <ClockIcon
              className="flex-shrink-0 w-5 h-5 text-gray-300"
              aria-hidden="true"
            />
          )}

          <span>{product.availableForSale ? 'In stock' : `Out of stock`}</span>
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
      <div className="max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              {cart?.lines?.edges.map(({ node }, index) => (
                <CartPreviewItem key={node.id} cartLine={node} index={index} />
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Items in cart</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {cartCount}
                </dd>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <dt className="flex items-center text-sm text-gray-600">
                  Shipping estimate
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  Calculated at checkout
                </dd>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <dt className="text-base font-medium text-gray-900">
                  Subtotal
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {cart?.estimatedCost
                    ? formatPrice(
                        Number(cart.estimatedCost.subtotalAmount.amount)
                      )
                    : null}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Button as="a" width="full" size="xl" href={cart?.checkoutUrl}>
                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <span className="absolute inset-y-0 -translate-x-full -left-3 transform-gpu">
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
