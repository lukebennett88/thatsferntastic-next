import type { ChangeEventHandler } from "react";
import { Form, Link, useLoaderData, useLocation, useSubmit } from "remix";

import { CdpProductGridItem } from "~/components/cdp-product-grid-item";

import type { LoaderData } from "./cdp.server";

export default function CDP() {
  let { category, sort, categories, search, sortByOptions, products, hasNextPage, nextPageCursor } =
    useLoaderData<LoaderData>();
  let submit = useSubmit();
  let location = useLocation();

  let submitForm: ChangeEventHandler<HTMLSelectElement> = (event) => {
    submit((event.currentTarget || event.target).closest("form"));
  };

  return (
    <main className="grid-cols-12 gap-6 lg:grid">
      <nav className="col-span-2 hidden py-8 pl-6 lg:block">
        <h1 className="text-lg font-semibold">Categories</h1>
        <ul>
          {categories.map((cat) => (
            <li key={cat.slug} className={`mt-2 text-sm ${cat.slug !== category ? "text-gray-300" : ""}`}>
              <Link
                data-testid="category-link"
                aria-selected={cat.slug !== category}
                className="whitespace-nowrap hover:underline focus:underline"
                prefetch="intent"
                to={(() => {
                  let params = new URLSearchParams(location.search);
                  params.delete("cursor");
                  params.delete("q");
                  params.set("category", cat.slug);
                  params.sort();
                  return location.pathname + "?" + params.toString();
                })()}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="mt-8 text-lg font-semibold">Sort By</h1>
        <ul>
          {sortByOptions.map((sortBy) => (
            <li key={sortBy.value} className={`mt-2 text-sm ${sortBy.value !== sort ? "text-gray-300" : ""}`}>
              <Link
                data-testid="sort-by-link"
                aria-selected={sortBy.value !== sort}
                className="whitespace-nowrap hover:underline focus:underline"
                prefetch="intent"
                to={(() => {
                  let params = new URLSearchParams(location.search);
                  params.delete("cursor");
                  params.set("sort", sortBy.value);
                  return location.pathname + "?" + params.toString();
                })()}
              >
                {sortBy.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Form
        className="px-4 pt-4 lg:hidden"
        action={(() => {
          let params = new URLSearchParams(location.search);
          params.delete("category");
          params.delete("cursor");
          params.delete("q");
          let search = params.toString();
          search = search ? "?" + search : "";
          return location.pathname + search;
        })()}
      >
        <label>
          <span className="sr-only">Categories</span>
          <select
            data-testid="category-select"
            key={category}
            defaultValue={category}
            className="block w-full border border-zinc-700 p-2"
            onChange={submitForm}
            name="category"
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <noscript>
          <button className="mt-4 block border border-zinc-700 px-4 py-2">Update</button>
        </noscript>
      </Form>
      <Form
        className="border-b border-zinc-700 px-4 pb-2 lg:hidden"
        action={(() => {
          let params = new URLSearchParams(location.search);
          params.delete("cursor");
          params.delete("sort");
          let search = params.toString();
          search = search ? "?" + search : "";
          return location.pathname + search;
        })()}
      >
        <label>
          <span className="sr-only">Sort By</span>
          <select
            data-testid="sort-by-select"
            key={sort}
            defaultValue={sort}
            className="mt-4 block w-full border border-zinc-700 p-2"
            onChange={submitForm}
            name="sort"
          >
            {sortByOptions.map((sortBy) => (
              <option key={sortBy.value} value={sortBy.value}>
                {sortBy.label}
              </option>
            ))}
          </select>
        </label>
        <noscript>
          <button className="mt-4 block border border-zinc-700 px-4 py-2">Update</button>
        </noscript>
      </Form>

      <article className="col-span-10 col-start-3 mb-8 sm:px-4 lg:px-0 lg:pr-6">
        <p data-testid="search-results-label" className="mt-4 mb-8 pl-4">
          Showing {products.length} results
          {search ? ` for "${search}"` : ""}
        </p>
        <ul className="grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <CdpProductGridItem key={product.id} product={product} />
          ))}
        </ul>
        {hasNextPage && nextPageCursor && (
          <p className="mt-8">
            <Link
              className="text-lg font-semibold hover:underline focus:underline"
              to={(() => {
                let params = new URLSearchParams(location.search);
                params.set("cursor", nextPageCursor);
                return location.pathname + "?" + params.toString();
              })()}
            >
              Load more
            </Link>
          </p>
        )}
      </article>
    </main>
  );
}
