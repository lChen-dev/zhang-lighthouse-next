import React from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { useRouter } from 'next/router';

import { Property } from '@models/Property';

import FilterSort from '@components/search/seerch-select/FilterSort';
import { NoResult } from '@components/shared/Icons';
import { B2 } from '@components/shared/Typography';
import Result from './Result';
import SkeletonSection from './skeleton-section/SkeletonSection';

export interface Props {
  results: Property[];
  resultsStyle?: { [key: string]: string | number | undefined };
  markerSelectedId: string | null;
  onMouseIn: (result: Property) => void;
  onMouseOut: (id: string | null) => void;
  show: boolean | null;
  setShowAuth?: (e?: any) => any;
}

export default function DesktopList({
  results,
  resultsStyle,
  onMouseIn,
  onMouseOut,
  markerSelectedId,
  show,
  setShowAuth,
}: Props) {
  const router = useRouter();
  const { query, pathname } = router;
  const width = useWindowWidth();

  const updateQuery = (newArgs: { [key: string]: any }) => {
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
  };

  if (!show) return null;

  return (
    <div
      className="md:h-screen h-screen-20 md:overflow-y-scroll overflow-y-hidden md:block md:flex flex-col hidden desktop-list-container"
      key={Number.isFinite(width) ? width : Date.now()}
      style={resultsStyle}>
      {results ? (
        <>
          <div className="mb-4">
            {results && !!results.length ? (
              <FilterSort />
            ) : (
              <div className="skeleton">
                <div className="input-skeleton flex items-center justify-between mb-4">
                  <div className="skeleton-box" style={{ margin: 0, padding: 0, width: 188, height: 10 }} />
                  <div>
                    <svg
                      width="14"
                      opacity={0.08}
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 1L7 7L13 1"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          {results.map((result: Property) => (
            <Result
              key={`${result.id}-desktop`}
              result={result}
              onMouseIn={() => onMouseIn(result)}
              onMouseOut={() => onMouseOut(null)}
              hoveredId={markerSelectedId}
              setShowAuth={setShowAuth}
            />
          ))}
        </>
      ) : (
        <SkeletonSection />
      )}
      {results && results.length === 0 && (
        <div className="flex justify-center items-center flex-col no-result" style={{ height: '70%', width: '100%' }}>
          <NoResult />
          <p className="font-medium circular text-color text-center pt-5 pb-2" style={{ fontSize: 30 }}>
            No results
          </p>
          <B2 className="text-color text-center" weight="font-book" style={{ width: 200 }}>
            Try to use another settings or
            <span className="cursor-pointer green-text font-bold circular" onClick={updateQuery}>
              {' '}
              reset search results
            </span>
          </B2>
        </div>
      )}
    </div>
  );
}
