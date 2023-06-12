/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
/* eslint-disable radix */
import React from 'react';
import { numberWithCommas } from '@utils/format';

class Property extends React.Component {
  render() {
    const { building, openApplyModal, onMouseEnter, onMouseLeave } = this.props;
    const r =
      building.cash_reward &&
      building.cash_reward !== null &&
      building.cash_reward !== ''
        // eslint-disable-next-line no-useless-escape
        ? parseInt(building.cash_reward.toString().replace(/\s|[a-z]|\,|\$/gim, ''))
        : 0;
    const bedName = (name) => {
      if (name === 1) return '1';
      if (name === 2) return '2';
      if (name === 3) return '3';
      if (name === 4) return '4';
      return '4+';
    };
    const bedStrName = (name) => {
      if (name === 0.5) return 'STU';
      if (name === 1) return '1 BR';
      if (name === 2) return '2 BR';
      if (name === 3) return '3 BR';
      if (name === 4) return '4 BR';
      return '4 BR+';
    };
    return (
      <div className="w-full lg:w-1/2 sm:px-2 sm:inline-flex pb-3 z-10" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="sm:mt-0 w-full sm:flex-shrink">
          <div>
            <div className="relative pb-5/6 h-64 w-full sm:w-full">
              <img src={building.image && building.image[0] ? building.image[0].file : ''} alt="" className="absolute inset-0 h-full w-full rounded-lg shadow-md object-cover" />
            </div>
            <div className="relative w-full -mt-16">
              <div className="bg-white rounded-b-lg px-4 py-4 shadow-lg h-48">
                <div className="flex items-baseline">
                  <span className="inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                    $
                    {r}
                    + Cash Back
                  </span>
                  <div className="ml-2 text-xs text-gray-600 font-semibold uppercase tracking-wide">
                    {(() => {
                      const beds = `${
                        Object.keys(building.prices).find((e) =>
                          e.toLowerCase()
                            .trim()
                            .includes('studio')) != null
                          ? 'Studio'
                          : bedName(building.minBed)
                      } - ${bedName(building.maxBed)}`;
                      return `${Array.from(new Set(beds.split('-').map((e) => e.toLowerCase().trim()))).join(' - ')} BEDS`;
                    })()}

                  </div>
                </div>
                <h4 className="mt-1 text-gray-900 font-semibold text-lg">
                  {building.property_name.length >= 20 ? `${building.property_name.slice(0, 17)}...` : building.property_name}
                </h4>
                <div className="grid grid-cols-2">
                  {(() => Object.keys(building.prices).filter((e) => (e.includes('BR') && e.endsWith('Min'))).sort().map((bed) => {
                    const name = bedStrName(parseInt(bed.replace(/br|min|\s/igm, '')));
                    const price = building.prices[bed];
                    return (
                      <div className="mt-0">
                        <span className="mr-1 text-sm text-gray-600">{name}</span>
                        <span className="text-gray-900 text-xs">
                          {!price && price.toString().trim() === '0' ? <small className="text-xs">call for rent</small> : `$${numberWithCommas(price)}+`}
                        </span>
                      </div>
                    );
                  }))()}
                </div>
                <button
                  onClick={() => openApplyModal(building)}
                  type="button"
                  className="mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 w-10/12 bottom-0 mb-5 rounded absolute"
                >
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Property;
