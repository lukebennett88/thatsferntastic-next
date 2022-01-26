import cn from "classnames";
import type { MouseEventHandler } from "react";
import { useEffect, useRef, useState } from "react";
import { Form, useLocation, useSearchParams, useTransition } from "remix";

import type { FullProduct } from "~/models/ecommerce-provider.server";

import { OptimizedImage } from "./optimized-image";

export function ProductDetails({ product }: { product: FullProduct }) {
  let location = useLocation();
  let [searchParams] = useSearchParams();
  searchParams.sort();

  let disabled = !product.selectedVariantId || !product.availableForSale;

  return (
    <main>
      <div className="product-details-grid border-b border-zinc-700 pb-8 lg:grid">
        <aside className="product-details-grid__media relative mb-4 overflow-hidden border-b border-zinc-700 lg:mb-0 lg:border-none">
          <ImageSlider images={product.images} />
        </aside>
        <article className="product-details-grid__details relative">
          <div className="sticky top-0 px-4 pt-4 lg:p-6 lg:pt-8 lg:pb-0">
            <h1 className="mb-3 text-3xl font-bold">{product.title}</h1>
            <p className="mb-6 text-xl">{product.formattedPrice}</p>
            {product.descriptionHtml ? (
              <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
            ) : product.description ? (
              <p className="leading-relaxed">{product.description}</p>
            ) : null}
            {product.options && product.options.length > 0 ? (
              <Form replace>
                {Array.from(searchParams.entries()).map(([key, value]) => (
                  <input key={key + value} type="hidden" name={key} defaultValue={value} />
                ))}
                {product.options.map((option) => (
                  <div key={option.name} className="mt-6">
                    <h2 className="font-semibold">{option.name}</h2>
                    <ul className="mt-2" data-testid="product-option">
                      {option.values.map((value) => (
                        <li key={value} className="mr-2 inline-block">
                          <button
                            aria-selected={searchParams.get(option.name) === value}
                            className={cn(
                              "rounded border px-4 py-2 hover:text-gray-300",
                              searchParams.get(option.name) === value ? "border-gray-50" : "border-zinc-700",
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
                {!!product.selectedVariantId && !product.availableForSale ? (
                  <p className="mt-6 text-red-500">Sold out</p>
                ) : null}
              </Form>
            ) : null}
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
              <button
                data-testid="add-to-cart"
                className={cn(
                  "block w-full py-4 text-center font-semibold uppercase text-gray-900 active:bg-gray-300",
                  disabled ? "bg-gray-300" : "bg-gray-50",
                )}
                disabled={disabled}
              >
                <SubmissionSequenceText action="Add to cart" strings={["Add to cart", "Adding...", "Added!"]} />
              </button>
            </Form>
          </div>
        </article>
      </div>
    </main>
  );
}

function SubmissionSequenceText({ strings, action }: { strings: String[]; action: string }) {
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
  }, [transition]);

  return <span>{text}</span>;
}

function ImageSlider({ images }: { images: string[] }) {
  let sliderListRef = useRef<HTMLUListElement>(null);
  let scrollToImage: MouseEventHandler<HTMLButtonElement> = (event) => {
    let src = event.currentTarget.querySelector("img")?.getAttribute("data-source");
    if (!src) return;
    let img = sliderListRef.current?.querySelector(`img[data-source=${JSON.stringify(src)}]`);
    img?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="sticky top-0 flex aspect-auto max-h-screen w-full flex-col overflow-hidden bg-pink-500 lg:h-screen">
        <div className="relative aspect-square w-full flex-1 overflow-hidden lg:aspect-auto">
          <ul
            ref={sliderListRef}
            className="absolute top-0 bottom-0 left-0 right-0 snap-x snap-mandatory overflow-x-auto overflow-y-hidden whitespace-nowrap"
          >
            {images.map((image, index) => (
              <li key={`${index}|${image}`} className="inline-block h-full w-full snap-start">
                <OptimizedImage
                  data-source={image}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-contain"
                  src={image}
                  alt=""
                  height={480}
                  width={480}
                  responsive={[
                    {
                      size: {
                        height: 480,
                        width: 480,
                      },
                    },
                    {
                      size: {
                        height: 767,
                        width: 767,
                      },
                    },
                    {
                      size: {
                        height: 1024,
                        width: 1024,
                      },
                    },
                  ]}
                />
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex h-full max-h-[20%] overflow-x-auto bg-pink-600">
          {images.map((image, index) => (
            <li key={`${index}|${image}`} className="aspect-square w-full max-w-[25%]">
              <button className="relative block h-full w-full hover:bg-pink-400" onClick={scrollToImage}>
                <span className="sr-only">Focus image {index + 1}</span>
                <OptimizedImage
                  data-source={image}
                  className="h-full w-full object-cover"
                  src={image}
                  alt=""
                  height={200}
                  width={200}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
