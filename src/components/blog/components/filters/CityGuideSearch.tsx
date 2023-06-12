import React, { useState, useEffect } from 'react';
import { H3 } from '@components/shared/Typography';
import { LoadingSpinner } from '@components/shared';
import Link from 'next/link';
import Button from '../ButtonUi';
import SearchBar from '../SearchBarUi';
import SearchCity from '../SearchCityUi';

interface Props {
  blogTitle: string;
  data: any;
  searchKeyword: string;
  onSearchTextChange: (text: string) => void;
  cityKeyword: string;
  onSearchCityChange: (text: string) => void;
  onSearchCityClick: (text: string) => any;
}

/* city guide search bar ui render */

const CityGuideSearch: React.FC<Props> = ({
  blogTitle,
  data,
  searchKeyword,
  onSearchTextChange,
  cityKeyword,
  onSearchCityChange,
  onSearchCityClick,
}: Props) => {
  const [clickedClearButton, setClickedClearButton] = useState<boolean>(false);

  useEffect(() => {
    setClickedClearButton(false);
  }, [onSearchCityChange]);

  const clearButton = (): JSX.Element => {
    return (
      <div>
        <Link href="/blog/city-guide">
          <button
            type="button"
            onClick={() => {
              setClickedClearButton(true);
            }}>
            <Button
              title={!clickedClearButton ? 'clear' : <LoadingSpinner color="#000000" />}
              selected={false}
              classes="md:mx-0 mx-2"
              minWidth={77}
            />
          </button>
        </Link>
      </div>
    );
  };

  function citySearchRenderHandler(): JSX.Element {
    return (
      <div className="col-span-3 xl:col-span-1">
        <div className="relative w-full flex items-center justify-left px-3 lg:px-0 mb-3 md:mb-0 mt-6 gap-2">
          <SearchCity
            value={cityKeyword}
            onChange={(text): void => onSearchCityChange(text)}
            onClick={(_string: string): any => {
              onSearchCityClick(_string);
            }}
          />
          {clearButton()}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-7">
      <div className="col-span-2 xl:col-span-3">
        <div className="w-full flex flex-wrap items-center justify-between px-3 lg:px-0 md:justify-between">
          <H3 className="md:pb-0 pb-10">{blogTitle.length > 0 ? blogTitle : ''}</H3>
          <SearchBar home={false} value={searchKeyword} onChange={(text: string): any => onSearchTextChange(text)} />
        </div>
      </div>
      {citySearchRenderHandler()}
    </div>
  );
};

export default CityGuideSearch;
