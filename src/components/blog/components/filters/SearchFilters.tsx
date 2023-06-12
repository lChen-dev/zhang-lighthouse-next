import React from 'react';
import { H3 } from '@components/shared/Typography';
import SearchBar from '../SearchBarUi';

interface Props {
  home: any;
  blogTitle: string;
  data: any;
  searchKeyword: string;
  onSearchTextChange: (text: string) => void;
}

/* search bar function */

const Filters: React.FC<Props> = ({ home, blogTitle, data, searchKeyword, onSearchTextChange }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="col-span-2 xl:col-span-3">
        <div className="flex w-full flex-wrap items-center justify-center px-3 lg:px-0 md:justify-between sm:justify-between xsm:justify-between">
          <H3 className="md:pb-0 pb-4">{blogTitle.length > 0 ? blogTitle : ''}</H3>
          <SearchBar home={home} value={searchKeyword} onChange={(text: string): any => onSearchTextChange(text)} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
