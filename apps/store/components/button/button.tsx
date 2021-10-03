import * as React from 'react';

import { buttonClasses, Size, Width } from '../../utils/hooks/button-styles';

interface ButtonProps {
  as?: React.ElementType<any>;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (args?: any) => any;
  rel?: string;
  size?: Size;
  target?: '_self' | '_blank' | '_parent' | '_top';
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
        className={buttonClasses({ size, width, disabled: disabled })}
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
