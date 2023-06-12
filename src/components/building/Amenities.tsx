import React, { useState } from 'react';

import { B1, H5 } from '@components/shared/Typography';
import { Property } from '@models/Property';
import { useWindowWidth } from '@react-hook/window-size';
import {
  AirConditionerIcon,
  ArrowCollapseDown,
  ArrowCollapseUp,
  BalconyIcon,
  BusinessCenterIcon,
  DishwasherIcon,
  ElevetorIcon,
  FitnessCenterIcon,
  LaundryIcon,
  ParkingIcon,
  PoolIcon,
  WasherIcon,
} from '@components/shared/Icons';

export const AMENITY_ICONS: { [key: string]: { icon: JSX.Element; text: string } } = {
  pool: {
    icon: <PoolIcon />,
    text: 'What could be better than relaxing in the pool in the summer?',
  },
  'fitness center': {
    icon: <FitnessCenterIcon />,
    text: 'Keep your body toned with maximum comfort.',
  },
  'business center': {
    icon: <BusinessCenterIcon />,
    text: 'For those who want to be in touch with their business.',
  },
  'air conditioner': {
    icon: <AirConditionerIcon />,
    text: 'Climate control is available in these apartments.',
  },
  elevator: {
    icon: <ElevetorIcon />,
    text: 'This property has elevator for faster access to units.',
  },
  'onsite parking': {
    icon: <ParkingIcon />,
    text: 'Don’t worry about where to park your car.',
  },
  'washer/dryer': {
    icon: <WasherIcon />,
    text: 'Keep things clean without leaving home.',
  },
  'laundry facilities': {
    icon: <LaundryIcon />,
    text: 'Make the washing process even faster and more efficient.',
  },
  balcony: {
    icon: <BalconyIcon />,
    text: 'Enjoy the views whenever you like.',
  },
  dishwasher: {
    icon: <DishwasherIcon />,
    text: 'Did you have a feast? No need to worry about washing dishes.',
  },
};

export const AMENITY_LIST = Object.keys(AMENITY_ICONS);

export default function Amenities({ property }: { property?: Property }): React.ReactElement {
  const [showAmenities, setShowAmenities] = useState<boolean>(false);

  const mainAmenities =
    property?.amenities.filter((amenity) => Object.keys(AMENITY_ICONS).includes(amenity.name)) || [];
  const otherAmenities =
    property?.amenities.filter(
      (amenity) => !Object.keys(AMENITY_ICONS).includes(amenity.name) && amenity.name !== 'exclude',
    ) || [];

  const width = useWindowWidth();

  if (!mainAmenities || mainAmenities.length === 0) {
    return <></>;
  }

  return (
    <div className="mt-16 md:mt-8">
      <h3 className="font-circular text-24px font-medium mb-6">Amenities</h3>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-16 mt-4 mb-10">
        {mainAmenities?.slice(0, 6).map((amenity) => (
          <div key={amenity.name} className="flex">
            <div className="mr-3 sm:mr-6" style={{ width: 64, opacity: 0.35 }}>
              {AMENITY_ICONS[amenity.name].icon}
            </div>
            <div>
              <B1 className="inline-block capitalize text-20px font-medium mb-3">{amenity.name}</B1>
              <B1 weight="font-book" className="text-color font-circular" style={{ opacity: 0.75 }}>
                {AMENITY_ICONS[amenity.name].text}
              </B1>
            </div>
          </div>
        ))}
        {showAmenities && (
          <>
            {mainAmenities?.slice(6).map((amenity) => (
              <div key={amenity.name} className="flex">
                <div className="mr-8" style={{ width: 64, opacity: 0.35 }}>
                  {AMENITY_ICONS[amenity.name].icon}
                </div>
                <div>
                  <B1 className="inline-block capitalize text-20px font-medium mb-3">{amenity.name}</B1>
                  <B1 weight="font-book" className="text-color font-circular" style={{ opacity: 0.75 }}>
                    {AMENITY_ICONS[amenity.name].text}
                  </B1>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {showAmenities && (
        <div className="p-5 additional-amenities">
          <H5 weight="font-book" className="mb-4 text-color" style={{ opacity: 0.65, letterSpacing: 0, fontSize: 16 }}>
            Additional amenities
          </H5>
          <ul
            className="w-full py-4"
            style={{ display: 'grid', gridTemplateColumns: width > 768 ? '1fr 1fr 1fr 1fr' : '1fr' }}>
            {otherAmenities.map((amenity) => (
              <li title={amenity.name} className="mb-4 mr-4 relative additional-amenity-box" key={amenity.name}>
                <B1
                  weight="font-book"
                  className="capitalize text-color md:truncate"
                  style={{ lineHeight: '1.25em', opacity: 0.85, fontSize: 16, maxWidth: '90%', cursor: 'default' }}>
                  {amenity.name}
                </B1>
              </li>
            ))}
          </ul>
        </div>
      )}
      {(otherAmenities.length > 0 || mainAmenities.length > 6) && (
        <button
          type="button"
          className="h-16 mt-8 font-circular w-full outline-none focus:outline-none relative amenities-btn"
          onClick={(): void => setShowAmenities(!showAmenities)}>
          <B1 className="flex flex-row justify-center items-center bg-white px-5 opacity-50 text-color font-medium text-16px ">
            {showAmenities ? (
              <>
                <span className="mr-2">Hide all amenities</span>
                <ArrowCollapseUp />
              </>
            ) : (
              <>
                <span className="mr-2">See all amenities</span>
                <ArrowCollapseDown />
              </>
            )}
          </B1>
        </button>
      )}
    </div>
  );
}
