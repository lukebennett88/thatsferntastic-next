const collections = [
  {
    name: 'Handcrafted Collection',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
    imageAlt:
      'Brown leather key ring with brass metal loops and rivets on wood table.',
    description:
      'Keep your phone, keys, and wallet together, so you can lose everything at once.',
  },
  {
    name: 'Organized Desk Collection',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg',
    imageAlt:
      'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
    description:
      'The rest of the house will still be a mess, but your desk will look great.',
  },
  {
    name: 'Focus Collection',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg',
    imageAlt:
      'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
    description:
      'Be more productive than enterprise project managers with a single piece of paper.',
  },
];

export function CollectionSection(): JSX.Element {
  return (
    <section
      aria-labelledby="collection-heading"
      className="max-w-xl px-4 pt-24 mx-auto sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2
        id="collection-heading"
        className="text-2xl font-extrabold tracking-tight text-gray-900"
      >
        Shop by Collection
      </h2>
      <p className="mt-4 text-base text-gray-500">
        Each season, we collaborate with world-class designers to create a
        collection inspired by the natural world.
      </p>

      <div className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {collections.map(collection => (
          <a
            key={collection.name}
            href={collection.href}
            className="block group"
          >
            <div
              aria-hidden="true"
              className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2 group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={collection.imageSrc}
                alt={collection.imageAlt}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              {collection.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {collection.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
