import React from 'react';
import '../../../../../public/static/assets/css/blog.css';

interface Props {
  string: string;
}

const NoCitySearchResults: React.FC<Props> = ({ string = '' }: Props) => {
  return (
    <div
      className="col-span-3 mt-20 flex justify-center items-center flex-col no-result"
      style={{ height: '70%', width: '100%' }}>
      <p className="font-medium circular text-color text-center pt-5 pb-2" style={{ fontSize: 30 }}>
        No results
      </p>
      <p className="circular text-color text-center" style={{ fontSize: 16, width: 200 }}>
        Try another {string}!
      </p>
    </div>
  );
};

export default NoCitySearchResults;
