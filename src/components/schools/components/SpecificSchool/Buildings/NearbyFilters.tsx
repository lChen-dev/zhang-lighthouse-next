import React from 'react';

import { B2 } from '@components/shared/Typography';
import { Checkbox } from '@components/shared';
import { SuperMarketIconNearby, RestaurantIconNearby } from '@components/shared/Icons';

interface Props {
  nearbyFilters: any;
  setNearbyFilters: (filters: any) => void;
}
 
const NearbyFilters: React.FC<Props> = ({ nearbyFilters, setNearbyFilters }: Props) => {
  return (
    <div className="w-full relative flex flex-row items-center hidden md:block">
      <div className="flex flex-row items-center z-20 pl-18 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4 overflow-auto">
        <B2 className="text-left mr-4" color="text-gray-soft">
          Nearby Interests:{' '}
        </B2>
        {/* ======= */}
        <div>
          <Checkbox
            name="supermarket"
            value={nearbyFilters.groceries}
            label={
              <>
                <SuperMarketIconNearby />
                Groceries
              </>
            }
            outlineColor="#C0D4D4"
            hoverColor="#C0D4D4"
            onChange={(checked) => {
              setNearbyFilters({
                ...nearbyFilters,
                groceries: checked,
              });
            }}
          />
        </div>
        <div>
          <Checkbox
            name="restaurant"
            value={nearbyFilters.restaurants}
            label={
              <>
                <RestaurantIconNearby />
                Restaurants
              </>
            }
            outlineColor="#C0D4D4"
            hoverColor="#C0D4D4"
            onChange={(checked) => {
              setNearbyFilters({
                ...nearbyFilters,
                restaurants: checked,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NearbyFilters;
