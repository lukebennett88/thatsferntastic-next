import cn from "classnames";
import type { ReactNode } from "react";
import { useMemo } from "react";
import type { To } from "react-router-dom";
import { Link } from "remix";

import { OptimizedImage } from "./optimized-image";

export type ScrollingProductListProduct = {
  id: string;
  title: ReactNode;
  image: string;
  to: To;
};

function ScrollingProductItem({
  title,
  image,
  to,
  disabled,
}: {
  title: ReactNode;
  image: string;
  to: To;
  disabled?: boolean;
}) {
  return (
    <li className="relative lg:pr-12">
      <Link
        prefetch="intent"
        to={to}
        className="group block aspect-square w-screen max-w-sm overflow-hidden"
        tabIndex={disabled ? -1 : undefined}
      >
        <OptimizedImage
          loading="lazy"
          className="h-full w-full transform object-cover transition duration-500 motion-safe:group-hover:scale-105 motion-safe:group-focus:scale-105"
          src={image}
          alt=""
          width={480}
          height={480}
        />
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-end">
          <h1 className="inline-block py-2 px-4  text-xl font-semibold">{title}</h1>
        </div>
      </Link>
    </li>
  );
}

export function ScrollingProductList({
  variant = "primary",
  products,
}: {
  variant?: "primary" | "secondary";
  products: ScrollingProductListProduct[];
}) {
  let items = useMemo(
    () =>
      products
        .slice(0, 3)
        .map((product) => (
          <ScrollingProductItem key={product.id} image={product.image} title={product.title} to={product.to} />
        )),
    [products],
  );

  let itemsDisabled = useMemo(
    () =>
      products
        .slice(0, 3)
        .map((product) => (
          <ScrollingProductItem key={product.id} image={product.image} title={product.title} to={product.to} disabled />
        )),
    [products],
  );

  return (
    <section
      className={cn(
        "whitespace-no-wrap flex overflow-x-scroll border-t border-zinc-700 motion-safe:overflow-x-hidden",
        variant === "secondary" ? "bg-gray-50" : "",
      )}
    >
      <div className="relative">
        <ul className="flex motion-safe:animate-marquee">{items}</ul>
        <ul aria-hidden className="absolute top-0 flex motion-safe:animate-marquee2">
          {itemsDisabled}
        </ul>
      </div>
    </section>
  );
}
