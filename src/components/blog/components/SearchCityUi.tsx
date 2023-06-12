import React, { useState, useEffect } from 'react';
import { B2 } from '@components/shared/Typography';
import { SearchGlassSmall } from '@components/shared/Icons';
import { LoadingSpinner } from '@components/shared';
import { cities } from '@components/inquiry/city-data';
import Link from 'next/link';
import { processCityString } from '@hooks/blog';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  value: string;
  onChange: (text: any) => void;
  onClick: (text: any) => any;
}

const SearchCity: React.FC<Props> = ({ value, onChange, onClick }: Props) => {
  const [citiesResults, setCitiesResults] = useState<any>([]);
  const [clickedSearchButton, setClickedSearchButton] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(function searchSpinner() {
      setClickedSearchButton(false);
    }, 1000);
  }, [onChange]);

  function handleCityClick(name: string): void {
    onChange(name);
    setCitiesResults([]);
    onClick(name);
  }

  function handleInputChange(keyword: string): void {
    const result = cities.filter((elem: any) => {
      const e = elem;
      return e.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });
    onChange(keyword);
    if (keyword !== '') {
      setCitiesResults(result);
    } else {
      setCitiesResults([]);
    }
  }

  const CitySearchButton = (): JSX.Element => {
    return (
      <div className="relative w-full h-full">
        <div className="relative w-full bg-transparent mx-5">
          <input
            className="search-city-input font-circular h-10 pr-10 bg-transparent rounded-lg text-sm focus:outline-none w-full"
            name="search"
            placeholder="Search City"
            autoComplete="off"
            value={value}
            onChange={(e: any): any => {
              handleInputChange(e.target.value);
            }}
          />
          <div className="search-city-button absolute right-0 top-0 mt-3 md:mt-3 mr-10 outline-none">
            {!clickedSearchButton ? <SearchGlassSmall /> : <LoadingSpinner color="#000000" />}
          </div>
        </div>
        {citiesResults && citiesResults?.length > 0 && (
          <div className="cities-dropdown px-5">
            <div className="border-t border-black -mx-2 mb-4" style={{ borderColor: '#C4C4C4' }} />
            <div className="flex flex-col items-start">
              {citiesResults?.map((city: string) => {
                return (
                  <Link href={`/blog/city-guide/${processCityString(city)}`}>
                    <button
                      type="button"
                      onClick={(): any => {
                        setClickedSearchButton(true);
                      }}>
                      <button
                        key={city}
                        type="button"
                        className="mb-4 w-full text-left focus:outline-none"
                        onClick={(): any => {
                          handleCityClick(city);
                        }}>
                        <B2>{city}</B2>
                      </button>
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        background: '#F8F8F8',
        boxShadow: '0px 4.53333px 9.06667px rgba(0, 0, 0, 0.2)',
        borderRadius: citiesResults && citiesResults.length > 0 ? '8px 8px 0px 0px' : '8px',
        width: 'max-content',
      }}
      className="h-10 flex-2 mr-2 rounded-lg text-sm">
      {CitySearchButton()}
    </div>
  );
};

export default SearchCity;
