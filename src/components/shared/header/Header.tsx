/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useWindowWidth } from '@react-hook/window-size';

import { H2 } from '@components/shared/Typography';
import HeaderLink from '@components/shared/header/HeaderLink';
import AuthPopup from '@components/authPopup';
import { useAuth } from 'context/auth/index';
import { CloseIcon, MenuIcon, ProfileIcon } from '../Icons';

interface Props {
  blackNav?: boolean;
  fixed?: boolean;
  dashboard?: boolean;
  hideItems?: boolean;
}

const Header: React.FC<Props> = ({ blackNav, fixed, dashboard, hideItems }: Props) => {
  const width = useWindowWidth();

  const { user } = useAuth();
  const { query } = useRouter();
  const [dy, setDy] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  const resetMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  useEffect(() => {
    setDy(window.scrollY);

    let docWrapper: HTMLElement | null = null;
    let scrollListener: () => any;
    setTimeout(() => {
      docWrapper = document.getElementById('doc-wrapper');
      scrollListener = () => setDy(docWrapper?.scrollTop ?? 0);
      docWrapper?.addEventListener('scroll', scrollListener, false);
    }, 0);

    return () => {
      docWrapper?.removeEventListener('scroll', scrollListener);
    };
  }, []);

  // Open menu when post login URL or referral code is present to show auth popup
  useEffect(() => {
    if (width < 768 && (query.post_login_url || query.ref)) setMenuVisible(true);
  }, [query, width]);

  const toWhite = blackNav ? false : dy <= 0;
  return (
    <div className={classNames('w-full shadow-sm md:shadow-none z-50', { fixed })}>
      <header
        className={classNames(
          'cc_cursor font-circular',
          toWhite ? 'sm:bg-transparent md:pt-5 ' : 'bg-white border-0',
          dashboard
            ? 'md:flex md:items-center md:justify-between'
            : 'sm:flex sm:items-center sm:justify-between md:flex-shrink-0',
        )}
        style={{ transition: '200ms' }}>
        <div
          className={classNames('navBorder w-full flex justify-center content-center', {
            'mx-auto max-w-screen-xl': !dashboard,
          })}>
          <div
            className={classNames(
              'flex justify-between laptop-md:px-0 px-3 py-3 w-full lg:py-5',
              blackNav ? 'bg-white' : 'bg-transparent',
              { 'sm:w-72': !dashboard },
            )}>
            <div className="flex justify-center">
              <a href="/">
                <img src="/static/assets/Icons/logo.svg" alt="logo" className="block" width="160" height="50" />
              </a>
            </div>
            <div className={classNames('flex', dashboard ? 'md:hidden' : 'sm:hidden')}>
              <button
                aria-label="burgerIcon"
                type="button"
                onClick={() => setMenuVisible(true)}
                className={classNames('px-2 hover:text-green focus:outline-none focus:text-green text-black')}>
                <MenuIcon />
              </button>
            </div>
          </div>
          <nav
            className={classNames(
              'hidden cc_cursor lg:pr-0 pr-3',
              dashboard ? 'md:flex md:flex-1 md:justify-between' : 'sm:flex sm:flex-1 sm:justify-between',
              dashboard ? 'md:flex md:flex-1 md:justify-between' : 'sm:flex sm:flex-1 sm:justify-between'
            )}>
            <div className="block relative max-w-xs w-full" />
            {!hideItems && (
              <div className="flex items-center">
                <div className="pr-2 lg:pr-4 xl:pr-0 border-gray-800 flex border-b-0 whitespace-no-wrap">
                  <HeaderLink text="Explore" href="/start" />
                  <HeaderLink text="Learn " href="/learn" />
                  {/* <HeaderLink text="Blog" href="/blog" /> */}
                  <HeaderLink text="About" href="/about" />
                  <AuthPopup
                    onClick={() => {
                      window.location.replace('/account/dashboard');
                    }}>
                    <button className="outline-none focus:outline-none" type="button">
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
                    </button>
                  </AuthPopup>
                </div>
              </div>
            )}
          </nav>
        </div>
        {menuVisible && (
          <div
            className={classNames(
              'flex flex-col absolute inset-0 w-screen h-screen z-20 bg-white p-3',
              dashboard ? 'md:hidden' : 'sm:hidden',
            )}>
            <div className="flex flex-row items-center mb-16">
              <a href="/" className="flex-1">
                <img src="/static/assets/Icons/logo.svg" alt="logo" className="block" width="160" height="50" />
              </a>
              <button
                type="button"
                className="text-gray-blue hover:text-green focus:outline-none focus:text-green px-2"
                onClick={resetMenu}>
                <CloseIcon />
              </button>
            </div>

            <div className="px-2 flex flex-col">
              {/* Home */}
              <a href="/" className="mb-5">
                <H2 className="text-36px">Home</H2>
              </a>

              {/* Explore */}
              <a href="/start" className="mb-5">
                <H2 className="text-36px">Explore</H2>
              </a>

              {/* Learn */}
              <a href="/learn" className="mb-5">
                <H2 className="text-36px">Learn</H2>
              </a>

              {/* Blog */}
              <a href="/blog" className="mb-5">
                <H2 className="text-36px">Blog</H2>
              </a>

              {/* About */}
              <a href="/about" className="mb-5">
                <H2 className="text-36px">About</H2>
              </a>

              <hr className="my-3" />

              {/* Account */}
              <AuthPopup
                onClick={() => {
                  window.location.replace('/account/dashboard');
                }}>
                <button
                  type="button"
                  style={{ marginLeft: '-0.5rem' }}
                  className="mt-5 flex flex-row text-brand items-center">
                  <ProfileIcon className="text-brand" width={46} height={46} />
                  <H2 color="text-brand" className="text-36px">
                    {user ? 'My Account' : 'Sign In'}
                  </H2>
                </button>
              </AuthPopup>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

Header.defaultProps = {
  blackNav: false,
  fixed: true,
  dashboard: false,
};

export default Header;
