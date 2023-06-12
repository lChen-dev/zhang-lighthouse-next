import React from 'react';
import '../../../../../public/static/assets/css/blog.css';

interface Props {
  clearHandler: any | undefined;
  string: string;
}

const NoSearchResults: React.FC<Props> = ({ string = '', clearHandler = null }: Props) => {
  return (
    <div
      className="col-span-3 mt-20 flex justify-center items-center flex-col no-result"
      style={{ height: '70%', width: '100%' }}>
      <p className="font-medium circular text-color text-center pt-5 pb-2" style={{ fontSize: 30 }}>
        No results
      </p>
      <p className="circular text-color text-center" style={{ fontSize: 16, width: 200 }}>
        Try to use another {string} or
        <span
          role="button"
          tabIndex={0}
          className="cursor-pointer text-green-600 font-medium circular"
          onMouseDown={(): void => {
            clearHandler();
          }}>
          {' '}
          reset search results
        </span>
      </p>
    </div>
  );
};

export default NoSearchResults;
