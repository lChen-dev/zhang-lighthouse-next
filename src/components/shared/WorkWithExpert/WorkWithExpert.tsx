import React from 'react';

import { H2, B1 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';
import { Shield } from '@components/shared/Icons';

const WorkWithExpert = (): React.ReactElement => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center content-center pt-10 md:pt-20 mt-0 mb-6">
      <div className="z-20 w-full max-w-screen-xl mx-auto relative p-6 md:p-16 py-12" style={{ background: '#F8F8F8' }}>
        <div style={{ width: '24px', color: '#2A343A', height: '30px' }}>
          <Shield />
        </div>
        <H2
          style={{ maxWidth: '650px' }}
          className="pt-6 pb-1 bg-transparent px-2 md:px-0 md:pl-0 pl-0 text-left w-full">
          Work with expert
        </H2>
        <B1 className="pb-10">Free apartment advice and searching</B1>
        <div className="flex w-full md:content-start content-center md:justify-start justify-center">
          <ButtonCta href="/start" variant="primary" className="w-full justify-center md:w-auto">
            Get started <span className="font-normal text-white"> - it&apos;s free</span>
          </ButtonCta>
        </div>
        <div className="text-center pt-6 block md:hidden">
          <button type="button">
            <a href="/search">
              <B1 color="text-gray-soft">Browse on my own</B1>
            </a>
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src="/static/assets/images/work-with-expert-banner.png"
          alt=""
          className="banner absolute"
          style={{
            zIndex: 20,
            top: '30px',
          }}
        />
      </div>
    </div>
  );
};

export default WorkWithExpert;
