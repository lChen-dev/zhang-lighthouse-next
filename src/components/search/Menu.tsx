import { useWindowWidth } from '@react-hook/window-size';
import Link from 'next/link';
import React from 'react';
import { Portal } from 'react-portal';

import { B2 } from '@components/shared/Typography';
import { CashIcon, DashboardIcon, HeartIcon, HelpIcon, Home, InsuranceIcon, ReferIcon } from '@components/shared/Icons';
import { useAuth } from 'context/auth';

export interface Props {
  closeMenu: () => void;
  ref: any;
  setShowAuth?: (e?: any) => any;
  user?: any;
}

const MenuItems = ({
  closeMenu,
  user,
  mobile,
  setShowAuth,
}: {
  closeMenu: () => void;
  user?: any;
  mobile?: boolean;
  setShowAuth?: any;
}): React.ReactElement => {
  const clickHandler = (e: any): void => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      if (setShowAuth) setShowAuth(true);
      return;
    }
    window.location.replace('/account/dashboard');
  };
  return (
    <>
      {mobile && (
        <>
          <div className="block h-12 mt-2">
            <svg
              className="float-left cursor-pointer"
              onClick={() => closeMenu()}
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M4 18.0002L5.41421 19.4145L19.5563 5.27232L18.1421 3.85811L4 18.0002Z" fill="#2A343A" />
              <path d="M5 4.00012L3.58579 5.41434L17.7279 19.5565L19.1421 18.1423L5 4.00012Z" fill="#2A343A" />
            </svg>
          </div>
        </>
      )}
      {/* Dashboard */}
      <div className="flex items-center align-center mb-4 group cursor-pointer">
        <span className="w-6 mr-3 text-gray-light group-hover:text-green-bright">
          <DashboardIcon />
        </span>
        <Link href="/account/dashboard">
          <B2 weight="font-bold">Dashboard</B2>
        </Link>
      </div>

      {/* Cashback */}
      <div className="flex flex-row items-center mb-4 group cursor-pointer">
        <span className="w-6 mr-3 text-gray-light group-hover:text-green-bright">
          <CashIcon />
        </span>
        <Link href="/account/rewards">
          <B2 weight="font-bold">Cashback</B2>
        </Link>
      </div>

      {/* Wishlist */}
      <div className="flex flex-row items-center mb-4 group cursor-pointer">
        <span className="w-6 mr-3 text-gray-light group-hover:text-green-bright">
          <HeartIcon />
        </span>
        <Link href="/account/wishlist">
          <B2 weight="font-bold">Wishlist</B2>
        </Link>
      </div>

      {/* Refer & Earn */}
      <div className="flex flex-row items-center mb-4 group cursor-pointer">
        <span className="w-6 mr-3 text-gray-light group-hover:text-green-bright">
          <ReferIcon />
        </span>
        <Link href="/account/refer">
          <B2 weight="font-bold">Refer &amp; Earn</B2>
        </Link>
      </div>

      {/* Insurance */}
      <div className="flex flex-row items-center mb-4 group cursor-pointer">
        <span className="w-6 mr-3 text-gray-light group-hover:text-green-bright">
          <InsuranceIcon />
        </span>
        <a href={user ? '/account/insurance' : '/insurance'}>
          <B2 weight="font-bold">Insurance</B2>
        </a>
      </div>

      {/* Help */}
      <div className="flex flex-row items-center mb-4 group cursor-pointer">
        <span className="w-6 mr-3 text-gray-light group-hover:text-green-bright">
          <HelpIcon />
        </span>
        <Link href="/faq">
          <B2 weight="font-bold">Help</B2>
        </Link>
      </div>

      <hr className="mb-4" />

      {/* Home */}
      <div className="flex flex-row items-center mb-4 group cursor-pointer">
        <span className="w-6 mr-3 text-gray-light group-hover:text-green-bright">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 19.7362V10.4177C3 10.1545 3.10845 9.90314 3.29937 9.72383L11.1627 2.33861C11.6434 1.88717 12.3879 1.88712 12.8687 2.3385L20.7005 9.69222C20.8915 9.87154 21 10.1229 21 10.3862V19.7362C21 20.4342 20.4394 21 19.7478 21H14.3948C14.3602 21 14.3322 20.9717 14.3322 20.9368V15.4393C14.3322 15.4044 14.3041 15.3761 14.2696 15.3761H9.41739C9.38282 15.3761 9.35478 15.4044 9.35478 15.4393V20.9368C9.35478 20.9717 9.32675 21 9.29217 21H4.25217C3.56062 21 3 20.4342 3 19.7362Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </span>
        <Link href="/">
          <B2 weight="font-bold">Home</B2>
        </Link>
      </div>

      {/* Account */}
      <div className="flex flex-row items-center mb-4 group cursor-pointer">
        <span className="w-6 mr-3 text-green-bright">
          <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.6663 17.5V16.1111C16.6663 15.3744 16.3151 14.6679 15.69 14.1469C15.0649 13.626 14.2171 13.3333 13.333 13.3333H6.66634C5.78229 13.3333 4.93444 13.626 4.30932 14.1469C3.6842 14.6679 3.33301 15.3744 3.33301 16.1111V17.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M10.0003 9.16667C11.8413 9.16667 13.3337 7.67428 13.3337 5.83333C13.3337 3.99238 11.8413 2.5 10.0003 2.5C8.15938 2.5 6.66699 3.99238 6.66699 5.83333C6.66699 7.67428 8.15938 9.16667 10.0003 9.16667Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div onClick={clickHandler}>
          <B2 weight="font-bold" color="text-green-bright">
            {user ? 'My Account' : 'Sign in'}
          </B2>
        </div>
      </div>
    </>
  );
};

export default function Menu({ ref, closeMenu, setShowAuth }: Props) {
  const { user } = useAuth();

  const width = useWindowWidth();

  if (width < 768) {
    return (
      <Portal>
        <div className="absolute bg-white inset-0 rounded font-circular card-shadow px-8 py-4 z-50">
          <MenuItems closeMenu={closeMenu} user={user} mobile setShowAuth={setShowAuth} />
        </div>
      </Portal>
    );
  }

  return (
    <div
      className="absolute bg-white w-48 rounded font-circular card-shadow p-4"
      style={{ top: '50px', left: '-1rem', zIndex: 100 }}
      ref={ref}>
      <MenuItems closeMenu={closeMenu} user={user} setShowAuth={setShowAuth} />
    </div>
  );
}
