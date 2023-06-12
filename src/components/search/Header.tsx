/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import HeaderLink from '@components/shared/header/HeaderLink';
import AuthPopup from '@components/authPopup';
import { CloseIcon, MenuIcon } from '../shared/Icons';

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }: Props) => (
  <div className="w-full z-50 sm:block hidden pt-3">
    <header
      className={`max-w-screen-2xl m-auto 2xl:px-0 lg:px-6 px-4 | bg-white ${className} sm:flex sm:items-center sm:justify-between md:flex-shrink-0 cc_cursor font-circular rounded-md`}
      style={{ transition: '200ms' }}>
      <div className="flex justify-between py-4 sm:w-72 sm:justify-center">
        <div className="flex justify-center">
          <a href="/">
            <img src="/static/assets/Icons/logo.svg" alt="logo" width="160" height="50" />
          </a>
        </div>
        <div className="sm:hidden  flex">
          <button
            aria-label="burgerIcon"
            type="button"
            className="text-gray-500 hover:text-green focus:outline-none focus:text-green">
            <MenuIcon />
          </button>
        </div>
      </div>
      <nav className="sm:flex hidden sm:flex-1 sm:justify-between cc_cursor">
        <div className="block relative max-w-xs w-full" />
        <div className="flex items-center">
          <div className="pr-3 py-0 border-gray-800 flex border-b-0 whitespace-no-wrap">
            <HeaderLink text="Explore" href="/start" />
            <HeaderLink text="Learn " href="/learn" />
            <HeaderLink text="About" href="/about" />
            <AuthPopup onClick={() => window.location.replace('/account/dashboard')}>
              <div
                style={{
                  width: '24px',
                  display: 'block',
                  position: 'relative',
                  top: '-2px',
                  marginLeft: '0.75rem',
                }}>
                <img
                  src="/static/assets/Icons/profile-avatar.svg"
                  alt="profile-control"
                  className="w-24 text-black hover:text-brand"
                />
              </div>
            </AuthPopup>
          </div>
        </div>
      </nav>
      <div className="flex flex-row justify-end absolute top-0 left-0 w-screen h-screen hidden text-right z-20">
        <div className="bg-white w-3/4 h-full inline-flex flex-col shadow-brand-lg z-20 max-w-xs overflow-y-auto">
          <button
            type="button"
            className="text-gray-500 hover:text-green focus:outline-none focus:text-green mb-6 pt-5">
            <CloseIcon className="float-right" />
          </button>
          <div className="flex-1 text-left flex flex-col">
            <a href="/start" className="text-gray-600 text-lg py-2 font-semibold hover:text-green px-5">
              Get Started
            </a>
            <a href="/about" className="text-gray-600 text-lg py-2 font-semibold hover:text-green px-5">
              About
            </a>
            <a href="/faq" className="text-gray-600 text-lg py-2 font-semibold hover:text-green px-5">
              FAQ
            </a>
            <button
              type="button"
              className="text-gray-600 text-lg pt-2 pb-4 flex flex-row focus:outline-none items-center font-semibold hover:text-green px-5">
              <span className="flex-1 text-left hover:text-green">Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
);

export default Header;
