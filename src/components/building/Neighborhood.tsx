import { Checkbox } from '@components/shared';
import {
  BankIcon,
  CoffeeIcon,
  FiltersButtonIcon,
  GroceryIcon,
  GymIcon,
  RestaurantIcon,
  RightArrowIcon,
  SchoolIcon,
  ShopIcon,
} from '@components/shared/Icons';
import { B2, H4, H5 } from '@components/shared/Typography';
import { Property } from '@models/Property';
import React, { FC, ReactNode, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import NearbyMap from './NearbyMap';
const checkboxOptions: { label: string; name: string; icon: ReactNode }[] = [
  {
    label: 'Schools',
    name: 'school',
    icon: <SchoolIcon />,
  },
  {
    label: 'Restaurants',
    name: 'restaurant',
    icon: <RestaurantIcon />,
  },
  {
    label: 'Groceries',
    name: 'supermarket',
    icon: <GroceryIcon />,
  },
  {
    label: 'Coffee',
    name: 'cafe',
    icon: <CoffeeIcon />,
  },
  {
    label: 'Banks',
    name: 'bank',
    icon: <BankIcon />,
  },
  {
    label: 'Shops',
    name: 'shop',
    icon: <ShopIcon />,
  },
  {
    label: 'Fitness',
    name: 'gym',
    icon: <GymIcon />,
  },
];

const InterestsModal: FC<{
  filters: { [key: string]: boolean };
  setFilters: (item: { [key: string]: boolean }) => void;
  setShowInterestsModal: (item: boolean) => void;
}> = ({ filters, setFilters, setShowInterestsModal }) => {
  const [checkedOptions, setCheckedOptions] = useState(filters);
  return (
    <div
      className="p-2 pt-6 pl-4 pr-6 bg-white neighborhood-options"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: '100%',
        overflow: 'scroll',
      }}
    >
      <H5 className="font-medium mb-4">Interests</H5>
      <p className="text-16px mb-6 font-circular" style={{ opacity: 0.65, width: 228 }}>
        Select points of interests that are important for you.
      </p>
      {checkboxOptions.map((option) => (
        <div key={option.name}>
          <Checkbox
            name={option.name}
            value={checkedOptions?.[option.name]}
            label={
              <div className="flex items-center">
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </div>
            }
            className="mt-3"
            outlineColor="#e0e2e2"
            hoverColor="#8dc4ad"
            onChange={(checked) => {
              setCheckedOptions({ ...checkedOptions, [option.name]: checked });
            }}
          />
        </div>
      ))}
      <button
        className="flex justify-center items-center apply-btn"
        onClick={() => {
          setFilters({ ...checkedOptions });
          setShowInterestsModal(false);
        }}
      >
        <RightArrowIcon />
      </button>
    </div>
  );
};

export default function Neighborhood({ property }: { property?: Property }) {
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({});
  const [showInterestsModal, setShowInterestsModal] = useState(false);

  if (!property)
    return (
      <div>
        <Skeleton height={375} />
      </div>
    );

  return (
    <div className="mt-8">
      <H4 className="font-medium mb-5">Neighborhood</H4>
      <div className="grid grid-cols-7 mt-2 neighborhood" style={{ height: '26rem' }}>
        <div className="hidden md:block col-span-2 p-2 pt-6 pl-4 pr-6 bg-white neighborhood-options">
          <H5 className="font-medium mb-4">Interests</H5>
          <B2 weight="font-book" className="mb-6" style={{ opacity: 0.65 }}>
            Select points of interests that are important for you.
          </B2>
          {checkboxOptions.map((option) => (
            <div key={option.name}>
              <Checkbox
                name={option.name}
                value={filters?.[option.name]}
                label={
                  <div className="flex items-center font-book">
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
                  </div>
                }
                className="mt-3"
                outlineColor="#e0e2e2"
                hoverColor="#8dc4ad"
                onChange={(checked) => {
                  setFilters({ ...filters, [option.name]: checked });
                }}
              />
            </div>
          ))}
        </div>

        <div className="col-span-7 md:col-span-5 relative">
          <button
            onClick={() => {
              setShowInterestsModal(true);
            }}
            className="block bg-white md:hidden flex justify-center items-center interests-btn"
          >
            <FiltersButtonIcon />
          </button>

          {showInterestsModal && (
            <InterestsModal filters={filters} setFilters={setFilters} setShowInterestsModal={setShowInterestsModal} />
          )}

          {property && (
            <NearbyMap
              filters={filters}
              lat={property.coordinates.coordinates[1]}
              lng={property.coordinates.coordinates[0]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
