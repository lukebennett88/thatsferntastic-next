import { Button } from '@thatsferntastic/button';
import NextLink from 'next/link';

import { ShopifyImage } from '../shopify-image';

export function Hero(): JSX.Element {
  return (
    <div className="relative">
      <ShopifyImage
        src="/bees.jpg"
        alt=""
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="relative flex flex-1 bg-gray-900 bg-opacity-60">
        <div className="relative flex flex-col items-center max-w-3xl px-6 py-32 mx-auto text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
            Bees!
          </h1>
          <p className="mt-4 text-xl text-white">
            New pencil cases, mini pouches, keyfobs, scrunchies and planner
            charms! Everything limited stock so get in early 🐝🌻
          </p>
          <div className="mt-8">
            <NextLink href="/products?sortKey=CREATED_AT&reverse=true" passHref>
              <Button as="a" size="xl">
                Shop New Arrivals
              </Button>
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
