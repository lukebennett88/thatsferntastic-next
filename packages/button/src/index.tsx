import { classNames } from '@thatsferntastic/utils';
import * as React from 'react';

import type {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
  WithDisplayName,
} from '../../polymorphic/src';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Width = 'auto' | 'fixed' | 'full';

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

interface ButtonClasses {
  size?: Size;
  width?: Width;
  disabled?: boolean;
}

export function buttonClasses({
  size = 'lg',
  width = 'auto',
  disabled,
}: ButtonClasses = {}): string {
  return classNames(
    sizeClasses(size),
    widthClasses(width),
    disabled && 'cursor-not-allowed text-gray-700 bg-gray-200',
    !disabled && 'hover:text-pink-600 hover:bg-pink-100',
    !disabled && 'text-pink-700 bg-pink-200',
    'inline-flex items-center justify-center font-medium font-mono border border-transparent rounded-full text-center transition duration-300 ease-in-out transform-gpu',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
  );
}
interface ButtonProps {
  children: React.ReactNode;
  size?: Size;
  width?: Width;
}

type PolymorphicButtonProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, ButtonProps>;

type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: PolymorphicButtonProps<C>
) => React.ReactElement | null;

type ButtonComponentWithDisplayName = ButtonComponent & WithDisplayName;

export const Button: ButtonComponentWithDisplayName = React.forwardRef(
  <C extends React.ElementType = 'button'>(
    { as, children, size, width, disabled, ...rest }: PolymorphicButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button';

    return (
      <Component
        ref={ref}
        className={buttonClasses({ size, width, disabled })}
        disabled={disabled}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';
