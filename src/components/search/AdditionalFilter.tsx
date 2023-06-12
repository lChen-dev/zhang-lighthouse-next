import React, { FC, useEffect, useRef, useState } from 'react';
import { B1, B2, H4 } from '@components/shared/Typography';
import PriceSelect from '@components/search/seerch-select/PriceSelect';
import Checkbox from '@components/shared/Checkbox';
import { ParsedUrlQuery } from 'querystring';
import { NextRouter } from 'next/router';
import { ArrowLeft, FiltersButtonIcon } from '@components/shared/Icons';
import SelectBedroom from '@components/search/seerch-select/BedroomSelect';
import { useWindowWidth } from '@react-hook/window-size';

const AMENITIES = [
  'Parking',
  'Fitness Center',
  'Pool',
  'Business Center',
  'Billiards',
  'Elevator',
  'EV Charging',
  'Pet Friendly',
  'Laundry In Unit',
  'Balcony',
  'Air Conditioner',
  'Grilling Area',
  'Views',
  'Rooftop',
  'Media Center',
  'Bike Storage',
  'Gameroom',
  'Storage Space',
  'Concierge',
  'Laundry Facilities',
  'Playground',
  'Gated',
  'Patio',
  'Tile Floor',
  'Walk-in Closet',
  'Laundry Hookups',
  'Ceiling Fans',
  'Hardwood Floor',
  'Fast Internet',
  'Carpet Floor',
  'Vinyl Floor',
  'Fireplace',
  'Furnished Available',
  'Lofts',
  'Wheelchair Access',
  'All Bills Paid',
  'Trash Service',
  'Package Service',
];

type FilterProps = {
  showAdditionalPreferences: boolean;
  setShowAdditionalPreferences: (showAdditionalPreferences: boolean) => void;
  query: ParsedUrlQuery;
  router: NextRouter;
  pathname: string;
  updateQuery: (newArgs: { [key: string]: any }) => void;
  isDark: boolean;
};

const AdditionalFilter: FC<FilterProps> = ({
  showAdditionalPreferences,
  setShowAdditionalPreferences,
  query,
  router,
  pathname,
  updateQuery,
  isDark,
}) => {
  const mainAdditionalFilterRef = useRef<HTMLDivElement>(null);
  const additionalFilterRef = useRef<HTMLDivElement>(null);
  const [checkedAmenities, setCheckedAmenities] = useState<string[]>([]);
  const [mainFilters, setMainFilters] = useState<Record<string, any>>({});
  const [counter, setCounter] = useState(0);
  const width = useWindowWidth();

  const handleClickOutside = (e: any) => {
    if (
      mainAdditionalFilterRef?.current?.contains(e.target as Node) ||
      additionalFilterRef?.current?.contains(e.target as Node)
    ) {
      return;
    }
    setShowAdditionalPreferences(false);
  };

  useEffect(() => {
    if (showAdditionalPreferences) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAdditionalPreferences]);

  useEffect(() => {
    setCheckedAmenities(
      query.amenities ? (typeof query.amenities === 'string' ? [query.amenities] : query.amenities) : [],
    );
    const newQuery = {
      bedrooms: query.bedrooms,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
    };

    setMainFilters(newQuery);

    let filterCounter = 0;
    if (width < 768) {
      if (newQuery.bedrooms) {
        filterCounter += 1;
      }
      if (newQuery.minPrice || newQuery.maxPrice) {
        filterCounter += 1;
      }
    }

    if (query?.amenities?.length) {
      filterCounter += typeof query.amenities === 'string' ? 1 : query.amenities.length;
    }

    setCounter(filterCounter);
  }, [query]);

  const updateSearch = () => {
    let filterCounter = 0;
    if (width < 768) {
      if (mainFilters.bedrooms) {
        filterCounter += 1;
      }
      if (mainFilters.minPrice || mainFilters.maxPrice) {
        filterCounter += 1;
      }
    }

    if (checkedAmenities.length) {
      filterCounter += checkedAmenities.length;
    }

    setCounter(filterCounter);
    updateQuery({ amenities: checkedAmenities, ...mainFilters });
  };

  return (
    <div ref={mainAdditionalFilterRef} className="col-span-1 relative flex items-center justify-center ml-2">
      <div style={{ position: 'relative', height: 24 }} className="hover-wrapper">
        <button
          type="button"
          onClick={() => setShowAdditionalPreferences(!showAdditionalPreferences)}
          style={{ outline: '0px none', border: '0px none' }}
          className="filters-btn">
          {counter > 0 && <div className="circular counter">{counter}</div>}
          <FiltersButtonIcon />
        </button>
        <div className={`btn-bg ${showAdditionalPreferences && 'active'}`} />
      </div>

      <div
        ref={additionalFilterRef}
        className={`${
          showAdditionalPreferences ? 'block' : 'hidden'
        } md:absolute bg-white additional-preferences-panel additional-filters`}>
        <H4 className="bg-white p-4 font-bold flex justify-between items-center filter-header">
          <div className="flex items-center">
            <div className="md:hidden pr-5 text-color" onClick={() => setShowAdditionalPreferences(false)}>
              <ArrowLeft />
            </div>
            <span className="text-color">Additional Filters</span>
          </div>
          <span
            className="float-right text-xl mt-1 font-light cursor-pointer"
            onClick={() => {
              setCheckedAmenities([]);
              setMainFilters({});
              setCounter(0);
              const newQuery = { ...query };
              delete newQuery.amenities;
              if (width < 768) {
                delete newQuery.bedrooms;
                delete newQuery.minPrice;
                delete newQuery.maxPrice;
              }
              router.replace({
                pathname,
                query: newQuery,
              });
            }}>
            <B1 className="font-medium reset-filters with-high-opacity">Reset</B1>
          </span>
        </H4>
        <div className="h-full md:max-h-screen-50 max-h-screen-100 p-4 overflow-y-scroll mb-2 md:pt-0 filter-content">
          <B2 className="md:hidden mb-2">Bedrooms:</B2>
          <div className="md:hidden mb-2">
            <SelectBedroom
              value={mainFilters?.bedrooms}
              handleSelect={(value) => setMainFilters({ ...mainFilters, bedrooms: value })}
            />
          </div>
          <B2 className="md:hidden block mb-2">Max Price:</B2>
          <PriceSelect
            arrowColor="#34966D"
            className="md:hidden block"
            absolute={false}
            minValue={mainFilters.minPrice}
            maxValue={mainFilters.maxPrice}
            handleSelect={(value) => setMainFilters({ ...mainFilters, ...value })}
          />
          <B2 className="my-4 md:mt-0  with-high-opacity" weight="font-book" style={{ opacity: 0.65 }}>
            Amenities:
          </B2>
          {AMENITIES.map((amenity) => (
            <Checkbox
              key={amenity}
              name="addOpts[]"
              label={<B2 weight="font-book">{amenity}</B2>}
              outlineColor={isDark ? '#3c4246' : '#e0e2e2'}
              hoverColor={isDark ? '#3c4246' : '#8dc4ad'}
              value={
                checkedAmenities.length
                  ? checkedAmenities.includes(amenity === 'Pet Friendly' ? 'Cat Friendly' : amenity)
                  : false
              }
              className="mb-2 flex-none font-circular"
              onChange={(checked) => {
                if (checked) {
                  if (amenity === 'Pet Friendly') {
                    setCheckedAmenities([...checkedAmenities, 'Cat Friendly', 'Dog Friendly']);
                    return;
                  }
                  setCheckedAmenities([...checkedAmenities, amenity]);
                } else {
                  if (amenity === 'Pet Friendly') {
                    setCheckedAmenities(
                      checkedAmenities.filter((e: string) => !['Dog Friendly', 'Cat Friendly'].includes(e)),
                    );
                    return;
                  }
                  setCheckedAmenities(checkedAmenities.filter((e: string) => e !== amenity));
                }
              }}
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full h-12 font-circular font-bold show-results"
          onClick={() => {
            setShowAdditionalPreferences(false);
            updateSearch();
          }}>
          Show Results
          <svg
            className="inline-block ml-2 mb-1"
            width="8"
            height="16"
            viewBox="0 0 8 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 8.00033L0.982456 15.3337L0 14.307L6.03509 8.00033L0 1.69366L0.982456 0.666992L8 8.00033Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdditionalFilter;
