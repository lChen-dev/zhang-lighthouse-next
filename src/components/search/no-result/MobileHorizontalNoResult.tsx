import { NoResult } from '@components/shared/Icons';
import { B2 } from '@components/shared/Typography';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

export const MobileHorizontalNoResult: FC = () => {
  const router = useRouter();
  const { query, pathname } = router;

  return (
    <div className="flex justify-center items-center no-result bg-white" style={{ height: '100%', width: '100%' }}>
      <NoResult height={120} />
      <div className="flex justify-center items-start flex-col" style={{ width: 200 }}>
        <p className="font-medium circular text-color text-left pt-5 pb-2" style={{ fontSize: 30 }}>
          No results
        </p>
        <B2 className="circular text-color text-left" weight="font-book">
          Try to use another settings or
          <span
            onClick={() => {
              const newQuery = { ...query };
              delete newQuery.bedrooms;
              delete newQuery.minPrice;
              delete newQuery.maxPrice;
              delete newQuery.amenities;
              delete newQuery.city;
              router.replace({
                pathname,
                query: newQuery,
              });
            }}
            className="pointer green-text font-bold circular"
          >
            {' '}
            reset search results
          </span>
        </B2>
      </div>
    </div>
  );
};

export default MobileHorizontalNoResult;
