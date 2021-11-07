import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import * as React from 'react';

interface QuantityPickerProps {
  available: number | null;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export function QuantityPicker({
  available,
  quantity,
  setQuantity,
}: QuantityPickerProps): JSX.Element {
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
      <span className="relative z-0 inline-flex mt-1 rounded-md shadow-sm">
        <button
          type="button"
          onClick={decrement}
          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
        >
          <span className="sr-only">Decrement</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500">
          {quantity}
        </span>
        <button
          type="button"
          onClick={increment}
          className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
        >
          <span className="sr-only">Increment</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}
