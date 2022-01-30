import { useId } from "@reach/auto-id";
import type { To } from "react-router-dom";
import { Link } from "remix";

import { OptimizedImage } from "~/components/optimized-image";

export type CdpGridItemProduct = {
  id: string;
  title: string;
  formattedPrice: string;
  image: string;
  to: To;
  defaultVariantId: string;
};

export function CdpProductGridItem({ product }: { product: CdpGridItemProduct }) {
  let id = `three-product-grid-item-${useId()}`;

  return (
    <li>
      <div className="group relative block aspect-square overflow-hidden bg-zinc-800">
        <Link className="group block" prefetch="intent" to={product.to} aria-labelledby={id}>
          <OptimizedImage
            className="h-full w-full transform object-cover transition duration-500 motion-safe:group-hover:scale-110 motion-safe:group-focus:scale-110"
            src={product.image}
            width={480}
            height={480}
            responsive={[
              {
                size: {
                  height: 480,
                  width: 480,
                },
              },
              {
                size: {
                  height: 600,
                  width: 600,
                },
              },
            ]}
            alt=""
          />
        </Link>
        <div className="absolute top-0 left-0 right-0">
          <div className="flex">
            <Link prefetch="intent" to={product.to} className="group-tpgi block flex-1" tabIndex={-1} id={id}>
              <h1 className="inline-block px-4 py-2 text-2xl font-semibold">{product.title}</h1>
              <br />
              <p className="inline-block px-4 py-2 text-sm ">{product.formattedPrice}</p>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
