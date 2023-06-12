import React from 'react';

import { FloatingContainerRelative } from '@components/shared/Hero/FloatingContainer';
import Hero from '@components/learn/component/Hero';
import { Calculator, CardBold, HeartHome, HomeBold, RightArrowIcon, Savings } from '@components/shared/Icons';
import { B1, H2 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';

import LearningBlock from './component/LearningBlock';

import './css/style.css';

const HowItWorks: React.FC = () => {
  return (
    <>
      <Hero />
      <FloatingContainerRelative className="mt-32 md:mt-0 rounded">
        <div className="px-5 md:px-10 py-10 md:py-32">
          <LearningBlock
            heading="Move into an apartment that offers cash back"
            description="Lighthouse works with over 7,000 buildings to bring cash back to you. Apply through Lighthouse and we'll handle the rest."
            icon={HomeBold}
          />
          <LearningBlock
            heading="Connect your bank account"
            description={
              <>
                First, you connect your bank info to Lighthouse to get paid easily and quickly when the time comes! We
                use{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://plaid.com/safety"
                  className="text-brand font-semibold hover:underline">
                  Plaid
                </a>{' '}
                to make sure that your bank info is super secure.
              </>
            }
            icon={CardBold}
            direction="right"
          />
          <LearningBlock
            heading="Pay that rent"
            description="You, being the stellar tenant that you are, pay your rent on time. Easy peasy!"
            icon={Savings}
          />
          <LearningBlock
            heading="Math & business magic"
            description={
              <>
                This part is a little more complex so we won&apos;t get into the details on this page, but you can{' '}
                <a href="/faq" className="text-brand font-semibold hover:underline">
                  get into the nitty gritty here
                </a>{' '}
                if you want to understand more.
              </>
            }
            icon={Calculator}
            direction="right"
          />
          <LearningBlock
            heading="Reap the reward of being a great tenant!"
            description="A few days after paying your rent on time, you'll get your cash back deposited directly into your bank account."
            icon={HeartHome}
          />
        </div>
      </FloatingContainerRelative>
      <div
        className="z-20 w-full max-w-screen-xl mx-auto relative p-6 md:p-16 mb-16 md:mb-32"
        style={{ background: '#F8F8F8' }}>
        <H2 className="pb-4 bg-transparent px-2 md:px-0 text-left w-full" style={{ maxWidth: '672px' }}>
          Curious about eligibility?
        </H2>
        <B1 className="text-gray-soft font-light mb-8" style={{ maxWidth: '672px' }}>
          Maybe you&apos;re coming from a broken lease, have a previous eviction, or bad credit. Visit our FAQ section
          to learn about eligibility.
        </B1>
        <div className="flex w-full md:content-start content-center md:justify-start justify-center">
          <ButtonCta href="/faq" variant="primary" icon={RightArrowIcon} className="w-full justify-center md:w-auto">
            Visit FAQ
          </ButtonCta>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
