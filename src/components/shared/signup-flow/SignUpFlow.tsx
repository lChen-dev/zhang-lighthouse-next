import React, { useEffect, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { B1, B2, B3, H2, H4 } from '@components/shared/Typography';
import PhoneNumber from '@components/shared/signup-flow/PhoneNumber';
import ButtonCta from '@components/shared/ButtonCta';
import { RightArrowIcon } from '@components/shared/Icons';
import CodeInput from '@components/shared/signup-flow/CodeInput';

import './css/signup.css';
import Authentication from '@tracking/Authentication';
import { nextApi } from '@utils/http';

interface Props {
  referredBy?: string;
  backLink?: JSX.Element;
  onLogin?: () => void;
}

const LOGIN_SCREEN = 1;
const VERIFICATION_SCREEN = 2;

const stepInfo = [
  { title: 'Enter your number to get started.', subtitle: 'One time authentication sign up', label: 'Phone number' },
  { title: 'One-time pass', label: 'Enter passcode' },
];

const SignUpFlow: React.FC<Props> = ({ backLink, onLogin, referredBy }: Props) => {
  const [res, setRes] = useState<any>();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (step === VERIFICATION_SCREEN) {
      Authentication.verifyPage();
    } else {
      // login screen
      Authentication.loginPage();
    }
  }, [step]);

  const sendSmsCode = () => {
    if (isValidPhoneNumber(phone)) {
      nextApi
        .post('/auth/send_sms_otp', { phoneNumber: phone, referredBy })
        .then((resp) => {
          setRes(resp.data);
          setErrorMessage('');
          sessionStorage.setItem('phoneNumber', phone);
          setStep(step + 1);
        })
        .catch(console.warn);
    }
  };

  const onCodeEntered = (code: string) => {
    nextApi
      .post('/auth/authenticate_otp', { methodId: res.methodId, code })
      .then((resp) => {
        if (resp && onLogin) {
          Authentication.loginSuccess();
          onLogin();
        }
      })
      .catch((e) => {
        console.warn(e);
        setErrorMessage(e.description ?? '');
      });
  };

  return (
    <>
      <H4 className="mb-2">Welcome to Lighthouse.</H4>
      <B2 color="text-gray-soft">
        Where you can earn up to $1,200 for a new lease. Sign up today and get a $50 bonus.
      </B2>
      <div className="flex flex-row items-center justify-start mt-10">
        {/* Phone SVG */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
          <path
            d="M26 4H6C3.79086 4 2 5.79086 2 8V40C2 42.2091 3.79086 44 6 44H26C28.2091 44 30 42.2091 30 40V8C30 5.79086 28.2091 4 26 4Z"
            stroke="#34966D"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={step === 1 ? 1 : 0.35}
          />
          <path d="M16 36H16.02" stroke="#34966D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Dash SVG */}
        <svg width="76" height="4" viewBox="0 0 76 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
          <path
            d="M2 2H74"
            stroke="#34966D"
            strokeWidth="3"
            strokeOpacity="0.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Lock SVG */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 19V11.8929C21.9977 9.68974 22.8332 7.56438 24.3443 5.92939C25.8554 4.29439 27.9342 3.26641 30.1773 3.045C32.4203 2.82359 34.6675 3.42454 36.4827 4.73121C38.2978 6.03787 39.5514 7.95702 40 10.1161M19.3333 19C17.4924 19 16 21.1165 16 23.7273V40.2727C16 42.8835 17.4924 45 19.3333 45H42.6667C44.5076 45 46 42.8835 46 40.2727V23.7273C46 21.1165 44.5076 19 42.6667 19H40H19.3333Z"
            stroke="#34966D"
            strokeOpacity={step === 2 ? 1 : 0.35}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <H2 className="mt-4">{stepInfo[step - 1].title}</H2>
      {stepInfo[step - 1].subtitle && (
        <B1 color="text-gray-soft" className="mt-2">
          {stepInfo[step - 1].subtitle}
        </B1>
      )}

      <B2 color="text-gray-soft" className="mt-6 mb-2">
        {stepInfo[step - 1].label}
      </B2>
      {step === 1 && (
        <>
          <PhoneNumber onChange={setPhone} sendSmsCode={sendSmsCode} initialValue={phone} />
          <ButtonCta
            onClick={sendSmsCode}
            icon={RightArrowIcon}
            iconPos="right"
            className="mt-16 justify-center"
            disabled={!isValidPhoneNumber(phone ?? '')}>
            Next step
          </ButtonCta>
        </>
      )}
      {step === 2 && (
        <div className="flex flex-col items-start pb-4">
          <div className="flex-1 pr-2 pt-4">
            <CodeInput
              onComplete={throttle(onCodeEntered, 1000)}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </div>
          <B3 color="text-red" className="mb-4">
            {errorMessage}
          </B3>
          <div className="flex flex-row">
            <B3 color="text-gray-soft" className="pr-4">
              Didn’t receive?
            </B3>
            <button type="button" onClick={() => setStep(1)}>
              <B3 color="text-brand" weight="font-semibold">
                Change number
              </B3>
            </button>
          </div>
        </div>
      )}
      {backLink}
    </>
  );
};

function throttle(func: (...vals: any[]) => void, duration: number) {
  let shouldWait = false;
  return (...args: any[]) => {
    if (!shouldWait) {
      func(...args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, duration);
    }
  };
}

export default SignUpFlow;
