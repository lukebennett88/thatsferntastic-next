import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import * as React from "react";

interface QuantityPickerProps {
  available: number | null;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export function QuantityPicker({ available, quantity, setQuantity }: QuantityPickerProps): JSX.Element {
  const increment = () => {
    setQuantity((prev) => {
      if (available) {
        if (available > prev) return prev + 1;
        return available;
      }
      return prev;
    });
  };

  const decrement = () => {
    setQuantity((prev) => {
      if (prev > 1) return prev - 1;
      return prev;
    });
  };

  return (
    <div className="mt-6">
      <div className="block text-sm font-medium text-gray-700">Quantity</div>
      <span className="relative z-0 mt-1 inline-flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={decrement}
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
        >
          <span className="sr-only">Decrement</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <span className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500">
          {quantity}
        </span>
        <button
          type="button"
          onClick={increment}
          className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
        >
          <span className="sr-only">Increment</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}
