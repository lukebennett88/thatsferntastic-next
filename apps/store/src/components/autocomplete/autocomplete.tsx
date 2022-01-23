import { AutocompleteOptions, AutocompleteState, createAutocomplete } from "@algolia/autocomplete-core";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { getAlgoliaResults, parseAlgoliaHitHighlight } from "@algolia/autocomplete-preset-algolia";
import type { Hit } from "@algolia/client-search";
import { ChevronRightIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { classNames } from "@thatsferntastic/utils";
import router from "next/router";
import * as React from "react";

import { algoliaClient } from "../../utils/algolia-client";
import { InternalLink } from "../internal-link";
import { ShopifyImage } from "../shopify-image";

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

interface SearchResultItemProps {
  item: AutocompleteProduct;
  itemProps: {
    "id": string;
    "role": string;
    "aria-selected": boolean;
    onMouseMove(event: React.MouseEvent<Element, MouseEvent>): void;
    onMouseDown(event: React.MouseEvent<Element, MouseEvent>): void;
    onClick(event: React.MouseEvent<Element, MouseEvent>): void;
  };
  isFirst: boolean;
  isLast: boolean;
}

function SearchResultItem({ item, itemProps, isFirst, isLast }: SearchResultItemProps) {
  return (
    <li {...itemProps} className="overflow-hidden">
      <InternalLink
        href={`/products/${item.handle}`}
        onClick={close}
        className={classNames(
          isFirst && "rounded-t-md",
          isLast && "rounded-b-md",
          itemProps["aria-selected"] &&
            "bg-gray-50 outline-none ring-inset ring-2 ring-offset-2 ring-offset-pink-600 ring-white border-white",
          "block border-2 border-transparent",
          "hover:bg-gray-50",
          "focus:outline-none focus:ring-inset focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-600 focus:ring-white focus:border-white",
        )}
      >
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex items-start flex-1 min-w-0">
            <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded">
              <ShopifyImage
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
                  <Highlight hit={item} attribute="title" />
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <p title={item.description} className="truncate">
                    <Highlight hit={item} attribute="description" />
                  </p>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <p className="truncate">
                    By{" "}
                    <strong className="font-semibold">
                      <Highlight hit={item} attribute="vendor" />
                    </strong>{" "}
                    in{" "}
                    <strong className="font-semibold">
                      <Highlight hit={item} attribute="productType" />
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </InternalLink>
    </li>
  );
}

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: "thatsferntastic:search",
  limit: 3,
});

export function Autocomplete(props: Partial<AutocompleteOptions<AutocompleteProduct>>): JSX.Element {
  const [autocompleteState, setAutocompleteState] = React.useState<AutocompleteState<AutocompleteProduct>>({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: "",
    activeItemId: null,
    status: "idle",
  });

  const autocomplete = React.useMemo(
    () =>
      createAutocomplete<AutocompleteProduct, React.BaseSyntheticEvent, React.MouseEvent, React.KeyboardEvent>({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: "products",
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient: algoliaClient,
                  queries: [
                    {
                      indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!,
                      query,
                      params: {
                        hitsPerPage: 10,
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
        navigator: {
          navigate({ itemUrl }) {
            formRef.current?.reset();
            router.push(itemUrl);
          },
        },
        plugins: [recentSearchesPlugin],
        ...props,
      }),
    [props],
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

    addEventListener("touchstart", onTouchStart);
    addEventListener("touchmove", onTouchMove);

    return () => {
      removeEventListener("touchstart", onTouchStart);
      removeEventListener("touchmove", onTouchMove);
    };
  }, [getEnvironmentProps, formRef, inputRef, panelRef]);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const labelProps = autocomplete.getLabelProps();
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
    placeholder: "Search",
  });
  const panelProps = autocomplete.getPanelProps();

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        !autocompleteState.isOpen &&
        // The `Cmd+K` shortcut focuses search input
        event.key === "k" &&
        (event.metaKey || event.ctrlKey)
      ) {
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [autocompleteState.isOpen]);

  return (
    <div className="relative w-full divide-y" {...autocomplete.getRootProps()}>
      <form ref={formRef} {...formProps}>
        <label className="sr-only" {...labelProps}>
          Search
        </label>
        <div className="relative text-gray-400 focus-within:text-gray-600">
          <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
            <SearchIcon className="w-5 h-5" aria-hidden="true" />
          </div>
          <input
            ref={inputRef}
            {...inputProps}
            className={classNames(
              "block w-full px-10 py-2 leading-5 text-gray-900 placeholder-gray-500 bg-white border-transparent rounded-full",
              "sm:text-sm",
              "focus:outline-none focus:border-transparent focus:ring-0",
            )}
            placeholder="Search products"
            type="text"
          />
          <div className="absolute inset-y-0 flex items-center right-3">
            {inputRef.current?.value !== "" ? (
              <button
                type="reset"
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
              >
                <span className="sr-only">Clear search results</span>
                <XIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </form>
      {autocompleteState.isOpen ? (
        <div
          ref={panelRef}
          className="absolute mt-3 overflow-hidden -translate-y-px bg-white rounded-lg shadow-lg full-bleed"
          {...panelProps}
        >
          <div className="overflow-y-auto max-h-96">
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;
              return (
                <section key={`source-${index}`}>
                  {items.length > 0 && (
                    <ul className="divide-y divide-gray-200" {...autocomplete.getListProps()}>
                      {items.map((item, index) => {
                        const itemProps = autocomplete.getItemProps({
                          item,
                          source,
                        });
                        return (
                          <SearchResultItem
                            key={item.objectID}
                            item={item}
                            itemProps={itemProps}
                            isFirst={index === 0}
                            isLast={index === items.length - 1}
                          />
                        );
                      })}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
