import { Tab } from "@headlessui/react";
import { classNames } from "@thatsferntastic/utils";
import { Fragment, useEffect, useState } from "react";
import { Form, useLocation, useSearchParams, useTransition } from "remix";

import type { FullProduct, ProductOption } from "~/models/ecommerce-provider.server";

import { OptimizedImage } from "./optimized-image";

export function ProductDetails({ product }: { product: FullProduct }) {
  let location = useLocation();
  let [searchParams] = useSearchParams();
  searchParams.sort();

  let disabled = !product.selectedVariantId || !product.availableForSale;

  return (
    <main>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <ImageGallery images={product.images} />

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">{product.formattedPrice}</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                {product.descriptionHtml ? (
                  <div
                    className="space-y-6 text-base text-gray-700"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                ) : product.description ? (
                  <p className="space-y-6 text-base text-gray-700">{product.description}</p>
                ) : null}
              </div>

              {/* Product options */}
              <ProductOptions options={product.options} searchParams={searchParams} />

              {/* Add to cart */}
              <Form replace method="post" className="mt-8">
                <input type="hidden" name="_action" value="Add to cart" />
                <input
                  key={location.pathname + location.search}
                  defaultValue={location.pathname + location.search}
                  type="hidden"
                  name="redirect"
                />
                <input
                  key={product.selectedVariantId}
                  defaultValue={product.selectedVariantId}
                  type="hidden"
                  name="variantId"
                />
                <div className="mt-10 flex">
                  <button
                    disabled={disabled}
                    type="submit"
                    data-testid="add-to-cart"
                    className={classNames(
                      disabled ? "cursor-not-allowed bg-opacity-50" : "hover:bg-pink-700",
                      "flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-pink-600 py-3 px-8 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full",
                    )}
                  >
                    <SubmissionSequenceText action="Add to cart" strings={["Add to cart", "Adding...", "Added!"]} />
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ImageGallery({ images }: { images: Array<string> }) {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image, index) => (
            <Tab
              key={index}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
            >
              {({ selected }) => (
                <>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <OptimizedImage
                      data-source={image}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-cover object-center"
                      src={image}
                      alt=""
                      height={96}
                      width={124}
                      responsive={[
                        {
                          size: {
                            height: 124,
                            width: 96,
                          },
                        },
                        {
                          size: {
                            height: 124 * 2,
                            width: 96 * 2,
                          },
                        },
                        {
                          size: {
                            height: 124 * 3,
                            width: 96 * 3,
                          },
                        },
                      ]}
                    />
                  </span>
                  <span
                    className={classNames(
                      selected ? "ring-pink-500" : "ring-transparent",
                      "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
        {images.map((image, index) => (
          <Tab.Panel key={index}>
            <OptimizedImage
              data-source={image}
              loading={index === 0 ? "eager" : "lazy"}
              className="h-full w-full object-contain"
              src={image}
              alt=""
              height={624}
              width={624}
              responsive={[
                {
                  size: {
                    height: 624,
                    width: 624,
                  },
                },
                {
                  size: {
                    height: 624 * 2,
                    width: 624 * 2,
                  },
                },
                {
                  size: {
                    height: 624 * 3,
                    width: 634 * 2,
                  },
                },
              ]}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

function ProductOptions({ options, searchParams }: { options: Array<ProductOption>; searchParams: URLSearchParams }) {
  if (!options ?? options.length < 1) {
    return null;
  }
  return (
    <Form replace className="mt-6">
      {Array.from(searchParams.entries()).map(([key, value]) => (
        <input key={key + value} type="hidden" name={key} defaultValue={value} />
      ))}
      {options.map((option) => (
        <div key={option.name} className="mt-6">
          <h3 className="text-sm text-gray-600">{option.name}</h3>
          <ul className="mt-2 flex flex-wrap gap-3">
            {option.values.map((value) => (
              <li key={value} className="w-fit">
                <button
                  type="submit"
                  className={classNames(
                    searchParams.get(option.name) === value ? "ring-2 ring-pink-500" : "border-gray-300",
                    "relative block cursor-pointer rounded-lg border py-2 px-4 ring-offset-2 focus:outline-none focus:ring",
                  )}
                  name={option.name}
                  value={value}
                >
                  {value}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Form>
  );
}

function SubmissionSequenceText({ strings, action }: { strings: Array<String>; action: string }) {
  let transition = useTransition();
  let [text, setText] = useState(strings[0]);

  useEffect(() => {
    if (transition.submission?.formData.get("_action") === action) {
      if (transition.state === "submitting") {
        setText(strings[1]);
      } else if (transition.state === "loading") {
        setText(strings[2]);
      }
    } else {
      let id = setTimeout(() => setText(strings[0]), 1000);
      return () => clearTimeout(id);
    }
  }, [action, strings, transition.state, transition.submission?.formData]);

  return <Fragment>{text}</Fragment>;
}
