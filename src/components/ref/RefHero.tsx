import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { H1, H5 } from '@components/shared/Typography';
import SignUpFlow from '@components/shared/signup-flow/SignUpFlow';
import ButtonCta from '@components/shared/ButtonCta';
import { sentryCaptureException } from '@utils/sentry';

const RefHero: React.FC = () => {
  const router = useRouter();
  const { refId } = router.query;

  const [showSignUp, setShowSignUp] = useState(false);
  useEffect(() => {
    const resetSignUp = () => setShowSignUp(false);
    window.addEventListener('resize', resetSignUp);
    return () => window.removeEventListener('resize', resetSignUp);
  }, []);

  const onLogin = async () => {
    try {
      await router.replace('/account/dashboard');
    } catch (e) {
      sentryCaptureException({
        info: 'Refhero: unable to login',
        error: e,
      });
    }
  };
  return (
    <div className="w-full relative flex flex-col items-start xl:items-center ref-hero overflow-x-hidden md:overflow-x-visible">
      <div className="flex flex-row items-start max-w-screen-xl mx-auto px-6 w-full laptop-md:px-0">
        <div className="z-20 flex flex-col items-center lg:items-start flex-1 mt-20 lg:mt-48 w-full">
          <H1
            weight="font-semibold"
            className="w-full inline-flex flex-col text-left items-start"
            style={{ maxWidth: '656px' }}>
            <span style={{ background: '#F9F9F9CC', boxShadow: '0 0 1rem 1rem #F9F9F9CC' }}>
              Cash back on renting your perfect home.
            </span>
          </H1>
          <img
            className="mt-0 lg:mt-16"
            src="/static/assets/images/ref_hero.png"
            alt="navCover"
            style={{ maxHeight: '825px', minWidth: '450px' }}
          />
        </div>

        <div className="hidden lg:flex flex-row items-center mt-32 ml-4">
          <div className="bg-white shadow-md px-8 py-10" style={{ maxWidth: '433px' }}>
            <SignUpFlow
              referredBy={refId as string}
              onLogin={onLogin}
              backLink={
                <a href="/" className="w-full text-center">
                  <H5 color="text-gray-soft hover:text-brand" className="mt-4 py-2">
                    Go to Home page
                  </H5>
                </a>
              }
            />
          </div>
        </div>

        {showSignUp ? (
          <div className="fixed inset-0 lg:hidden p-4 pt-8 bg-white overflow-y-auto z-50" style={{ marginTop: '57px' }}>
            <SignUpFlow
              referredBy={refId as string}
              onLogin={onLogin}
              backLink={
                <button type="button" onClick={() => setShowSignUp(false)} className="w-full text-center">
                  <H5 color="text-gray-soft hover:text-brand" className="mt-4 py-2">
                    Cancel
                  </H5>
                </button>
              }
            />
          </div>
        ) : (
          <div className="fixed lg:hidden bottom-0 left-0 right-0 p-8 z-50">
            <ButtonCta
              onClick={() => setShowSignUp(true)}
              className="justify-center"
              style={{ boxShadow: '0px 20px 20px 0px #00000040' }}>
              <H5 color="text-white">Get started</H5>
            </ButtonCta>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefHero;
