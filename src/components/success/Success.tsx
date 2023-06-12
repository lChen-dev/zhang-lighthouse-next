import React from 'react';

import { BodyText, Heading, SmallText, SubHeading, SubText } from '@components/shared/ResponsiveFonts';
import { SquareButton } from '@components/shared/Buttons';

import SuccessResults from './Results';

const SuccessPage = (): React.ReactElement => (
  <div className="bg-lightgray pt-32 pb-20">
    <div className="max-w-screen-lg xl:w-4/5 sm:w-5/6 w-11/12 flex flex-col m-auto">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-b from-forestgreen-lighter to-green lg:col-span-2 col-span-3 text-white p-10 rounded">
          <Heading fontSizeClass="text-40px" textColorClass="text-white">
            Thanks for reaching out.
          </Heading>
          <SubText textColorClass="text-white">
            One of our locating specialists will reach out to you within the next 1-3 business hours. Talk to you soon!
          </SubText>
          <a href="/learn" target="_blank">
            <BodyText textColorClass="text-white" fontWeightClass="font-semibold" otherClasses="flex items-center mt-4">
              How Lighthouse works
              <svg
                className="inline-block ml-4"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1="-1"
                  x2="14.6835"
                  y2="-1"
                  transform="matrix(0.735931 0.677056 -0.735931 0.677056 10.3884 2)"
                  stroke="#FA8946"
                  strokeWidth="2"
                />
                <line
                  y1="-1"
                  x2="14.6835"
                  y2="-1"
                  transform="matrix(0.735931 -0.677056 0.735931 0.677056 10.6458 21.6465)"
                  stroke="#FA8946"
                  strokeWidth="2"
                />
                <path d="M0 10.6465L21 10.6465" stroke="#FA8946" strokeWidth="2" />
              </svg>
            </BodyText>
          </a>
        </div>
        <div className="bg-white px-8 py-10 lg:col-span-1 col-span-3 border border-solid border-gray-lighter rounded">
          <SubHeading fontWeightClass="font-bold">Want to Get Started?</SubHeading>
          <SmallText
            fontWeightClass="font-regular"
            fontSizeClass="text-14px"
            otherClasses="leading-none"
            textColorClass="text-gray-medium"
          >
            While you wait, check out our handy lookup tool. Know the name of a building you&apos;re interested in? Look
            it up here.
          </SmallText>
          <a href="/lookup" target="_blank">
            <SquareButton
              width="100%"
              BgColorClass="bg-green"
              otherClasses="md:flex-row mt-5 sm:block block text-16px text-center transition-all duration-100"
            >
              Search for a building
            </SquareButton>
          </a>
        </div>
      </div>
      <div className="w-full mt-10">
        <SubHeading fontWeightClass="font-bold" otherClasses="mb-4">
          Check out some buildings with cash back
        </SubHeading>
        <div style={{ height: '620px', overflow: 'auto' }} className="scroll-enabled">
          <SuccessResults />
        </div>
      </div>
    </div>
  </div>
);

export default SuccessPage;