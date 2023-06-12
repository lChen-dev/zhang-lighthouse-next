/* eslint-disable react/jsx-props-no-spreading */
import React, { AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

import { H5 } from '@components/shared/Typography';

type BtnType = { color: string; bgColor: string; hoverColor?: string; bgHoverColor?: string };
type BtnVariant = 'primary' | 'primary-light' | 'light' | 'white';
const variants: { [key in BtnVariant]: BtnType } = {
  primary: {
    color: 'text-white',
    bgColor: 'bg-brand',
    bgHoverColor: 'hover:bg-brand-darker',
  },
  'primary-light': {
    color: 'text-brand',
    bgColor: 'bg-brand-light',
    bgHoverColor: 'hover:bg-brand-light-darker',
  },
  light: {
    color: 'text-gray-blue',
    bgColor: 'bg-offwhite',
    bgHoverColor: 'hover:bg-gray-lighter',
  },
  white: {
    color: 'text-gray-soft',
    hoverColor: 'hover:text-gray-blue',
    bgColor: 'bg-white',
    bgHoverColor: 'hover:bg-white',
  },
};

interface Props extends AnchorHTMLAttributes<any> {
  children?: React.ReactNode;
  icon?: React.ComponentType<any>;
  iconPos?: 'left' | 'right';
  variant?: BtnVariant;
  disabled?: boolean;
}

const ButtonCta: React.FC<Props> = ({
  children,
  icon: Icon,
  iconPos,
  type,
  className,
  variant,
  disabled,
  onClick,
  ...props
}: Props) => {
  const { color, bgColor, hoverColor, bgHoverColor } = variants[variant ?? 'primary'];
  return (
    <a
      {...props}
      role="button"
      onClick={disabled ? () => null : onClick}
      aria-disabled={disabled}
      className={classNames(
        className,
        'py-4 px-6 rounded flex flex-row items-center',
        color,
        disabled ? 'bg-gray-soft cursor-not-allowed' : `${bgColor} ${hoverColor} ${bgHoverColor} cursor-pointer`,
      )}>
      {Icon && iconPos === 'left' && <Icon />}
      <H5
        color={color}
        className={classNames({
          'ml-4': Icon && iconPos === 'left',
          'mr-4': Icon && iconPos === 'right',
        })}>
        {children}
      </H5>
      {Icon && iconPos === 'right' && <Icon />}
    </a>
  );
};

ButtonCta.defaultProps = {
  iconPos: 'right',
  variant: 'primary',
};

export default ButtonCta;
