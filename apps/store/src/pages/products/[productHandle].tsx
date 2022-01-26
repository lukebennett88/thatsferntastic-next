import { Tab } from "@headlessui/react";
import { Button } from "@thatsferntastic/button";
import { classNames, formatPrice } from "@thatsferntastic/utils";
import isEqual from "fast-deep-equal";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { NextSeo, ProductJsonLd } from "next-seo";
import * as React from "react";

import { CartSidebar } from "../../components/cart-sidebar";
import { QuantityPicker } from "../../components/quantity-picker";
import { ShopifyImage } from "../../components/shopify-image";
import { Spinner } from "../../components/spinner";
import { VariantSelect } from "../../components/variant-select";
import { useStoreContext } from "../../context/store-context";
import { getAllProducts } from "../../graphql/get-all-products";
import { getProductByHandle, Product } from "../../graphql/get-product-by-handle";
import { variantForOptions } from "../../utils";
import { addApolloState } from "../../utils/apollo-client";
import { siteSettings } from "../../utils/constants";

interface ProductPageProps {
  product: NonNullable<Product>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts();
  const paths = products.map(({ node }) => ({
    params: { productHandle: node.handle },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  if (typeof params?.productHandle !== "string") {
    return { notFound: true };
  }
  const product = await getProductByHandle(params.productHandle);
  if (!product) return { notFound: true };
  return addApolloState({
    props: {
      product,
    },
    revalidate: 200,
  });
};

export default function ProductPage({ product }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const { availableForSale, description, descriptionHtml, images, options, priceRange, title, variants } = product;

  // State for selected variant
  const [initialVariant] = variants.edges;
  const [variant, setVariant] = React.useState({
    ...initialVariant,
  });
  const productVariant = variantForOptions(product, variant) || variant;

  const handleOptionChange = (value: string, index: number) => {
    const currentOptions = [...variant.node.selectedOptions];

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };

    const selectedVariant = variants.edges.find((v) => {
      return isEqual(currentOptions, v.node.selectedOptions);
    });

    setVariant({ ...selectedVariant! });
  };

  const [quantity, setQuantity] = React.useState(1);

  const isAvailable = availableForSale && productVariant.node.availableForSale;

  const price = formatPrice(variant.node.priceV2.amount, priceRange.minVariantPrice.currencyCode);

  const hasVariants = variants.edges.length > 1;
  const hasImages = images.edges.length > 0;

  const router = useRouter();

  const { addVariantToCart } = useStoreContext();

  const addToCart = async () => {
    await addVariantToCart([{ merchandiseId: productVariant.node.id, quantity }]);
  };

  const { isLoading } = useStoreContext();

  return (
    <>
      <NextSeo
        title={title}
        description={description.replace(/["“]/g, "'")}
        openGraph={{
          ...(hasImages
            ? {
                images: images.edges.map(({ node }) => ({
                  url: node.transformedSrc,
                })),
              }
            : {}),
        }}
      />
      <ProductJsonLd
        productName={title}
        images={hasImages ? images.edges.map(({ node }) => node.transformedSrc) : undefined}
        description={product.description.replace(/["“]/g, "'")}
        offers={[
          {
            price: Number(priceRange.minVariantPrice.amount).toFixed(2),
            priceCurrency: "AUD",
            availability: availableForSale ? "http://schema.org/InStock" : "http://schema.org/OutOfStock",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`,
            seller: {
              name: siteSettings.title,
            },
          },
        ]}
      />

      <main className="mx-auto max-w-7xl pb-16 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {images.edges.map(({ node: image }) => (
                    <Tab
                      key={image.id}
                      className={classNames(
                        "aspect-w-1 aspect-h-1 relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900",
                        "hover:bg-gray-50",
                        "focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4",
                      )}
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.altText}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <ShopifyImage
                              src={image.transformedSrc}
                              alt=""
                              width={150}
                              height={150}
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              selected ? "ring-pink-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                            )}
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {images.edges.map(({ node: image }) => (
                  <Tab.Panel key={image.id} className="overflow-hidden sm:rounded-lg">
                    <ShopifyImage
                      src={image.transformedSrc}
                      alt={image.altText ?? ""}
                      height={700}
                      width={700}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{title}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="font-mono text-3xl text-pink-600">{price}</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: descriptionHtml,
                  }}
                />
              </div>

              {/* Quantity picker */}
              <QuantityPicker
                available={variant.node.quantityAvailable}
                quantity={quantity}
                setQuantity={setQuantity}
              />

              <div className="mt-6">
                {/* Variants */}
                {hasVariants ? (
                  <fieldset>
                    {options.map(({ id, name, values }, index) => (
                      <VariantSelect
                        key={id}
                        index={index}
                        handleOptionChange={handleOptionChange}
                        name={name}
                        values={values}
                        variant={variant}
                      />
                    ))}
                  </fieldset>
                ) : null}

                {/* Add to cart */}
                <div className="mt-10 flex">
                  <Button size="lg" width="fixed" type="button" disabled={!isAvailable} onClick={addToCart}>
                    <span className="relative flex items-center justify-center">
                      {isLoading ? (
                        <span className="absolute inset-y-0 -left-3 -translate-x-full transform-gpu">
                          <Spinner />
                        </span>
                      ) : null}
                      {isAvailable ? "Add to cart" : "Out of stock"}
                    </span>
                  </Button>

                  {/* Add to favourites */}
                </div>
              </div>
              {/* Details */}
            </div>
          </div>
          {/* Related products */}
        </div>
      </main>
      <CartSidebar />
    </>
  );
}
