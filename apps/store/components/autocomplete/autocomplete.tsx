import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { parseAlgoliaHitHighlight } from '@algolia/autocomplete-preset-algolia';
import type { Hit } from '@algolia/client-search';
import { ChevronRightIcon, SearchIcon, XIcon } from '@heroicons/react/outline';
import { classNames } from '@thatsferntastic/utils';
import NextImage from 'next/image';
import NextLink from 'next/link';
import * as React from 'react';

import { algoliaClient } from '../../utils/algolia-client';

type AutocompleteProduct = Hit<{
  availableForSale: boolean;
  createdAt: string;
  description: string;
  handle: string;
  image: {
    originalSrc: string;
  };
  productType: string;
  tags: string[];
  title: string;
  vendor: string;
  objectID: string;
}>;

function Highlight({
  hit,
  attribute,
}: {
  hit: AutocompleteProduct;
  attribute: keyof AutocompleteProduct;
}): JSX.Element {
  return (
    <>
      {parseAlgoliaHitHighlight({
        hit,
        attribute,
      }).map(({ value, isHighlighted }, index) => {
        if (isHighlighted) {
          return (
            <mark key={index} className="text-pink-700 bg-pink-100">
              {value}
            </mark>
          );
        }

        return <React.Fragment key={index}>{value}</React.Fragment>;
      })}
    </>
  );
}

export function Autocomplete(
  props: Partial<AutocompleteOptions<AutocompleteProduct>>
): JSX.Element {
  const [autocompleteState, setAutocompleteState] = React.useState<
    AutocompleteState<AutocompleteProduct>
  >({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',
    activeItemId: null,
    status: 'idle',
  });

  const autocomplete = React.useMemo(
    () =>
      createAutocomplete<
        AutocompleteProduct,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: 'products',
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient: algoliaClient,
                  queries: [
                    {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!,
                      query,
                      params: {
                        hitsPerPage: 5,
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return `/products/${item.handle}`;
              },
            },
          ];
        },
        ...props,
      }),
    [props]
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const { getEnvironmentProps } = autocomplete;

  React.useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    const { onTouchStart, onTouchMove } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    addEventListener('touchstart', onTouchStart);
    addEventListener('touchmove', onTouchMove);

    return () => {
      removeEventListener('touchstart', onTouchStart);
      removeEventListener('touchmove', onTouchMove);
    };
  }, [getEnvironmentProps, formRef, inputRef, panelRef]);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const labelProps = autocomplete.getLabelProps({});
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
    placeholder: 'Search',
  });
  const panelProps = autocomplete.getPanelProps({});

  return (
    <div className="relative" {...autocomplete.getRootProps({})}>
      <form ref={formRef} {...formProps}>
        <label className="sr-only" {...labelProps}>
          Search
        </label>
        <div className="relative text-gray-400 focus-within:text-gray-600">
          <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none">
            <button
              type="submit"
              title="Submit"
              className={classNames(
                'rounded-md pointer-events-auto p-1 -ml-1',
                'focus:outline-none focus:ring-2 focus:ring-pink-600'
              )}
            >
              <SearchIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <input
            className="block w-full px-10 py-2 leading-5 text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-600 focus:ring-white focus:border-white sm:text-sm"
            ref={inputRef}
            {...inputProps}
            type="text"
          />
          {autocompleteState.query ? (
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <button
                type="reset"
                title="Clear"
                className={classNames(
                  'rounded-md pointer-events-auto p-1 -mr-1',
                  'focus:outline-none focus:ring-2 focus:ring-pink-600'
                )}
              >
                <XIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </form>

      {autocompleteState.isOpen ? (
        <div
          ref={panelRef}
          className={classNames(
            'absolute mt-3 overflow-hidden bg-white shadow',
            'sm:mt-6 sm:w-96 sm:rounded-md',
            /**
             * Full bleed from up until `sm`
             * @see https://piccalil.li/tutorial/creating-a-full-bleed-css-utility/
             */
            'w-screen ml-[calc(50%-50vw)]',
            /**
             * Reset full bleed for `sm` and above
             * */
            'sm:w-[calc(100%+8rem)] sm:-ml-16 sm:translate-x-0'
          )}
          {...panelProps}
        >
          {autocompleteState.collections.map((collection, index) => {
            console.log(collection);
            const { source, items } = collection;
            return (
              <section key={`source-${index}`}>
                {items.length > 0 && (
                  <ul
                    className="divide-y divide-gray-200"
                    {...autocomplete.getListProps()}
                  >
                    {items.map((item, index) => {
                      const itemProps = autocomplete.getItemProps({
                        item,
                        source,
                      });
                      return (
                        <li key={item.objectID} {...itemProps}>
                          <NextLink href={`/products/${item.handle}`}>
                            <a
                              className={classNames(
                                index === 0 && 'rounded-t-md',
                                index === items.length - 1 && 'rounded-b-md',
                                itemProps['aria-selected'] &&
                                  'bg-gray-50 outline-none ring-inset ring-2 ring-offset-2 ring-offset-pink-600 ring-white border-white',
                                'block border-2 border-transparent',
                                'hover:bg-gray-50',
                                'focus:outline-none focus:ring-inset focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-600 focus:ring-white focus:border-white'
                              )}
                            >
                              <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="flex items-center flex-1 min-w-0">
                                  <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded">
                                    <NextImage
                                      className="object-contain w-12 h-12"
                                      src={item.image.originalSrc}
                                      height={48}
                                      width={48}
                                      alt=""
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0 px-4">
                                    <div>
                                      <p className="text-sm font-medium text-pink-700 truncate">
                                        <Highlight
                                          hit={item}
                                          attribute="title"
                                        />
                                      </p>
                                      <div className="flex items-center mt-2 text-sm text-gray-500">
                                        <p
                                          title={item.description}
                                          className="truncate"
                                        >
                                          <Highlight
                                            hit={item}
                                            attribute="description"
                                          />
                                        </p>
                                      </div>
                                      <div className="flex items-center mt-2 text-sm text-gray-500">
                                        <p className="truncate">
                                          By{' '}
                                          <strong className="font-semibold">
                                            <Highlight
                                              hit={item}
                                              attribute="vendor"
                                            />
                                          </strong>{' '}
                                          in{' '}
                                          <strong className="font-semibold">
                                            <Highlight
                                              hit={item}
                                              attribute="productType"
                                            />
                                          </strong>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <ChevronRightIcon
                                    className="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                            </a>
                          </NextLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
