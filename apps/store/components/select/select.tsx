import * as React from 'react';

import { ErrorMessage } from '../error-message';

interface SelectProps {
  autoComplete?: string;
  children: React.ReactNode;
  defaultValue?: string;
  error?: string;
  label: string;
  name: string;
}

export const Select = React.forwardRef(
  (
    {
      autoComplete,
      children,
      defaultValue,
      error,
      label,
      name,
      ...selectProps
    }: SelectProps,
    ref: React.ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <select
          {...selectProps}
          ref={ref}
          id={name}
          name={name}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        >
          {children}
        </select>
        <ErrorMessage error={error} />
      </>
    );
  }
);

Select.displayName = 'Select';
