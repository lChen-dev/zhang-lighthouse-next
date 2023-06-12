import React from 'react';
import router from 'next/router';

import { B1, H1 } from '@components/shared/Typography';
import Card from '@components/shared/Card';
import { Home, Card as CardIcon, Reload } from '@components/shared/Icons';
import LandingPageSearch from '@components/onboarding/LandingPageSearch';
import StepContent from './component/StepContent';
import ButtonCta from '@components/shared/ButtonCta';

const Hero: React.FC = () => {
  return (
    <>
      <div
        className="w-full relative flex flex-col items-start xl:items-center"
        style={{
          height: '751px',
          maxHeight: '751px',
          minHeight: '751px',
          background: '#F9F9F9',
        }}
      >
        <div className="z-20 flex flex-col items-start w-full max-w-screen-xl mx-auto px-3 pt-10 md:pt-20 laptop-md:px-0 md:pt-30 xl:pt-32">
          <H1 weight="font-semibold" className="pt-24 inline-flex flex-col text-left items-start">
            <span>Find Apartments</span>
            <span>That Pay You</span>
          </H1>
          <ButtonCta href="/start" className="mt-8 px-4 py-2 md:px-10">
            Get Started
          </ButtonCta>
          <B1
            style={{ background: '#F9F9F9CC', boxShadow: '0 0 1rem 1rem #F9F9F9CC' }}
            className="inline-flex flex-col mt-5 md:mt-8 text-left items-start"
          >
            <span className="text-gray-soft">
              Earn up to $1,200 for a new lease with over 7,000 apartment buildings.
            </span>
            <span className="text-gray-soft">It&apos;s the most rewarding apartment search you&apos;ll ever have.</span>
          </B1>
        </div>
        <img
          src="/static/assets/images/main-hero.png"
          alt="navCover"
          className="absolute bottom-0 md:top-0 md:bottom-auto right-0"
          style={{ maxHeight: '825px' }}
        />
      </div>
      <div className="w-full relative max-w-screen-xl mx-auto px-3 laptop-md:px-0">
        <Card
          className="relative flex flex-col md:flex-row w-full py-2 md:py-10 md:px-2"
          style={{ top: '-88px', maxWidth: '770px' }}
        >
          <StepContent text="Move into an apartment that offers cash back" icon={Home} />
          <StepContent borderLeft text="Connect your bank account" icon={CardIcon} />
          <StepContent borderLeft text="Start renting and earn cash back" icon={Reload} />
        </Card>
      </div>
      <div className="bg-brand hidden" />
    </>
  );
};

export default Hero;
