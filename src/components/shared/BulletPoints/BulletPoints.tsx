import React from 'react';

import { H2 } from '@components/shared/Typography';

import Point from './component/Point';

const BulletPoint = (): React.ReactElement => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center content-center py-10 md:mb-10 mb-0">
      <div className="z-20  pl-18 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4 overflow-hidden">
        <H2 className="pb-5 md:py-10 text-left">Why Lighthouse?</H2>
      </div>
      <div className="py-5 block w-11/12 max-w-screen-xl">
        <div className="w-full md:flex block md:pb-5 pb-0">
          <Point
            text="Pay no more in rent"
            subText="Lighthouse offers cash back on all apartment selections on our website around UTD."
          />
          <Point
            text="Specials"
            subText="We show you all the specials, any specials available for apartments will be included with cashback."
          />
        </div>
        <div className="w-full md:flex block pb-5">
          <Point
            text="Assistance"
            subText="Lighthouse has trained real estate professionals ready to answer your questions and assist your application process."
          />
          <Point
            text="Perks"
            subText="Along with specials, Lighthouse has additional perks like discounts on Uber rides and Spotify when renting throw Lighthouse"
          />
        </div>
      </div>
    </div>
  );
};

export default BulletPoint;
