import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { classNames } from "@thatsferntastic/utils";
import * as React from "react";

import { Product } from "../../graphql/get-product-by-handle";

type Variant = NonNullable<Product>["variants"]["edges"][number];

interface VariantSelectProps<T> {
  index: number;
  handleOptionChange: (value: string, index: number) => void;
  name: string;
  values: readonly T[];
  variant: Variant;
}

export function VariantSelect({
  index,
  handleOptionChange,
  name,
  values,
  variant,
}: VariantSelectProps<string>): JSX.Element {
  const onChange = (value: string) => {
    return handleOptionChange(value, index);
  };
  return (
    <Listbox value={variant.node.title} onChange={onChange}>
      <Listbox.Label className="block text-sm font-medium text-gray-700">{name}</Listbox.Label>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default group focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm">
          <span className="block truncate">{variant.node.title}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="w-5 h-5 text-gray-400 group-focus:text-pink-500" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {values.map((value) => (
              <Listbox.Option
                key={`${name}-${value}`}
                className={({ active }) =>
                  classNames(
                    active ? "text-pink-700 bg-pink-200" : "text-gray-900 bg-white",
                    "cursor-default select-none relative py-2 pl-8 pr-4",
                  )
                }
                value={value}
              >
                {({ selected, active }) => (
                  <>
                    <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                      {value}
                    </span>

                    {selected ? (
                      <span
                        className={classNames(
                          active ? "text-pink-700" : "text-pink-600",
                          "absolute inset-y-0 left-0 flex items-center pl-1.5",
                        )}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
