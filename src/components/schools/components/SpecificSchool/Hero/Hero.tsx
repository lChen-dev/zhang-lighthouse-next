import React, { useState } from 'react';

import { H1, H5, B1 } from '@components/shared/Typography';
import { Location, Help } from '@components/shared/Icons';
import HowLighthouseWorkDialog from '@components/shared/HowLighthouseWork/HowLighthouseWork';
import UniversitiesDialog from '../../UniversitiesDialog';
import './css/style.css';

interface Props {
  showUniversitiesDialog: boolean;
  onShowUniDialog: () => void;
  onHideUniDialog: () => void;
  school: any;
}

const Hero: React.FC<Props> = ({ showUniversitiesDialog, onShowUniDialog, onHideUniDialog, school }: Props) => {
  const [showHowLighthouseWorkDialog, setShowHowLighthouseWorkDialog] = useState(false);
  return (
    <>
      <div className="specific-school-banner w-full relative flex flex-col items-start xl:items-center">
        <div className="z-20 flex flex-col items-start w-full max-w-screen-xl mx-auto px-3 pt-10 md:pt-20 laptop-md:px-0 md:pt-30 xl:pt-32">
          <div className="flex items-center md:order-none order-last">
            <div style={{ width: '24px', color: '#2A343A', height: '24px', paddingTop: 2 }} className="md:mr-0 mr-3">
              <Location />
            </div>
            <B1 color="text-gray-soft">
              {school && school.name}{' '}
              <span
                role="button"
                tabIndex={0}
                onMouseDown={() => onShowUniDialog()}
                style={{ color: '#34966D' }}
                className="cursor-pointer pl-0 md:pl-2 font-bold">
                Change University
              </span>
            </B1>
          </div>
          <H1
            weight="font-semibold"
            className="pt-16 md:pt-10 inline-flex flex-col text-left items-start w-4/4 md:w-2/4">
            <span>{school?.header || `Rent at ${school && school.name}`}</span>
          </H1>
          <H5 weight="font-semibold" className="pt-2 pb-10 md:pb-16 inline-flex flex-col text-left items-start">
            <span>Choose from apartments that offer</span>
            <span>cash back with lighthouse.</span>
          </H5>
          <div className="flex items-center cursor-pointer pb-10 md:pb-20">
            <div style={{ width: '24px', color: '#2A343A', height: '24px' }}>
              <Help />
            </div>
            <H5
              weight="font-semibold"
              className="inline-flex flex-col text-left items-start ml-4"
              onClick={() => setShowHowLighthouseWorkDialog(true)}>
              <span style={{ color: '#34966D' }}>How does Lighthouse work?</span>
            </H5>
          </div>
        </div>
        <img
          src={school?.headerImg || '/static/assets/images/specific-school-banner.png'}
          alt="navCover"
          className="banner absolute"
        />
      </div>
      <div className="bg-brand hidden" />
      <HowLighthouseWorkDialog
        show={showHowLighthouseWorkDialog}
        onHide={() => {
          setShowHowLighthouseWorkDialog(false);
        }}
      />
      <UniversitiesDialog
        show={showUniversitiesDialog}
        selectedUni={school?.urlRoute}
        onHide={() => {
          onHideUniDialog();
        }}
      />
    </>
  );
};

export default Hero;
