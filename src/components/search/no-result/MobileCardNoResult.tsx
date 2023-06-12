import { NoResult } from '@components/shared/Icons';
import { B2, B3 } from '@components/shared/Typography';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

export const MobileCardNoResult: FC = () => {
  const router = useRouter();
  const { query, pathname } = router;

  return (
    <div className="no-result-mobile-card">
      <div className="flex justify-center items-center">
        <NoResult height={85} />
        <div className="flex justify-center items-start flex-col" style={{ width: 200 }}>
          <p className="font-medium circular text-color text-left pt-3 pb-2" style={{ fontSize: 24 }}>
            No results
          </p>
          <B3 className="circular text-color text-left" weight="font-book">
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
          </B3>
        </div>
      </div>
    </div>
  );
};

export default MobileCardNoResult;
