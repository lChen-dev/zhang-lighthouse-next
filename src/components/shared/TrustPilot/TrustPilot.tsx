/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { B1, H2 } from '@components/shared/Typography';

import StarRating from './component/TrustPilotRating';
import TrustPilotSlider from './component/TrustPilotSlider';
import { slideLength } from './component/TrustPilotSlides';
import './css/style.css';

const TrustPilot = (): React.ReactElement => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center content-center">
      <div className="z-20 pt-10 md:pt-20 pb-10 md:mb-10 mb-0 pl-18 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4 overflow-hidden">
        <H2 className="pt-10 pb-4 text-left">Lighthouse Love</H2>
        <B1 className="text-left" style={{ opacity: 0.6 }}>
          Most of our customers come through word of mouth.
        </B1>
        <div className="w-full sm:flex block pt-5">
          <div
            className="sm:w-2/12 trustPilotBorder w-full mobile-xs:block md:block lg:hidden block pt-10 mr-4"
            style={{ borderRight: '1px solid rgba(0,0,0,.1)', width: '180px' }}>
            <StarRating rating={4.8} reviews={52} />
          </div>
          <div className="block bg-white lg:w-10/12 w-full relative rowSliderContainer">
            <TrustPilotSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustPilot;
