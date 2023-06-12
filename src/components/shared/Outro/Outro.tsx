import React, { useEffect } from 'react';

import { H2 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';
import { RightArrowIcon } from '@components/shared/Icons';

import Stats from './component/Stats';
import { animateTexts } from './js/anime';

const Outro = (): React.ReactElement => {
  useEffect(() => {
    animateTexts();
  }, []);
  return (
    <>
      <div className="w-full relative flex flex-col items-center justify-center content-center py-10 md:mb-10 mb-0">
        <div className="z-20 w-full max-w-screen-xl mx-auto relative p-6 md:p-16" style={{ background: '#F8F8F8' }}>
          <H2 style={{ maxWidth: '650px' }} className="pb-10 bg-transparent px-2 md:px-0 text-left w-full">
            Let&apos;s find the place that&apos;s right for you, right now.
          </H2>
          <div className="flex w-full md:content-start content-center md:justify-start justify-center">
            <ButtonCta href="/start" variant="primary" icon={RightArrowIcon} className="w-full justify-center md:w-auto">
              Get started
            </ButtonCta>
          </div>
        </div>
      </div>
      <div className="pb-10 md:mb-10 mb-0">
        <div className="block w-full">
          <div className="md:flex block justify-between w-full max-w-screen-xl px-4 md:px-10 mx-auto">
            <div className="flex flex-row flex-1">
              <Stats commaNumber value={7000} append="+" subHeading="Buildings" />
              <Stats value={45} prepend="" subHeading="Cities" />
            </div>
            <div className="flex flex-row flex-1">
              <Stats value={600} prepend="$" append="+" subHeading="Average Cash Back" />
              <Stats value={100} append="s" subHeading="Happy Renters" border={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Outro;
