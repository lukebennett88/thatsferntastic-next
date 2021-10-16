import { Button } from '@thatsferntastic/button';
import Link from 'next/link';

export function Hero(): JSX.Element {
  return (
    <div className="relative">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bees.jpg"
          alt=""
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-60"
      />
      <div className="relative flex flex-col items-center max-w-3xl px-6 py-32 mx-auto text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
          Bees!
        </h1>
        <p className="mt-4 text-xl text-white">
          New pencil cases, mini pouches, keyfobs, scrunchies and planner
          charms! Everything limited stock so get in early 🐝🌻
        </p>
        <div className="mt-8">
          <Link href="/collections" passHref>
            <Button as="a" size="xl">
              Shop New Arrivals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
