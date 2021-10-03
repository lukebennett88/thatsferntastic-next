import * as React from 'react';

function classNames(...classes: Array<string | unknown>): string {
  return classes.filter(Boolean).join(' ');
}

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Width = 'auto' | 'fixed' | 'full';

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

const widthClasses = (width: Width) => {
  switch (width) {
    case 'fixed':
      return 'max-w-xs w-full';
    case 'full':
      return 'w-full';
    case 'auto':
    default:
      break;
  }
};

interface ButtonProps {
  as?: React.ElementType<any>;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (args?: any) => any;
  size?: Size;
  type?: 'button' | 'submit' | 'reset';
  width?: Width;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      as: Tag = 'button',
      children,
      disabled,
      onClick,
      size = 'lg',
      width = 'auto',
      ...rest
    },
    ref
  ) => {
    return (
      <Tag
        ref={ref}
        className={classNames(
          sizeClasses(size),
          widthClasses(width),
          disabled && 'cursor-not-allowed text-gray-700 bg-gray-200',
          !disabled && 'hover:text-pink-600 hover:bg-pink-100',
          !disabled && 'text-pink-700 bg-pink-200',
          'inline-block font-medium font-mono border border-transparent rounded-full transition duration-300 ease-in-out transform-gpu',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
        )}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

Button.displayName = 'Button';
