import { formatPrice } from '@thatsferntastic/utils';
import NextImage from 'next/image';

import type { Products } from '../../graphql/get-products';

interface ProductCardProps {
  product: Products[number]['node'];
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  const image = product.images.edges[0]?.node;
  return (
    <div className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group">
      <div className="relative">
        <div className="bg-gray-200 aspect-w-3 aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-96 sm:flex">
          {image.transformedSrc ? (
            <NextImage
              src={image.transformedSrc}
              alt={image.altText || ''}
              height={400}
              width={400}
              className="object-cover object-center w-full h-full sm:w-full sm:h-full"
            />
          ) : (
            <div
              style={{ position: 'absolute', inset: 0 }}
              className="flex items-center justify-center"
            >
              Image not found
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900">
          <a href={`/products/${product.handle}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </a>
        </h3>
        <p className="text-base font-medium text-gray-900">
          {formatPrice(Number(product.priceRange.minVariantPrice.amount))}
        </p>
      </div>
    </div>
  );
}
