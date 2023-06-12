import React from 'react';

import { H2 } from '@components/shared/Typography';
import ScrollActiveContainer from './component/ScrollActiveContainer';

const Process: React.FC = () => (
  <div className="w-full relative flex flex-col items-center justify-center content-center">
    <div className="z-20 py-5 md:py-10 sm:mb-10 mb-0 pl-18 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4">
      <H2 className="pb-5 md:pb-20 text-left">It&apos;s Simple. Here&apos;s How Lighthouse Works</H2>
      <ScrollActiveContainer
        heading="Find Your Home"
        description="Work with our free team of professional apartment experts or find a rental on your own from our listings"
        linkText="Already know what you need?"
        linkHref="/lookup"
        img={<img src="/static/assets/images/index-find-your-home.png" alt="Find your home" />}
        iconContainerClass="house-container"
      />
      <ScrollActiveContainer
        heading="Apply for It"
        description="Speak with property managers, ask questions, schedule tours, and apply through Lighthouse"
        linkText="How it works"
        linkHref="/learn"
        img={<img src="/static/assets/images/index-apply.png" alt="Apply" />}
        iconContainerClass="street-light-container"
      />
      <ScrollActiveContainer
        heading="Earn Cash Back"
        description="Renters save over $700 per lease with Lighthouse. The best part? No extra rent or fees"
        linkText="Get started"
        linkHref="/start"
        img={<img src="/static/assets/images/index-earn-cashback.png" alt="Earn cash back" />}
        iconContainerClass="earning-house-container"
      />
    </div>
  </div>
);

export default Process;
