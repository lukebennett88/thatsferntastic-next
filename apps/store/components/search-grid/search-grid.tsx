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
        <h3 className="text-lg mt-10 pb-6 leading-6 font-medium text-gray-900">
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
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            name={inputId}
            id={inputId}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
          />
        </div>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
      <h4 className="text-sm leading-6 font-semibold text-gray-900 uppercase sm:col-start-1 sm:col-end-4">
        {heading}
      </h4>
      {children}
    </li>
  );
}

SearchGrid.Item = SearchGridItem;
SearchGrid.Input = SearchInput;
