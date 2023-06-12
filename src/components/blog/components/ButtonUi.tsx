import React from 'react';
import { B2 } from '@components/shared/Typography';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  title: any;
  selected: boolean;
  classes?: string | undefined;
  onClick?: any | undefined;
  buttonWidth?: any;
  radius?: any;
  topLeftRadius?: any;
  topRightRadius?: any;
  bottomLeftRadius?: any;
  bottomRightRadius?: any;
  minWidth?: any | 0;
}

const Button: React.FC<Props> = ({
  title = '',
  selected = false,
  classes = '',
  onClick,
  buttonWidth = 'max-content',
  radius = '8px',
  topLeftRadius = radius,
  topRightRadius = radius,
  bottomLeftRadius = radius,
  bottomRightRadius = radius,
  minWidth,
}: Props) => {
  return (
    <button
      type="button"
      style={{
        background: !selected ? '#F8F8F8' : '#34966D',
        boxShadow: '0px 4.53333px 9.06667px rgba(0, 0, 0, 0.2)',
        borderRadius: radius,
        borderTopLeftRadius: topLeftRadius,
        borderTopRightRadius: topRightRadius,
        borderBottomLeftRadius: bottomLeftRadius,
        borderBottomRightRadius: bottomRightRadius,
        width: buttonWidth,
        minWidth,
      }}
      onClick={onClick}
      className={`h-10 px-5 ${classes} rounded-lg text-sm focus:outline-none`}>
      <B2 weight="font-bold" color={!selected ? 'text-black' : 'text-white'}>
        {title}
      </B2>
    </button>
  );
};

export default Button;
