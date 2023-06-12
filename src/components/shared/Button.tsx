import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface Props extends ButtonHTMLAttributes<any> {
  iconLeft?: React.ReactNode;
  text: string;
  iconRight?: React.ReactNode;
  light?: boolean;
  white?: boolean;
  bgColor?: string;
  textColor?: string;
}

const Button: React.FC<Props> = ({
  iconLeft,
  iconRight,
  light,
  white,
  text,
  bgColor,
  textColor = 'white',
  type,
  className,
  ...props
}: Props) => (
  <button
    {...props}
    className={classNames(
      'lh-btn py-3 px-4 flex items-center font-medium font-circular text-xl focus:outline-none',
      { light, white },
      bgColor ? `bg-${bgColor}` : '',
      `text-${textColor}`,
      className,
    )}>
    {iconLeft}
    <span
      className={classNames(
        { 'pl-4': !!iconLeft, 'pr-4': !!iconRight },
        `text-${textColor}`,
      )}>
      {text}
    </span>
    {iconRight}
  </button>
);

export default Button;
