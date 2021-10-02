import * as React from 'react';

// AnyTag is anything that a JSX tag can be.
type AnyTag =
  | string
  | React.FunctionComponent<never>
  | (new (props: never) => React.Component);

// PropsOf tries to get the expected properties for a given HTML tag name or component.
type PropsOf<Tag> = Tag extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[Tag]
  : Tag extends React.ComponentType<infer Props>
  ? Props & JSX.IntrinsicAttributes
  : never;

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
  onClick?: (args?: any[]) => any;
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
      onClick,
      size = 'md',
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
          'inline-block font-medium font-mono text-pink-700 bg-pink-200 border border-transparent rounded-full shadow-sm transition duration-300 ease-in-out transform-gpu',
          'hover:text-pink-600 hover:bg-pink-100 hover:shadow-lg hover:-translate-y-0.5',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
        )}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

Button.displayName = 'Button';
