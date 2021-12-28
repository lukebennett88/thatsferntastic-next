import { PlusSmIcon } from "@heroicons/react/solid";
import { classNames } from "@thatsferntastic/utils";
import NextLink from "next/link";
import * as React from "react";

import type { Products, SortKey } from "../../graphql/get-products";

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "All New Arrivals" },
      { value: "tees", label: "Tees" },
      { value: "crewnecks", label: "Crewnecks" },
      { value: "sweatshirts", label: "Sweatshirts" },
      { value: "pants-shorts", label: "Pants & Shorts" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "2xl", label: "2XL" },
    ],
  },
];

interface FilterOptionProps {
  label: string;
  name: string;
  value: string;
}

function FilterOption({ label, name, value }: FilterOptionProps) {
  return (
    <div className="flex items-center">
      <input
        id={value}
        name={name}
        defaultValue={value}
        type="checkbox"
        className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
      />
      <label htmlFor={value} className="ml-3 text-sm text-gray-600">
        {label}
      </label>
    </div>
  );
}

interface FilterOptionGroupProps {
  hasPaddingTop?: boolean;
  name: string;
  children: React.ReactNode;
}

function FilterOptionGroup({ hasPaddingTop, name, children }: FilterOptionGroupProps) {
  return (
    <div className={classNames(hasPaddingTop && "pt-10")}>
      <fieldset>
        <legend className="block text-sm font-medium text-gray-900">{name}</legend>
        <div className="pt-6 space-y-3">{children}</div>
      </fieldset>
    </div>
  );
}

interface SortLinkProps {
  sortKey: SortKey;
  label: string;
  reverse?: boolean;
}

function SortLink({ sortKey, label, reverse }: SortLinkProps): JSX.Element {
  return (
    <li>
      <NextLink href={`/products?sortKey=${sortKey}${reverse ? `&reverse=true` : ""}`}>
        <a className="text-sm text-gray-600">{label}</a>
      </NextLink>
    </li>
  );
}

interface DesktopProductFiltersProps {
  products?: Products;
  setMobileFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DesktopProductFilters({ setMobileFiltersOpen }: DesktopProductFiltersProps): JSX.Element {
  return (
    <aside>
      <h2 className="sr-only">Filters</h2>
      <button type="button" className="inline-flex items-center lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
        <span className="text-sm font-medium text-gray-700">Filters</span>
        <PlusSmIcon className="flex-shrink-0 w-5 h-5 ml-1 text-gray-400" aria-hidden="true" />
      </button>
      <div className="hidden lg:block">
        <form className="space-y-10 divide-y divide-gray-200">
          <FilterOptionGroup name="Relevance">
            <ul className="space-y-3">
              <SortLink label="Trending" sortKey="BEST_SELLING" />
              <SortLink label="New arrivals" sortKey="CREATED_AT" reverse />
              <SortLink label="Price: Low to high" sortKey="PRICE" />
              <SortLink label="Price: High to low" sortKey="PRICE" reverse />
            </ul>
          </FilterOptionGroup>
          {filters.map(({ name, options }) => (
            <FilterOptionGroup key={name} hasPaddingTop name={name}>
              {options.map(({ label, value }) => (
                <FilterOption key={value} label={label} name={label} value={value} />
              ))}
            </FilterOptionGroup>
          ))}
        </form>
      </div>
    </aside>
  );
}
