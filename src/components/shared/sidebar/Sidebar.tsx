import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import jsCookie from 'js-cookie';
import NavItem from '@components/shared/sidebar/NavItem';
import { sendTrack } from '@utils/analytics';
import { useRouter } from 'next/router';
import {
  AboutIcon,
  CashIcon,
  CloseIcon,
  DashboardIcon,
  ExploreIcon,
  HelpIcon,
  InsuranceIcon,
  LogoIcon,
  LogOutIcon,
  MenuIcon,
  PerksIcon,
  PreferencesIcon,
  ReferIcon,
  WishListIcon,
} from '../Icons';

import '../css/sidebar.css';
import Logout from './logoutButton';
import { nextApi } from '@utils/http';

const Sidebar: React.FC = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const resetMenu = useCallback(() => setShow(false), []);
  useEffect(() => {
    window.addEventListener('resize', resetMenu);
    return () => window.removeEventListener('resize', resetMenu);
  }, []);

  return (
    <section
      className="bg-white xl:w-64 fixed top-0 left-0 right-0 md:relative md:top-auto md:left-auto md:right-auto max-h-screen overflow-y-auto z-50"
      style={{ position: 'sticky', top: 0 }}
    >
      <div className="h-full justify-between flex flex-col md:pt-4 box-border overflow-y-auto">
        <div
          className={`md:hidden ${show ? 'hidden' : 'fixed'} bottom-0 right-0 left-0 bg-white h-16 px-4`}
          style={{ borderTop: '0.25px solid #C0C0C0' }}
        >
          <div
            className="flex justify-between items-center h-full"
            style={{ maxWidth: 400, width: '100%', margin: '0 auto' }}
          >
            <div style={{ width: 48 }}>
              <NavItem label="Referrals" href="/account/refer" isMob icon={<ReferIcon />} />
            </div>
            <div style={{ width: 48 }}>
              <NavItem label="Insurance" href="/account/insurance" useLink={false} isMob icon={<InsuranceIcon />} />
            </div>
            <div style={{ width: 48 }}>
              <NavItem label="Dashboard" href="/account/dashboard" isMob icon={<DashboardIcon />} />
            </div>
            <div style={{ width: 48 }}>
              <NavItem label="Rewards" href="/account/rewards" isMob icon={<CashIcon />} />
            </div>
            <div style={{ width: 48 }}>
              <NavItem label="Wishlist" href="/account/wishlist" isMob icon={<WishListIcon />} />
            </div>
          </div>
        </div>
        <div id="sidebar" className="text-white flex flex-col h-full pb-4 border-box">
          <div className="flex flex-row md:justify-center mt-4 px-6">
            <a href="/" className="md:w-3/4">
              <img className="hidden xl:block" src="/static/assets/Icons/logo.svg" alt="logo" height="44" />
              <div className="flex xl:hidden items-center cursor-pointer" onClick={() => router.push('/')}>
                <LogoIcon color="#2A343A" />
              </div>
            </a>
            <div className="flex-1 md:hidden" />
            <button
              type="button"
              className="text-black md:hidden"
              style={{ outline: 'none' }}
              onClick={() => setShow(!show)}
            >
              {show ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
          <div className={classNames('mt-8 md:flex flex-col flex-1', show ? 'flex' : 'hidden')}>
            <NavItem label="Dashboard" href="/account/dashboard" icon={<DashboardIcon />} />
            <NavItem label="Rewards" href="/account/rewards" icon={<CashIcon />} />
            <NavItem label="Wishlist" href="/account/wishlist" icon={<WishListIcon />} />
            <NavItem label="Refer &amp; Earn" href="/account/refer" icon={<ReferIcon />} />
            <NavItem label="Insurance" href="/account/insurance" useLink={false} icon={<InsuranceIcon />} />
            <NavItem label="Perks" href="/account/perks" icon={<PerksIcon />} />
            {/* <NavItem label="History" href="/account/history" icon={<HistoryIcon />} /> */}
            <div className="py-4 px-5">
              <hr />
            </div>
            <NavItem label="Explore" href="/search" useLink={false} icon={<ExploreIcon />} />
            <NavItem label="About" href="/about" icon={<AboutIcon />} />
            <div className="pt-4 pb-3 px-5">
              <hr />
            </div>
            <NavItem label="Preferences" href="/account/preferences" icon={<PreferencesIcon />} />
            <NavItem label="Help" href="/faq" icon={<HelpIcon />} />
            <div className="flex-1" />
            <Logout
              label="Logout"
              icon={<LogOutIcon />}
              onClick={async (e) => {
                e.preventDefault();
                await nextApi.post('/auth/logout');
                jsCookie.remove('lh_user');
                jsCookie.remove(process.env.NEXT_PUBLIC_STYTCH_SESSION_COOKIE || 'lhstyssion');
                jsCookie.remove(`${process.env.NEXT_PUBLIC_STYTCH_SESSION_COOKIE || 'lhstyssion'}-js`);
                window.localStorage.removeItem('UserObject');
                window.localStorage.setItem('UserObjectReset', 'false');
                window.localStorage.removeItem('Identified');
                sendTrack('userLoggedOut', {});
                setTimeout(() => {
                  window.location.replace('/logout');
                }, 1000);
              }}
            />
            <div className="md:hidden pb-32" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
