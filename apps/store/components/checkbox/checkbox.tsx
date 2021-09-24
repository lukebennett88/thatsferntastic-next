import * as React from 'react';

import { ErrorMessage } from '../error-message';

interface CheckboxProps {
  autoComplete?: string;
  error?: string;
  label: string;
  name: string;
}

export const Checkbox = React.forwardRef(
  (
    { error, label, name, ...selectProps }: CheckboxProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <div className="relative flex items-start py-4">
          <div className="flex items-center h-5">
            <input
              {...selectProps}
              ref={ref}
              id={name}
              name={name}
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="min-w-0 text-sm ml-3">
            <label
              htmlFor={name}
              className="font-medium text-gray-700 select-none"
            >
              {label}
            </label>
          </div>
        </div>
        <ErrorMessage error={error} />
      </>
    );
  }
);

Checkbox.displayName = 'Checkbox';
