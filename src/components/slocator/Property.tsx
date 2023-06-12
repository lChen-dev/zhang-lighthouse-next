/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
/* eslint-disable radix */
import React from 'react';
import { numberWithCommas } from '@utils/format';

class Property extends React.Component {
  render() {
    const { building, openPicsModal, openFloorPlanModal, onMouseEnter, onMouseLeave, updateClientList, clientList, removeFromClientList }: any = this.props;
    const leadImage = building.images[0].src;
    const formattedCashBack = parseInt(building.cashBack.toString().replace(/\s|[a-z]|\,|\$/gim, ''));
    const bedName = (name: number) => {
      if (name === 0.5) return 'STU';
      if (name === 1) return '1';
      if (name === 2) return '2';
      if (name === 3) return '3';
      if (name === 4) return '4';
      return '4+';
    };

    const bedroomGroups: any = {};

    building.floorPlans.forEach((floorPlan: any) => {
      if (!bedroomGroups[floorPlan.bedrooms]) {
        bedroomGroups[floorPlan.bedrooms] = [];
      }
      bedroomGroups[floorPlan.bedrooms].push(floorPlan);
    });

    return (
      <div className="w-full sm:px-2 sm:inline-flex pb-3 z-10" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="sm:mt-0 w-full sm:flex-shrink">
          <div>
            <div className="relative w-full">
              <div className="bg-white rounded-lg shadow-lg h-48 flex overflow-hidden">
                {
                  leadImage &&
                    <img src={leadImage} className="w-4/12" />
                }
                <div className="px-4 py-4 w-5/12">
                  <div className="flex items-baseline">
                    {
                      formattedCashBack ?
                      <span className="mr-2 inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                        $
                        {formattedCashBack}
                        + Cash Back
                      </span>
                      :
                      <span></span>
                    }
                    <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                      {(() => {
                        const beds = `${
                          building.floorPlans.find((floorPlan: any) =>
                            floorPlan.bedrooms) != null
                            ? 'Studio'
                            : bedName(building.minBed)
                        } - ${bedName(building.maxBed)}`;
                        return `${Array.from(new Set(beds.split('-').map((e) => e.toLowerCase().trim()))).join(' - ')} BEDS`;
                      })()}
                    </div>
                  </div>
                  <h4 className="mt-1 text-gray-900 font-semibold text-lg">
                    {building.name.length >= 20 ? `${building.name.slice(0, 17)}...` : building.name}
                  </h4>
                  <div className="grid grid-cols-2">
                    {Object.entries(bedroomGroups).map(([bedroomGroup, floorPlans]: any, index: number) => {
                      let minPrice = Infinity;
                      floorPlans.forEach((floorPlan: any) => {
                        if (floorPlan.minPrice < minPrice) {
                          minPrice = floorPlan.minPrice;
                        }
                      });
                      return (
                        <div className="mt-0" key={`${bedroomGroup}__${index}`}>
                          <span className="mr-1 text-sm text-gray-600">{bedroomGroup}BR</span>
                          <span className="text-gray-900 text-xs">
                            {!minPrice && minPrice.toString().trim() === '0' ? <small className="text-xs">call for rent</small> : `$${numberWithCommas(minPrice)}+`}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="flex flex-col space-y-2 w-3/12 justify-center pr-4">
                  <button
                    onClick={() => openPicsModal(building)}
                    type="button"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 bottom-0 rounded"
                  >
                    See All Pics
                  </button>
                  <button
                    onClick={() => openFloorPlanModal(building)}
                    type="button"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 bottom-0 rounded"
                  >
                    View Floorplans
                  </button>
                  {
                    updateClientList && clientList.includes(building) === false &&
                    <button
                      onClick={() => updateClientList(building)}
                      type="button"
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 bottom-0 rounded"
                    >
                      Add
                    </button>
                  }
                  {
                    updateClientList && clientList.includes(building) === true &&
                    <button
                      onClick={() => updateClientList(building)}
                      type="button"
                      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 bottom-0 rounded"
                    >
                      Added
                    </button>
                  }
                  {
                    removeFromClientList &&
                    <button
                      onClick={() => updateClientList(building)}
                      type="button"
                      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 bottom-0 rounded"
                    >
                      Remove
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Property;
