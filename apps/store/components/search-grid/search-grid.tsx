import { SearchIcon } from '@heroicons/react/outline';
import * as React from 'react';

import { slugify } from '../../utils';

interface SearchGridProps {
  children: React.ReactNode;
  heading?: string;
}

export function SearchGrid({
  children,
  heading,
}: SearchGridProps): JSX.Element {
  return (
    <div className="divide-y divide-gray-200">
      {heading ? (
        <h3 className="pb-6 mt-10 text-lg font-medium leading-6 text-gray-900">
          {heading}
        </h3>
      ) : null}
      <div>
        <ul className="divide-y divide-gray-200">{children}</ul>
      </div>
    </div>
  );
}

interface SearchInputProps {
  label: string;
}

function SearchInput({ label }: SearchInputProps): JSX.Element {
  const inputId = slugify(label);
  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="flex mt-1 rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            name={inputId}
            id={inputId}
            className="block w-full border-gray-300 rounded-none focus:ring-pink-500 focus:border-pink-500 rounded-l-md sm:text-sm"
          />
        </div>
        <button
          type="button"
          className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
        >
          <SearchIcon aria-hidden="true" className="w-5 h-5 text-gray-400" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}

interface SearchGridItemProps {
  heading: string;
  children: React.ReactNode;
}

function SearchGridItem({ heading, children }: SearchGridItemProps) {
  return (
    <li className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
      <h4 className="text-sm font-semibold leading-6 text-gray-900 uppercase sm:col-start-1 sm:col-end-4">
        {heading}
      </h4>
      {children}
    </li>
  );
}

SearchGrid.Item = SearchGridItem;
SearchGrid.Input = SearchInput;
