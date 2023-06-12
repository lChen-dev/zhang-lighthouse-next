import LearningBlock from '@components/learn/component/LearningBlock';
import { H2, B1, B2 } from '@components/shared/Typography';
import React, { useEffect, useState } from 'react';
import { Calculator, CardBold, HeartHome, HomeBold, QuestionMark, Savings } from '@components/shared/Icons';
import ButtonCta from '@components/shared/ButtonCta';
import { KEY_ESCAPE } from 'keycode-js';

const STYLE_HOW_IT_WORKS_BTN = {
  left: '12px',
  zIndex: 1,
  backgroundColor: '#34966D',
};

const STYLE_MAIN_CONTAINER = {
  zIndex: 2000,
  backgroundColor: 'rgb(0 0 0 / 50%)',
  backdropFilter: 'blur(4px)',
};

const Model = ({ onClose }: any) => {
  useEffect(() => {
    const escFunction = (event: any) => {
      if (event.keyCode === KEY_ESCAPE) onClose();
    };

    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [onClose]);

  return (
    <div
      className="absolute h-screen w-screen sm:px-8 md:px-16 sm:py-8 py-4 px-4 how-it-works-page"
      style={STYLE_MAIN_CONTAINER}
      onClick={onClose}
    >
      <main
        className="container relative mx-auto h-full bg-white shadow-md rounded"
        style={{ overflow: 'scroll', maxWidth: '1200px' }}
      >
        <div
          className="px-5 md:px-10 py-10 md:py-12 relative round"
          style={{ overflow: 'hidden' }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <H2>How it works</H2>
          <B1 className="mb-16 mt-2 how-it-works-subtitle">
            Sounds unbelievable, right? Let's turn you into a believer — here's how it works.
          </B1>

          <button className="absolute focus:outline-none" style={{ right: '20px', top: '20px' }} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 1L1 23M1 1L23 23" stroke="#2A343A" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </button>

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
                  className="text-brand font-semibold hover:underline"
                >
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

        <div className="px-5 py-10 md:hidden block">
          <ButtonCta className="justify-center sm:mt-0" onClick={onClose}>
            Got it, Lets go
          </ButtonCta>
        </div>
      </main>
    </div>
  );
};

const HowItworks = () => {
  const [displayModel, setDisplayModel] = useState<boolean>(false);
  return (
    <>
      {displayModel && <Model onClose={() => setDisplayModel(false)} />}
      <div
        onClick={(e) => {
          setDisplayModel(true);
        }}
        className="absolute cursor-pointer inline-flex items-center justify-center block font-circular card-shadow how-it-works-btn"
        style={STYLE_HOW_IT_WORKS_BTN}
      >
        <div>
          <QuestionMark width={24} height={24} />
        </div>
        <B2
          color="text-white"
          weight="font-medium"
          className="pl-2 cursor-pointer how-it-works-title"
          style={{ marginBottom: 0 }}
        >
          How it works?
        </B2>
      </div>
    </>
  );
};

export default HowItworks;
