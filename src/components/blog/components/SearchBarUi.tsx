import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchGlass } from '@components/shared/Icons';
import { LoadingSpinner } from '@components/shared';
import Button from './ButtonUi';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  home: any | undefined;
  classes?: string | undefined;
  value: string | '';
  onChange: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ home = true, classes = '', value = '', onChange }: Props) => {
  const [clickedHomeButton, setClickedHomeButton] = useState<boolean>(false);
  const [clickedSearchButton, setClickedSearchButton] = useState<boolean>(false);

  useEffect(() => {
    setClickedSearchButton(false);
  }, [onChange]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  const homeButtonRender = (): JSX.Element => {
    if (home === false) {
      return (
        <div className="home-button">
          <Link href="/blog">
            <button
              type="button"
              onClick={() => {
                setClickedHomeButton(true);
              }}>
              <Button
                title={!clickedHomeButton ? '🏠' : <LoadingSpinner color="#000000" />}
                selected={false}
                classes="md:mx-0 mx-2"
                minWidth={70}
              />
            </button>
          </Link>
        </div>
      );
    }
    return <div />;
  };

  return (
    <div className="flex gap-4">
      {homeButtonRender()}
      <form onSubmit={handleSubmit} className={`flex relative ${classes} w-full md:w-60 items-center`}>
        <input
          className="search-bar font-circular h-10 px-5 pr-15 py-6 md:py-0 rounded-lg text-sm focus:outline-none w-full md:w-60"
          name="search"
          placeholder="Search"
          value={value}
          onChange={(e): void => onChange(e.target.value)}
        />
        <Link href={`/blog/search/${value}`}>
          <button
            type="button"
            onClick={() => {
              setClickedSearchButton(true);
            }}>
            <button type="submit" className="absolute right-0 top-0 mt-4 md:mt-3 mr-6 outline-none">
              {!clickedSearchButton ? <SearchGlass /> : <LoadingSpinner color="#000000" />}
            </button>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
