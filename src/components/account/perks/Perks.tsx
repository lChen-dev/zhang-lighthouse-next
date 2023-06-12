import React, { useEffect, useState } from 'react';
import { LoadingSpinner, Sidebar } from '@components/shared';
import { useAnalytics } from 'use-analytics';
import { B2 } from '@components/shared/Typography';
import { useSWRAuthed } from '@utils/requests';
import '../../../../public/static/assets/css/dashboard.css';
import { useWindowWidth } from '@react-hook/window-size';
import scrollIntoView from 'dom-scroll-into-view';

type Perk = {
  Active: boolean;
  CompanyLogo: string;
  CompanyName: string;
  Description: string;
  Industry: string;
  Link: string;
  Offer: string;
  Restriction: string;
  createdAt: string;
  id: string;
  updatedAt: string;
};

const Perks: React.FC = () => {
  const { track } = useAnalytics();
  const [Category, setCategory] = useState('');
  const [dy, setDy] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const width = useWindowWidth();
  const { data, error } = useSWRAuthed('/perks', (perk) => perk);
  const categories = data?.Perks.reduce((acc: Record<string, Perk[]>, cur: Perk) => {
    return {
      ...acc,
      [JSON.parse(cur.Industry)[0]
        .toLowerCase()
        .replace(/\s/gm, '_')]: Array.from(
        new Set(
          acc[
            JSON.parse(cur.Industry)[0]
              .toLowerCase()
              .replace(/\s/gm, '_')
          ]
        ).add(cur)
      ),
    };
  }, {});

  useEffect(() => {
    const sidebar = document.querySelector('#sidebar')?.clientWidth ?? 0;
    setSidebarWidth(sidebar >= 256 ? 256 : sidebar);
  }, [width]);

  useEffect(() => {
    let wrapper: HTMLElement | null = null;

    const scrollHandler = () => {
      setDy(wrapper?.scrollTop ?? 0);

      const topOffset = 0;
      const bottomOffset = 600;
      const sections = document.querySelectorAll('[data-section]');
      sections?.forEach((item) => {
        if (item.getBoundingClientRect().top > topOffset && item.getBoundingClientRect().top < bottomOffset) {
          const attr = item.getAttribute('data-section');
          setCategory(attr ?? '');
        }
      });
    };

    if (data) {
      setDy(window.scrollY);
      setCategory(Object.keys(categories)[0] ?? '');
      wrapper = document.querySelector('#wrapper');
      wrapper?.addEventListener('scroll', scrollHandler);
    }
    return () => {
      wrapper?.removeEventListener('scroll', scrollHandler);
    };
  }, [data]);

  useEffect(() => {
    // move categories in x-direction in mobile version
    if (Category && width < 768) {
      const activeCategoryX = document.querySelector(`#${Category}-link`)?.getBoundingClientRect().x;
      const categoriesWrapper = document.querySelector('#categories-wrapper');
      const categoriesWrapperX = categoriesWrapper?.getBoundingClientRect().x;
      const indexOfItem = Object.keys(categories)?.findIndex((item) => item === Category);
      const rightMargin = 4;
      categoriesWrapper?.scrollTo(
        activeCategoryX && categoriesWrapperX ? activeCategoryX - categoriesWrapperX - rightMargin * indexOfItem : 0,
        0
      );
    }
  }, [Category]);

  const withShadow = dy >= 200;

  if (error) {
    return (
      <div className="px-6 py-4 xl:px-12">
        <p className="p-4 bg-red-600 text-white mb-2 rounded w-full xl:max-w-4xl"> Failed to load perks </p>
      </div>
    );
  }

  if (!data)
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner color={'#34966D'} />
      </div>
    );

  const handleAnchorScroll = (str: string) => {
    const source = document.querySelector(`#${str}`);
    const container = document.querySelector('#wrapper');
    const config = { offsetTop: width >= 768 ? 100 : 160, alignWithTop: true };
    scrollIntoView(source, container, config);
  };

  return (
    <div
      id="wrapper"
      className="py-4 w-full box-border fixed top-0"
      style={{ width: width >= 768 ? `calc(100% - ${sidebarWidth}px)` : '100%', overflow: 'scroll', height: '100vh' }}
    >
      <div
        className="px-2 pl-6 sm:pl-2 pt-24 md:pt-0 xl:pt-10"
        style={{ maxWidth: 1080, width: '100%', margin: '0 auto' }}
      >
        <h2
          className="mt-0 md:mt-10 text-24px sm:text-36px xl:mt-20 mb-2 font-bold font-circular"
          style={{ letterSpacing: '-0.03em' }}
        >
          Lighthouse Offers
        </h2>
        <p className="mb-2 lg:mt-2 text-16px sm:text-18px text-color font-book font-circular" style={{ opacity: 0.5 }}>
          See interesting offers that Lighthouse can propose you.
        </p>
      </div>

      {/* categories menu*/}
      <div id="categories" className={`py-4 mb-12 bg-white sticky w-full fixed-top ${withShadow && 'shadow-header'}`}>
        <div className="px-2 pl-6 sm:pl-2 w-full mx-auto my-0" style={{ maxWidth: 1080 }}>
          <div style={{ margin: '0 auto' }} className="flex flex-col md:flex-row md:items-center">
            <B2 className="mr-3 mb-4 md:mb-0 text-color" style={{ opacity: 0.75 }} weight="book">
              Categories:
            </B2>
            <div
              id="categories-wrapper"
              className="w-full flex flex-row items-center flex-nowrap md:flex-wrap"
              style={{ overflowY: 'scroll' }}
            >
              {Object.keys(categories).map((category: string) => (
                <div
                  key={category}
                  onClick={() => handleAnchorScroll(category)}
                  id={`${category}-link`}
                  className=" w-auto m-1 ml-0 inline-block h-full"
                  style={{ height: '100%', width: 'fit-content' }}
                >
                  <div
                    className={`inline-block m w-auto font-circular category-tab cursor-pointer my-auto font-bold ${Category ===
                      category && 'active'} px-3 py-1 text-14px`}
                    style={{ whiteSpace: 'nowrap', textTransform: 'capitalize' }}
                  >
                    {category.replace(/_/gm, ' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto' }} className="w-full px-2 pb-16">
        {categories &&
          Object.keys(categories).map((category) => (
            <div key={category} className="pb-16">
              <h4
                id={category}
                className="pl-4 sm:pl-0 text-20px sm:text-24px font-bold font-circular"
                style={{ letterSpacing: '-0.02em', textTransform: 'capitalize' }}
                data-section={category}
              >
                {category.replace(/_/gm, ' ')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2">
                {categories[category].map((perk: Perk) => (
                  <div
                    key={perk.id}
                    className="my-6 mx-auto w-full h-120 flex-col p-4 sm:p-8 flex flex-col justify-between border border-gray-130 border-radius-md perk-card"
                  >
                    <img
                      src={perk.CompanyLogo}
                      className="h-12 w-12 sm:h-24 sm:w-24 object-contain border border-gray-120 border-radius-md mb-8 "
                    />
                    <div>
                      {perk.Restriction && (
                        <div className="mt-6 text-color text-16px font-circular" style={{ opacity: 0.6 }}>
                          {perk.Restriction}
                        </div>
                      )}
                      <div
                        className="mt-2 text-color text-20px lg:text-24px font-bold font-circular"
                        style={{ letterSpacing: '-0.02em', lineHeight: 1.5 }}
                      >
                        {perk.Offer}
                      </div>
                      <div
                        className="mt-5 text-color text-16px lg:text-20px font-bold font-circular"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {perk.CompanyName}
                      </div>
                      <div
                        className="mt-1 text-color text-14px lg:text-16px font-circular book"
                        style={{ opacity: 0.6, lineHeight: 1.25 }}
                      >
                        {perk.Description}
                      </div>
                      <div className="mt-6">
                        <button
                          onClick={async () => {
                            if (window && window.hasOwnProperty('analytics')) {
                              (window as any).analytics.ready(async function() {
                                const windowAnalytics = (window as any).analytics;
                                const anonymousId = windowAnalytics.user().anonymousId();
                                track('Perk Opened', {
                                  perk: perk.CompanyName,
                                  anonymousId,
                                  userId: anonymousId,
                                });
                              });
                            }
                            window.open(perk.Link, '_blank');
                          }}
                          className="w-full outline-none focus:outline-none bg-brand font-circular text-center py-2 lg:py-4 text-white font-bold hover:text-green-white cursor-pointer border-radius-md"
                        >
                          Get Offer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Perks;
