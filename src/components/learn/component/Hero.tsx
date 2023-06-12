import React from 'react';

import { B1, H1 } from '@components/shared/Typography';
import { LongDownArrow } from '@components/shared/Svgs';

const Hero: React.FC = () => (
  <div
    className="w-full relative flex flex-col items-start xl:items-center"
    style={{
      height: '650px',
      maxHeight: '650px',
      minHeight: '650px',
      background: '#F9F9F9',
    }}>
    <div className="z-20 flex flex-col items-start w-full max-w-screen-xl mx-auto px-6 pt-0 md:pt-20 laptop-md:px-0 md:pt-30 xl:pt-32">
      <H1 weight="font-semibold" className="pt-24 md:pt-32 inline-flex flex-col text-left items-start">
        <div style={{ background: '#F9F9F9CC', boxShadow: '0 0 1rem 1rem #F9F9F9CC' }} className="flex flex-col">
          <span>Let&apos;s talk more</span>
          <span>about the cash back.</span>
        </div>
      </H1>
      <B1
        style={{ background: '#F9F9F9CC', boxShadow: '0 0 1rem 1rem #F9F9F9CC' }}
        className="inline-flex flex-col mt-2 lg:mt-8 text-left items-start">
        <span className="text-gray-soft">
          Sounds unbelievable, right? Let&apos;s turn you into a believer — here&apos;s how it works.
        </span>
      </B1>
    </div>
    <div className="relative w-full max-w-screen-xl mx-auto mt-10 xl:mt-0 pl-6 overflow-visible z-10">
      <LongDownArrow className="absolute md:hidden" style={{ top: '3rem' }} />
      <img
        src="/static/assets/images/learn-hero.png"
        alt="navCover"
        className="md:absolute md:right-0"
        style={{ top: '-19rem', maxHeight: '450px' }}
      />
    </div>
  </div>
);

export default Hero;
