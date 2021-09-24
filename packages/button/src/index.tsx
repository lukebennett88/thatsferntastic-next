import * as React from 'react';

function classNames(...classes: Array<string | unknown>): string {
  return classes.filter(Boolean).join(' ');
}

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses = (size: Size) => {
  switch (size) {
    case 'xs':
      return 'px-3 py-1.5 text-xs';
    case 'sm':
      return 'px-3.5 py-2 text-sm leading-4';
    case 'md':
      return 'px-4 py-2 text-sm';
    case 'lg':
      return 'px-5 py-2 text-base';
    case 'xl':
      return 'px-6 py-3 text-base';
    default:
      break;
  }
};

interface ButtonProps {
  as: string | React.ComponentType<any>;
  size: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ as: Tag = 'button', children, size = 'md', ...rest }, ref) => {
    return (
      <Tag
        {...rest}
        ref={ref}
        type={Tag === 'button' && 'button'}
        className={classNames(
          sizeClasses(size),
          'font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm',
          'hover:bg-indigo-700',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        )}
      >
        <button></button>
        {children}
      </Tag>
    );
  }
);

Button.displayName = 'Button';
