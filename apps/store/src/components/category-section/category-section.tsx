import NextLink from "next/link";

const categories = [
  {
    name: "New Arrivals",
    href: "#",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg",
  },
  {
    name: "Productivity",
    href: "#",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg",
  },
  {
    name: "Workspace",
    href: "#",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg",
  },
  {
    name: "Accessories",
    href: "#",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg",
  },
  {
    name: "Sale",
    href: "#",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg",
  },
];

export function CategorySection(): JSX.Element {
  return (
    <section aria-labelledby="category-heading" className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 id="category-heading" className="font-mono text-2xl tracking-tight text-pink-600">
          Shop by Category
        </h2>
        <NextLink href="/collections">
          <a className="hidden text-sm font-semibold text-pink-600 hover:text-pink-500 sm:block">
            Browse all categories<span aria-hidden="true"> &rarr;</span>
          </a>
        </NextLink>
      </div>

      <div className="mt-4 flow-root">
        <div className="-my-2">
          <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
            <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                >
                  <span aria-hidden="true" className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={category.imageSrc} alt="" className="h-full w-full object-cover object-center" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                  />
                  <span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-4 sm:hidden">
        {/* TODO: update this link */}
        <NextLink href="/collections">
          <a className="block text-sm font-semibold text-pink-600 hover:text-pink-500">
            Browse all categories<span aria-hidden="true"> &rarr;</span>
          </a>
        </NextLink>
      </div>
    </section>
  );
}
