import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';

interface Props {
  label: string;
  icon: JSX.Element;
  onClick?: MouseEventHandler | undefined;
}

const Logout: React.FC<Props> = ({ label, icon, onClick }: Props) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="no-underline hover:no-underline mx-5 mt-1 outline-none focus:outline-none">
        <div className={classNames('flex flex-row font-circular items-center px-4 py-3 nav-item bg-transparent')}>
          <span className={classNames('mr-3 w-6 text-gray-light')}>{icon}</span>
          <span className={classNames('inline-block md:hidden xl:inline-block font-bold text-color')}>{label}</span>
        </div>
      </button>
    </>
  );
};

export default Logout;
