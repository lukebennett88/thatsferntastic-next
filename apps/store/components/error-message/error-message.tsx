import * as React from 'react';

interface ErrorMessageProps {
  error?: string;
}

export function ErrorMessage({ error }: ErrorMessageProps): JSX.Element | null {
  if (!error) return null;
  return (
    <p aria-live="polite" className="block text-sm font-medium text-indigo-700">
      {error}
    </p>
  );
}
