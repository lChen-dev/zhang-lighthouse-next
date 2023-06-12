// used in dashboard as verify popup

import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css';
import { LoadingSpinner } from '@components/shared';
import { nextApi } from '@utils/http';
import { useAuth } from 'context/auth';
import { ErrorBar } from '@components/shared/StatusBars';
import CodeInput from './components/CodeInput';

export default function VerifyOTP(props: {
  phoneNumber?: string;
  email?: string;
  methodId: string;
  expiration: any;
  callback: any;
}): React.ReactElement {
  const { methodId, expiration, callback } = props;
  const userChoiceOfAuth = !methodId.includes('email') ? 'phone-passwordless' : 'number';
  const isChoicePhonePasswordless = userChoiceOfAuth === 'phone-passwordless';
  // ? states
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(expiration);
  const [isLoading, setIsLoading] = useState(false);
  const { user, login } = useAuth();
  const oldTimer = useRef<any>(0);

  /*
    ______           __                      _   _
  .' ____ \         [  |                    (_) / |_
  | (___ \_|__   _   | |.--.   _ .--..--.   __ `| |-'
   _.____`.[  | | |  | '/'`\ \[ `.-. .-. | [  | | |
  | \____) || \_/ |, |  \__/ | | | | | | |  | | | |,
   \______.''.__.'_/[__;.__.' [___||__||__][___]\__/

  */

  const onSubmit = async (code: string): Promise<void> => {
    setIsLoading(true);
    try {
      const { data } = await nextApi.post('/auth/authenticate_otp', { methodId, code });
      if (data.signedUp) {
        login({ ...user, emailVerified: true });
        callback();
      }
      setIsLoading(true);
    } catch (e) {
      setIsLoading(false);
      setErrorMessage('Wrong or Expired OTP');
      //
    }
  };

  useEffect(() => {
    if (oldTimer.current === 0 && timer > 0) {
      oldTimer.current = Date.now(); // in ms
    }
    const interval = setInterval(() => {
      if (timer > 0) {
        const timeSpent: any = (Date.now() - oldTimer.current) / 1000;
        const s = parseInt(timeSpent, 10);
        setTimer(timer - s);
      }
    }, 1000);
    return (): void => {
      oldTimer.current = 0;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <div>
      {!isLoading ? (
        <form className="o-phone-number-form  mt-12 no-dark">
          <div className="o-phone-number-form__fields flex flex-col">
            <div className="text-lg text-gray font-base mb-5 font-circular">
              Verification was sent to{' '}
              <span className="text-lg font-bold text-gray font-circular">
                {userChoiceOfAuth === 'phone-passwordless' ? 'SMS' : 'Email'}
              </span>
            </div>
            <CodeInput
              setVisibility={false}
              modalRenderedOn="/insurance"
              nextPath="getting-acquainted-start"
              setTimer={(s?: any) => {
                setTimer(s);
                oldTimer.current = Date.now();
              }}
              appendToCompletedSteps={() => {}}
              stepId="otp"
              completedSteps={['email', 'phone', 'otp']}
              saveData={() => {}}
              updateCompletedSteps={() => {}}
              nextStep={() => {}}
              setNextStep={() => {}}
              timer={timer}
              getData={() => props}
              onSubmitCallback={onSubmit}
              footerText=""
              footerSubText=""
              buttonText=""
              isChoicePhonePasswordless={isChoicePhonePasswordless}
              secondaryAuthAvailable={false}
              footerDisabled
              onClick={() => {}}
            />
          </div>
          {errorMessage && <ErrorBar onClick={() => setErrorMessage('')} message={errorMessage} />}
        </form>
      ) : (
        <>
          <div className="flex justify-center my-10">
            <LoadingSpinner color="#2B7D5B" />
          </div>
        </>
      )}
    </div>
  );
}
