import React, { MouseEventHandler } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useWindowWidth } from '@react-hook/window-size';

interface Props {
  label: string;
  href: string;
  icon: JSX.Element;
  useLink?: boolean;
  onClick?: MouseEventHandler | undefined;
  isMob?: boolean;
}

const NavItem: React.FC<Props> = ({ label, href, icon, useLink = true, onClick, isMob = false }: Props) => {
  const { pathname } = useRouter();
  const selected = pathname === href;
  const width = useWindowWidth();

  const Content = (): React.ReactElement => (
    <>
      <a
        onClick={onClick}
        className={classNames('no-underline hover:no-underline mt-1', isMob ? 'mx-0' : 'mx-5')}
        href={href}
      >
        <div
          title={label}
          className={classNames(
            'flex flex-row font-circular items-center nav-item',
            isMob
              ? 'flex-col items-center bg-transparent px-2'
              : selected
              ? 'bg-green-transparent  px-4 py-2'
              : 'bg-transparent  px-4 py-2'
          )}
        >
          <span
            className={classNames(
              'w-6 h-6 flex justify-center items-center',
              selected ? 'text-green-active' : 'text-gray-light'
            )}
          >
            {icon}
          </span>
          <span
            className={classNames(
              'font-bold',
              'inline-block',
              'md:hidden',
              'xl:inline-block',
              selected ? 'text-green-active' : 'text-color',
              isMob ? 'text-12px ml-0' : 'ml-3'
            )}
          >
            {isMob && width <= 360 ? '' : label}
          </span>
        </div>
      </a>
    </>
  );
  return useLink ? (
    <Link href={href}>
      <Content />
    </Link>
  ) : (
    <Content />
  );
};

export default NavItem;
