import React from 'react';

import { H2 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';
import { RightArrowIcon } from '@components/shared/Icons';
import SchoolsListSection from './SchoolsListSection/SchoolsList';

interface Props {
  schools: any;
  onShowUniDialog: () => void;
}

const FindSchool: React.FC<Props> = ({ schools, onShowUniDialog }: Props) => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center content-center z-20 py-5 md:py-10 sm:mb-10 mb-0 pl-18 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4">
      <div className="z-20 pl-0 w-full max-w-screen-xl mx-auto relative pt-10 pb-3 md:py-0 laptop-md:px-0 px-4">
        <H2 className="pb-0 md:pb-20 text-left">Find Your School</H2>
      </div>
      <SchoolsListSection schools={schools} />
      <div className="z-20 mb-5 md:mb-0 flex flex-col items-start w-full max-w-screen-xl mx-auto px-0 laptop-md:px-0">
        {schools && schools.length > 0 && (
          <ButtonCta
            icon={RightArrowIcon}
            className="mt-8 px-4 py-2 md:px-10 text-center md:text-center md:w-auto w-full"
            style={{ background: '#2A343A' }}
            onClick={() => onShowUniDialog()}>
            Browse all universities
          </ButtonCta>
        )}
      </div>
    </div>
  );
};

export default FindSchool;
