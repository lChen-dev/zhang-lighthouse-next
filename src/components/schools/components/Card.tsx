import React, { CSSProperties } from 'react';
import classNames from 'classnames';

interface Props {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Card: React.FC<Props> = ({ children, className, style }: Props) => (
  <div className={classNames('bg-white shadow rounded-md p-10', className)} style={style}>
    {children}
  </div>
);

export default Card;
