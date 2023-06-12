import { useWindowWidth } from '@react-hook/window-size';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { Property } from '@models/Property';
import React, { useEffect, useRef, useState } from 'react';
import { BackToMap, ListIcon, MapIcon, NoResult } from '@components/shared/Icons';
import { B2, H4 } from '@components/shared/Typography';
import { useAuth } from 'context/auth';
import FilterSort from './seerch-select/FilterSort';
import MobileResult from './MobileResult';
import MobileCardNoResult from './no-result/MobileCardNoResult';

export interface Props {
  results: Property[];
  resultsStyle: { [key: string]: string | number | undefined };
  markerSelectedId: string | null;
  onMouseIn: (property: Property) => void;
  onMouseOut: (id: string | null) => void;
  onToggle: () => void;
  show: boolean | null;
  HorizontalList: React.ReactNode;
  showHorizontalList: boolean;
  setShowAuth?: (e?: any) => any;
}

export default function MobileVerticalList({
  results,
  markerSelectedId,
  onToggle,
  show,
  HorizontalList,
  showHorizontalList,
  setShowAuth,
}: Props) {
  const router = useRouter();
  const { query, pathname } = router;
  const { user } = useAuth();
  const width = useWindowWidth();
  const listRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(listRef.current ? listRef.current?.scrollTop > 300 : false);

  const handleScroll = () => {
    setIsScrolled(listRef.current ? listRef.current?.scrollTop > 300 : false);
  };

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.addEventListener('scroll', handleScroll);
    }

    return () => listRef?.current?.removeEventListener('scroll', handleScroll);
  }, [listRef]);

  if (width >= 768) return null;

  return (
    <>
      <motion.div
        animate={{
          y: show ? '0' : '100%',
          transitionEnd: {
            display: show ? 'flex' : 'none',
          },
        }}
        ref={listRef}
        className="pt-16 absolute md:hidden w-screen h-screen z-4 overflow-y-scroll overflow-x-hidden p-2 shadow-sm flex flex-col items-center align-center bg-white bg-deep mob-list-container"
        key={Number.isFinite(width) ? `${width}-vert-list` : `${Date.now()}-ver-list`}>
        {results?.length > 0 && (
          <>
            <div style={{ margin: '20px auto', width: '100%', zIndex: 1, paddingTop: 50 }}>
              <div onClick={onToggle} className="text-color" style={{ margin: '5px auto', width: 'fit-content' }}>
                <BackToMap />
              </div>
              <H4 className="mb-1">Units list</H4>
              <FilterSort />
            </div>
            {results.map((result: Property) => (
              <MobileResult
                key={`${result.id}-vertical`}
                result={result}
                onMouseIn={() => null}
                onMouseOut={() => null}
                hoveredId={markerSelectedId}
                scrollIntoView={false}
                type="horizontal"
                setShowAuth={setShowAuth}
              />
            ))}
          </>
        )}
        {results && results.length === 0 && (
          <div className="flex justify-center items-center flex-col no-result" style={{ height: '70%', width: 200 }}>
            <NoResult />
            <p className="font-medium circular text-color text-center pt-5 pb-2" style={{ fontSize: 30 }}>
              No results
            </p>
            <B2 className="circular text-color text-center" weight="font-book">
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
                  onToggle();
                }}
                className="pointer green-text font-bold circular">
                {' '}
                reset search results
              </span>
            </B2>
          </div>
        )}
      </motion.div>
      {width < 768 && results?.length === 0 && <MobileCardNoResult />}
      {width < 768 && (
        <motion.div className="search-footer-wrapper" animate={{ height: showHorizontalList ? 'auto' : 80 }}>
          <div className={`footer-controls ${showHorizontalList && 'reduced'}`}>
            <div
              className={`rounded-full md:hidden font-circular footer-toggle-btn mb-2 ${isScrolled &&
                'scrolled'} ${showHorizontalList && 'reduced'}`}
              onClick={onToggle}>
              {show ? (
                <>
                  <MapIcon />
                  {!isScrolled && 'Show Map'}
                </>
              ) : (
                <>
                  <ListIcon />
                  {!isScrolled && 'Show List'}
                </>
              )}
            </div>
          </div>
          {HorizontalList}
        </motion.div>
      )}
    </>
  );
}
