import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import Header from '@components/search/Header';
import useProperty from '@hooks/property';
import Amenities from '@components/building/Amenities';
import Neighborhood from '@components/building/Neighborhood';
import Description from '@components/building/Description';
import PropertyContactInfo from '@components/building/PropertyContactInfo';
import Units from '@components/building/Units';
import Carousel from '@components/building/Carousel';
import { getBedroomsList, getSearchRedirectURL } from '@utils/building-helper';
import { Footer } from '@components/shared';
import InquiryFlow from '@components/shared/inquiry-flow/InquiryFlow';
import { B1, B2, H2, H4 } from '@components/shared/Typography';
import { getMaxRent, getMinRent } from '@utils/property-helpers';
import { formatPriceRange, numberWithCommas } from '@utils/format';
import Property from '@tracking/Property';

import '../../../public/static/assets/css/building.css';
import '../../../public/static/assets/css/dark.css';

import 'react-alice-carousel/lib/alice-carousel.css';
import './building.css';
import PriceNotice from '@components/building/PriceNotice';
import blockVisitors from '@utils/block-visitors';
import { GetServerSideProps } from 'next';
import { BedroomListIcon, BuildingAddressIcon, LogoIcon } from '@components/shared/Icons';
import CarouselSkeleton from '@components/building/CarouselSkeleton';
import FavoriteButton from '@components/shared/property/FavoriteButton';
import AuthPopup from '@components/authPopup';
import { useAuth } from 'context/auth';

function getSearchCity(property: any): string {
  if (property?.city && property?.state) {
    return `${property?.city}, ${property?.state}`;
  }
  return property?.city;
}

const propertyAddress = (property: any) => {
  const { address, city, state } = property || {};
  if (address) {
    return (
      <Link href={`/search?city=${city}, ${state}`}>
        <span
          className="description-text text-gray-medium cursor-pointer font-book"
          style={{ display: 'inline' }}>{`${address}, ${city} ${state}`}</span>
      </Link>
    );
  }
  return <Skeleton />;
};

const BuildingPage = () => {
  const { user } = useAuth();

  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const { slug }: any = router.query;
  const id = slug[0];
  const property = useProperty(id as string);

  const { name, address, floorplan, website } = property || {};
  let minRent = useMemo(() => floorplan && getMinRent(floorplan), [floorplan]);
  if (!minRent || !Number.isFinite(minRent)) {
    minRent = property?.minRent;
  }
  const maxRent = useMemo(() => floorplan && getMaxRent(floorplan), [floorplan]);
  const bedroomList = useMemo(() => floorplan && getBedroomsList(floorplan), [floorplan]);

  const [showApplyMenu, setShowApplyMenu] = useState<boolean>(false);
  useEffect(() => {
    if (name) {
      (document as any).title = name;
    }
  }, [name]);

  useEffect(() => Property.viewed(property), []);
  return (
    <>
      {showAuth && !user && <AuthPopup show onClick={() => {}} setShowAuth={setShowAuth} />}
      <div>
        <Header />
        <div className="max-w-screen-2xl m-auto 2xl:px-0 lg:px-6 px-4">
          <div className="pt-2 md:pt-6">
            <div className="flex flex-col-reverse sm:flex-row justify-between sm:items-center">
              <div style={{ maxWidth: '90%', width: '100%' }}>
                <H2 className="font-bold text-color pb-3" style={{ fontSize: 36 }}>
                  {name || <Skeleton width="70%" height={40} />}
                </H2>
              </div>
              <div className="flex items-center justify-end w-full pt-2 md:pt-0 pb-8 sm:pb-0">
                <div className="flex justify-between sm:justify-end items-center w-full">
                  <div className="flex items-center sm:hidden cursor-pointer" onClick={() => router.push('/')}>
                    <LogoIcon color="#2A343A" />
                  </div>

                  <div className="flex items-center">
                    <span className="mr-4 block">
                      {property && <FavoriteButton property={property} setShowAuth={setShowAuth} />}
                    </span>

                    <svg
                      className="float-right cursor-pointer"
                      onClick={() => {
                        const path = getSearchRedirectURL(property?.nanoId);
                        if (path) {
                          return router.push(path);
                        }
                        // redirect users with property details
                        const params = new URLSearchParams({ city: getSearchCity(property) || '' });
                        return router.push(`/search?${params}`);
                      }}
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M25 3L3 25M3 3L25 25" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-2xl m-auto 2xl:px-0 lg:px-6 px-4">
          <div className="pb-12 sm:pb-32">
            <div>
              <B1
                color="description-text text-gray-medium"
                weight="font-book"
                style={{
                  width: '90%',
                }}>
                <span style={{ opacity: 1 }}>
                  {address ? <BuildingAddressIcon /> : <Skeleton width={22} height={22} style={{ marginRight: 5 }} />}
                </span>
                {property ? propertyAddress(property) : <Skeleton width={200} height={22} />}
              </B1>
              <B1
                color="description-text text-gray-medium"
                weight="font-book"
                style={{
                  width: '90%',
                }}>
                <span>
                  {bedroomList ? <BedroomListIcon /> : <Skeleton width={22} height={22} style={{ marginRight: 5 }} />}
                </span>
                {bedroomList || <Skeleton width={200} height={22} />}
              </B1>
            </div>
            {property?.propertyPhotos && property.propertyPhotos.length > 0 && (
              <div className="relative mt-8">
                <Carousel property={property} />
                <hr />
              </div>
            )}
            {!property && (
              <div className="relative mt-2 md:mt-8">
                <CarouselSkeleton />
                <hr />
              </div>
            )}
            <div className="mt-4 grid lg:grid-cols-3 grid-cols-1">
              <div className="col-span-2 building-info-col order-2 lg:order-1">
                <Description property={property} />
                <PropertyContactInfo property={property} />
                <Units property={property} />
                <Amenities property={property} />
                <Neighborhood property={property} />
              </div>
              <div
                className="col-span-1 mb-8 lg:mb-0 mt-8 lg:mt:0 font-circular text-color order-1 lg:order-2"
                style={{ position: 'relative' }}>
                <div style={{ position: 'sticky', top: 64, zIndex: 1 }}>
                  <div className="p-4 mb-4 relative how-it-works-section">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 10H23M3 4H21C22.1046 4 23 4.89543 23 6V18C23 19.1046 22.1046 20 21 20H3C1.89543 20 1 19.1046 1 18V6C1 4.89543 1.89543 4 3 4Z"
                        stroke="#2A343A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Link href="/faq">
                      <p className="text-16px md:text-18px font-medium link-btn cursor-pointer">How it works?</p>
                    </Link>
                    <H4 weight="font-medium" className="mb-4 pt-2" style={{ lineHeight: '1.25em' }}>
                      ${numberWithCommas(parseInt((property?.cashback as any) || 0, 10))}{' '}
                      <B2 weight="font-medium">cash back</B2>
                    </H4>
                    <B2 className="mr-5 opacity-75" weight="font-book">
                      Get up to ${numberWithCommas(parseInt((property?.cashback as any) || 0, 10))} in cash back, or $
                      {property && numberWithCommas(Math.floor(property?.cashback / 12))} per month by applying with
                      Lighthouse
                    </B2>
                  </div>

                  <div className="p-4 see-site-section relative">
                    <H4 weight="font-medium" className="w-5/6 inline-block" style={{ lineHeight: '2.2em' }}>
                      {property ? `${formatPriceRange(minRent, maxRent)}/month` : <Skeleton width={100} />}
                    </H4>
                    <a
                      className="text-16px md:text-18px font-medium link-btn pointer see-site-link"
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer">
                      Visit site
                    </a>
                    <B2 className="text-color opacity-75 f-full sm:w-3/4 mb-4" weight="font-book">
                      Interested? Select one of these options to learn more about the apartment.
                    </B2>
                    <div className="md:block hidden">
                      {property && <InquiryFlow property={property} setShowAuth={setShowAuth} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PriceNotice property={property} />
        {/* width wrapper */}

        {showApplyMenu && (
          <div className="fixed inset-0" style={{ zIndex: 9999999 }}>
            <div
              className="fixed inset-0 bg-gray bg-opacity-25 overflow-y-scroll"
              style={{ backdropFilter: 'blur(8px)', overscrollBehavior: 'contain' }}
              onClick={() => setShowApplyMenu(false)}
            />
            <div className="absolute z-50" style={{ bottom: '1rem', left: '1rem', right: '1rem' }}>
              {property && (
                <InquiryFlow
                  property={property}
                  setShowAuth={(e: any) => {
                    setShowApplyMenu(false);
                    setShowAuth(e);
                  }}
                />
              )}
            </div>
          </div>
        )}

        <Footer />
        {!showApplyMenu && (
          <div
            className="md:hidden block fixed bg-white"
            style={{ left: 0, right: 0, bottom: 0, padding: '0 1rem 1rem', zIndex: 1 }}>
            <div className="request-btn flex justify-center items-center" onClick={() => setShowApplyMenu(true)}>
              <B1 color="text-center">
                <span style={{ opacity: 0.6 }}>{formatPriceRange(minRent, maxRent)} - </span>
                <span>send request</span>
              </B1>
            </div>
          </div>
        )}
        <div style={{ height: 70 }} />
      </div>
    </>
  );
};

// required to get slugs
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (blockVisitors({ req, res })) {
    res.end('');
    return { props: {} };
  }
  return { props: {} };
};

export default BuildingPage;
