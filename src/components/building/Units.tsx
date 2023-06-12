import { formatPriceRange } from '@utils/format';
import { B1, H4 } from '@components/shared/Typography';
import { Property } from '@models/Property';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const formatBeds = (bedCount: number) => {
  if (bedCount < 1) return 'Studio';
  if (bedCount === 1) return `${bedCount} Bed`;
  return `${bedCount} Beds`;
};

const formatBaths = (bathCount: number) => {
  if (bathCount === 1) return '1 Bath';
  return `${bathCount} Baths`;
};
export default function Units({ property }: { property?: Property }) {
  const [showUnits, setShowUnits] = useState<boolean>(false);

  const floorplans = showUnits ? property?.floorplan : property?.floorplan.slice(0, 5);

  if (!property?.hasLiveData) return null;

  return (
    <div className="w-full mt-8">
      <H4>Units</H4>
      <table className="mt-2 w-full">
        <tr className="bg-gray-mediumlight font-circular text-14px h-10 rounded-sm text-gray border-b border-gray-darklight">
          <th className="text-gray-darkerlight">Model</th>
          <th className="text-gray-darkerlight">Beds</th>
          <th className="text-gray-darkerlight">Bath</th>
          <th className="text-gray-darkerlight">Price</th>
          <th className="text-gray-darkerlight">Sqft</th>
        </tr>
        {floorplans?.map((floorplan) => (
          <tr className="border-b border-gray-darklight text-center font-circular text-18px">
            <td className="py-2">{floorplan.name}</td>
            <td className="font-bold py-2">{formatBeds(floorplan.bedroomCount)}</td>
            <td className="py-2">{formatBaths(floorplan.bathroomCount)}</td>
            <td className="font-bold py-2">{formatPriceRange(floorplan.minRent, floorplan.maxRent)}</td>
            <td className="py-2">{floorplan.sqftAvg}</td>
          </tr>
        ))}
      </table>
      <button
        type="button"
        className="bg-gray-verylight h-16 mt-8 font-bold font-circular w-full"
        onClick={() => setShowUnits(!showUnits)}
      >
        <B1>{showUnits ? 'Hide all units' : 'See all units'}</B1>
      </button>
    </div>
  );
}
