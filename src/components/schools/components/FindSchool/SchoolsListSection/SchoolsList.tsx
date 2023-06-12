import React, { useEffect } from 'react';

import { H3 } from '@components/shared/Typography';
import SchoolCard from './SchoolCard';

interface Props {
  schools: any;
}

const SchoolsListSection: React.FC<Props> = ({ schools }: Props) => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center content-center">
      {schools &&
        schools.map((value: any) => {
          return (
            <div
              key={value?.state}
              className="z-20 sm:mb-20 mb-10 pl-0 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4">
              <H3 className="mt-10 md:mt-0 pb-1 text-left border-b" style={{ borderColor: 'rgba(42, 52, 58, 0.2)' }}>
                {value?.state}
              </H3>
              <div className="flex flex-wrap items-center">
                {value?.schools.map((school: any) => {
                  return <SchoolCard school={school} />;
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SchoolsListSection;
