import React, { useEffect } from 'react';
import { CardHouse, CreditCard } from '@components/shared/Svgs';
import { H2 } from '@components/shared/Typography';

import animate, { unmountAnimation } from './js/anime';
import FaqContainer from '../../shared/Faq/FaqContainer';

const Cashback: React.FC = () => {
  useEffect(() => {
    animate();
    return () => unmountAnimation();
  }, []);

  return (
    <div className="w-full relative py-10 md:mb-10 mb-0 flex flex-col items-center justify-center content-center">
      <div className="z-20 pl-18 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4">
        <H2 className="pt-10 pb-5 md:py-10 text-left">More About Cash Back</H2>
        <div className="w-full md:flex block">
          <div className="lg:w-7/12 w-full block">
            <FaqContainer
              ellipsisAfter={0}
              faqs={[
                {
                  question: 'Cash back depends on the building',
                  answer:
                    'Each building offers its own amount of cash back. The cash back is determined through what the building pays Lighthouse.',
                },
                {
                  question: 'Easy digital cash back payments',
                  answer:
                    "Whether it's a simple 'lump sum' offering or a monthly recurring monthly payment, cash transfers are easily made directly to your bank account.",
                },
                {
                  question: 'Lighthouse is trying to save you money at each turn',
                  answer:
                    'Savings from cash back add up, but so do low rents and apartment specials. We look for all the ways to save you money.',
                },
              ]}
            />
          </div>
          <div
            className="w-full md:block hidden mx-auto font-circular relative"
            style={{ width: '500px', top: '50px' }}>
            <div className="block relative mx-auto" style={{ top: '-90px' }}>
              <div className="cashback-container animated-cashback-container">
                <div className="box top">
                  <CardHouse />
                </div>
                <div className="seperators">
                  <div className="sep sep-left">
                    <div className="line" />
                    <div className="dot" />
                  </div>
                  <div className="sep sep-right">
                    <div className="line" />
                    <div className="dot" />
                  </div>
                </div>
                <div className="box bottom">
                  <CreditCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cashback;
