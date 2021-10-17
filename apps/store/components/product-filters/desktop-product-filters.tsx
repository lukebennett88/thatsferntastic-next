import { PlusSmIcon } from '@heroicons/react/solid';
import { classNames } from '@thatsferntastic/utils';
import * as React from 'react';

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals' },
      { value: 'tees', label: 'Tees' },
      { value: 'crewnecks', label: 'Crewnecks' },
      { value: 'sweatshirts', label: 'Sweatshirts' },
      { value: 'pants-shorts', label: 'Pants & Shorts' },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: '2xl', label: '2XL' },
    ],
  },
];

interface DesktopProductFiltersProps {
  setMobileFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DesktopProductFilters({
  setMobileFiltersOpen,
}: DesktopProductFiltersProps): JSX.Element {
  return (
    <aside>
      <h2 className="sr-only">Filters</h2>

      <button
        type="button"
        className="inline-flex items-center lg:hidden"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="text-sm font-medium text-gray-700">Filters</span>
        <PlusSmIcon
          className="flex-shrink-0 w-5 h-5 ml-1 text-gray-400"
          aria-hidden="true"
        />
      </button>

      <div className="hidden lg:block">
        <form className="space-y-10 divide-y divide-gray-200">
          {filters.map((section, sectionIdx) => (
            <div
              key={section.name}
              className={classNames(sectionIdx !== 0 && 'pt-10')}
            >
              <fieldset>
                <legend className="block text-sm font-medium text-gray-900">
                  {section.name}
                </legend>
                <div className="pt-6 space-y-3">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <label
                        htmlFor={`${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          ))}
        </form>
      </div>
    </aside>
  );
}
