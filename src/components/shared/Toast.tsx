import React from 'react';
import classNames from 'classnames';

import './css/toast.css';

export enum Position {
  TOP = 'top',
  BOTTOM = 'bottom',
}

interface Props {
  position?: Position;
  className?: string;
  children?: React.ReactNode;
  bg?: string;
}

const Toast: React.FC<Props> = ({ position, className, children, bg }: Props) => {
  return (
    <div className={classNames('fixed left-0 w-full text-center', `${position}-toast`)} style={{ zIndex: 9999 }}>
      <div className={classNames('px-4 py-3 inline-flex items-center toast', bg, className)}>{children}</div>
    </div>
  );
};

Toast.defaultProps = {
  position: Position.BOTTOM,
  bg: 'bg-white',
};

export default Toast;
