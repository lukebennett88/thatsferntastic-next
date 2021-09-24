import * as React from 'react';

import { classNames } from '../../utils';
import { ErrorMessage } from '../error-message';

interface InputProps {
  autoComplete?: string;
  error?: string;
  label: string;
  name: string;
  type?:
    | 'date'
    | 'email'
    | 'hidden'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url';
  value?: string;
}

export const Input = React.forwardRef(
  (
    {
      autoComplete,
      error,
      label,
      name,
      type = 'text',
      value,
      ...inputProps
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          ref={ref}
          aria-invalid={Boolean(error)}
          type={type}
          name={name}
          id={name}
          autoComplete={autoComplete}
          value={value}
          {...inputProps}
          className={classNames(
            'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
            error && 'ring-1 ring-indigo-500 border-indigo-500'
          )}
        />
        <ErrorMessage error={error} />
      </>
    );
  }
);

Input.displayName = 'Input';
