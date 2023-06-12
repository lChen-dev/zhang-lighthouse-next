import React from 'react';
import dynamic from 'next/dynamic';

import './success.css';

const SearchResults = dynamic(() => import('./Results'), { ssr: false });

const SuccessPage = (): React.ReactElement => {
  return (
    <div>
      <div className="w-full flex flex-col m-auto">
        <div className="w-full">
          <div>
            <SearchResults />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
