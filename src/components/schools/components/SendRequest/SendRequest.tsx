import React from 'react';

import { H2 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';

const SendRequest = (): React.ReactElement => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center content-center py-10 md:mb-0 mb-0">
      <div className="z-20 w-full max-w-screen-xl mx-auto relative p-6 py-20 md:p-16" style={{ background: '#F8F8F8' }}>
        <H2 style={{ maxWidth: '650px' }} className="pb-10 bg-transparent px-2 md:px-0 text-left w-full">
          Don&apos;t see your school? <br /> Let us know.
        </H2>
        <div className="hidden md:block">
          <div
            className="flex p-2 rounded sm:flex-wrap"
            style={{
              background: 'linear-gradient(0deg, #EEEEEE, #EEEEEE), linear-gradient(0deg, #F4F4F4, #F4F4F4)',
            }}>
            <form className="flex-1 sm:flex-auto">
              <input
                placeholder="Enter school name..."
                type="text"
                className="w-1/3 h-full px-4 bg-transparent border-0 outline-none border-r placeholder-black placeholder-opacity-75"
                style={{
                  borderColor: 'rgba(42, 52, 58, 0.15)',
                }}
              />
              <input
                placeholder="Full Name"
                type="text"
                className="w-1/3 h-full px-4 bg-transparent border-0 outline-none border-r placeholder-black placeholder-opacity-75"
                style={{
                  borderColor: 'rgba(42, 52, 58, 0.15)',
                }}
              />
              <input
                placeholder="Email"
                type="email"
                className="w-1/3 h-full px-4 bg-transparent border-0 outline-none placeholder-black placeholder-opacity-75"
              />
            </form>
            <ButtonCta href="/" variant="primary" className="justify-center">
              Send Request
            </ButtonCta>
          </div>
        </div>
        <div className="block md:hidden">
          <ButtonCta href="/" variant="primary" className="justify-center">
            Search my School
          </ButtonCta>
        </div>
      </div>
    </div>
  );
};

export default SendRequest;
