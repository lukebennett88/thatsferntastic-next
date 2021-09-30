/* eslint-disable @next/next/no-img-element */
import { Disclosure, RadioGroup, Tab } from '@headlessui/react';
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { NextSeo, ProductJsonLd } from 'next-seo';
import * as React from 'react';

import {
  getProductByHandle,
  Product,
} from '../../graphql/get-product-by-handle';
import { classNames, formatCurrency } from '../../utils';
import { addApolloState, initialiseTsGql } from '../../utils/apollo-client';
import { siteSettings } from '../../utils/constants';

const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
  ],
  colors: [
    {
      name: 'Washed Black',
      bgColor: 'bg-gray-700',
      selectedColor: 'ring-gray-700',
    },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    {
      name: 'Washed Gray',
      bgColor: 'bg-gray-500',
      selectedColor: 'ring-gray-500',
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    // More sections...
  ],
};
const relatedProducts = [
  {
    id: 1,
    name: 'Zip Tote Basket',
    color: 'White and black',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  // More products...
];

interface ProductPageProps {
  product: NonNullable<Product>;
}

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({
  query,
}) => {
  const { handle } = query;
  if (typeof handle !== 'string') {
    return { notFound: true };
  }
  const client = initialiseTsGql();
  const product = await getProductByHandle(client, handle);
  if (!product) return { notFound: true };
  return addApolloState(client, {
    props: {
      product,
    },
  });
};

export default function ProductPage({
  product: shopifyProduct,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
  const router = useRouter();
  const hasImages = shopifyProduct.images.edges.length > 0;
  console.log(shopifyProduct.id);
  return (
    <>
      <NextSeo
        title={shopifyProduct.title}
        description={shopifyProduct.description.replace(/["“]/g, "'")}
        openGraph={{
          ...(hasImages
            ? {
                images: shopifyProduct.images.edges.map(({ node }) => ({
                  url: node.transformedSrc,
                })),
              }
            : {}),
        }}
      />
      <ProductJsonLd
        productName={shopifyProduct.title}
        images={
          hasImages
            ? shopifyProduct.images.edges.map(({ node }) => node.transformedSrc)
            : undefined
        }
        description={product.description.replace(/["“]/g, "'")}
        offers={[
          {
            price: Number(
              shopifyProduct.priceRange.minVariantPrice.amount
            ).toFixed(2),
            priceCurrency: 'AUD',
            availability: shopifyProduct.availableForSale
              ? 'http://schema.org/InStock'
              : 'http://schema.org/OutOfStock',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`,
            seller: {
              name: siteSettings.title,
            },
          },
        ]}
      />

      <main className="mx-auto max-w-7xl sm:pt-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {shopifyProduct.images.edges.map(({ node: image }) => (
                    <Tab
                      key={image.id}
                      className="relative flex items-center justify-center h-24 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.altText}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image.transformedSrc}
                              alt=""
                              className="object-cover object-center w-full h-full"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-indigo-500' : 'ring-transparent',
                              'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                {shopifyProduct.images.edges.map(({ node: image }) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={image.transformedSrc}
                      alt={image.altText || ''}
                      className="object-cover object-center w-full h-full sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {shopifyProduct.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  {formatCurrency(
                    shopifyProduct.priceRange.minVariantPrice.amount
                  )}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: shopifyProduct.descriptionHtml,
                  }}
                />
              </div>

              <form className="mt-6">
                {/* Colors */}
                <div>
                  <h3 className="text-sm text-gray-600">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map(color => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedColor,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.bgColor,
                              'h-8 w-8 border border-black border-opacity-10 rounded-full'
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex mt-10 sm:flex-col1">
                  <button
                    type="submit"
                    className="flex items-center justify-center flex-1 max-w-xs px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                  >
                    Add to bag
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center px-3 py-3 ml-4 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon
                      className="flex-shrink-0 w-6 h-6"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="border-t divide-y divide-gray-200">
                  {product.details.map(detail => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="relative flex items-center justify-between w-full py-6 text-left group">
                              <span
                                className={classNames(
                                  open ? 'text-indigo-600' : 'text-gray-900',
                                  'text-sm font-medium'
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="flex items-center ml-6">
                                {open ? (
                                  <MinusSmIcon
                                    className="block w-6 h-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block w-6 h-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose-sm prose"
                          >
                            <ul role="list">
                              {detail.items.map(item => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <section
            aria-labelledby="related-heading"
            className="px-4 py-16 mt-10 border-t border-gray-200 sm:px-0"
          >
            <h2
              id="related-heading"
              className="text-xl font-bold text-gray-900"
            >
              Customers also bought
            </h2>

            <div className="grid grid-cols-1 mt-8 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map(product => (
                <div key={product.id}>
                  <div className="relative">
                    <div className="relative w-full overflow-hidden rounded-lg h-72">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-lg h-72">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 opacity-50 h-36 bg-gradient-to-t from-black"
                      />
                      <p className="relative text-lg font-semibold text-white">
                        {product.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a
                      href={product.href}
                      className="relative flex items-center justify-center px-8 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200"
                    >
                      Add to bag
                      <span className="sr-only">, {product.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
