import React, { useState } from 'react';
import CodeInput from '@components/shared/CodeInput/CodeInput';
import { HalfReload, Tick } from '@components/shared/Icons';
import { LoadingSpinner } from '@components/shared';
import { ErrorBar, SuccessBar, WarningBar } from '@components/shared/StatusBars';
import { nextApi } from '@utils/http';
import { sentryCaptureException } from '@utils/sentry';
import { useAuth } from 'context/auth/index';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { IdentifyUser, isInlineAuth } from '../functions';
import { codeInputProps } from '../Props';

export default function VerificationCode(props: codeInputProps & { onSubmitCallback?: any }): React.ReactElement {
  const {
    timer,
    footerText,
    footerSubText,
    buttonText,
    onClick,
    secondaryAuthAvailable,
    isChoicePhonePasswordless,
    setNextStep,
    saveData = (e: any): any => {},
    nextStep = (): any => {},
    getData = (): any => {},
    stepId,
    appendToCompletedSteps = (...steps: string[]): any => '',
    setTimer = (): any => {},
    nextPath = '',
    footerDisabled = true,
    setVisibility = null,
    modalRenderedOn = '',
    enableUser = false,
    onSubmitCallback = null,
  } = props;
  const { query } = useRouter();
  const { login } = useAuth();
  const [otpInputError, setOtpInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [headerMessage, setHeaderMessage] = useState('');
  const [secondaryAccount, setSecondaryAccount] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otpResent, setOtpResent] = useState(false);

  /*
    ______           __                      _   _
  .' ____ \         [  |                    (_) / |_
  | (___ \_|__   _   | |.--.   _ .--..--.   __ `| |-'
   _.____`.[  | | |  | '/'`\ \[ `.-. .-. | [  | | |
  | \____) || \_/ |, |  \__/ | | | | | | |  | | | |,
   \______.''.__.'_/[__;.__.' [___||__||__][___]\__/

  */
  const onSubmit = async (code: string): Promise<void> => {
    const { methodId, newUser, email, phoneNumber, firstName, lastName } = getData();
    setVerified(false); // reset verification
    setIsLoading(true);

    try {
      // authenticate the OTP against method
      const { data } = await nextApi.post('/auth/authenticate_otp', { methodId, code });
      jsCookie.set(`${process.env.NEXT_PUBLIC_STYTCH_SESSION_COOKIE || 'lhstyssion'}-js`, data.sessionToken, {
        expires: 30,
      });
      setVerified(true);
      saveData({ ...getData(), otpCode: code, completedSteps: appendToCompletedSteps(stepId as string) });
      if (newUser || !data.signedUp) {
        // save the data in DB
        const redirect = () => {
          if (nextPath && setNextStep) {
            setNextStep(nextPath);
          } else {
            nextStep();
          }
        };
        if (email && phoneNumber && firstName && lastName && enableUser) {
          await nextApi.post('/auth/sign_up_info', { email, phoneNumber, firstName, lastName });

          // make session after saving data in case is last step
          let callback = (e: any): any => {
            redirect();
          };
          let blockHere = false;
          if (
            (modalRenderedOn.toLowerCase().includes('insurance') ||
              modalRenderedOn.toLowerCase().includes('building')) &&
            setVisibility
          ) {
            callback = () => {
              setVisibility(false);
            };
            blockHere = true;
          }
          // identify user / make session
          await IdentifyUser({
            login,
            callback,
          });
          // if its insurance we don't need to go more.
          if (!blockHere) return;
        }

        redirect();
      } else {
        // user already exist, make session, close popup if is popup, or redirect if is inline-page form
        IdentifyUser({
          login,
          callback: (user) => {
            if (query.post_login_url) window.location.replace(query.post_login_url as string);
            else if (modalRenderedOn !== '' && setVisibility) {
              setVisibility(false);
            } else {
              window.location?.replace('/account/dashboard');
            }
          },
        });
      }
    } catch (e) {
      sentryCaptureException({
        info: 'unable to verify OTP',
        error: {},
      });
      setErrorMessage('Wrong or Expired OTP');
      setOtpInputError(true); // if code is wrong
      setIsLoading(false);
    }
  };

  const switchLogin = (): void => {
    if (setNextStep && typeof isChoicePhonePasswordless !== 'undefined') {
      if (isChoicePhonePasswordless) setNextStep('email');
      else setNextStep('phone');
    }
  };

  const resendOTP = async (): Promise<void> => {
    const { phoneNumber, email } = getData();
    const payload = isChoicePhonePasswordless ? { phoneNumber } : { email };
    const url = isChoicePhonePasswordless ? '/auth/send_sms_otp' : '/auth/send_email_otp';
    const {
      data: { expirationSec, methodId },
    } = await nextApi.post(url, payload);
    setTimer(expirationSec);
    saveData({ expiration: expirationSec, methodId });
  };
  const resendCode = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (timer === 0) {
      resendOTP();
      toast.info('You will recieve your code shortly');
      setOtpResent(true);
    }
  };

  return (
    <>
      <div
        className=" o-verification-code-container mbp:p-6 mbp:px-6 flex flex-col rounded-lg  mbp:shadow-brand-md"
        style={{
          background: '#FFFFFF',
          width: '100%',
          display: 'block',
        }}>
        {!isLoading ? (
          <>
            <div
              className="w-full flex flex-row flex-no-wrap"
              style={{ borderBottom: '1px solid rgba(224, 224, 224, 0.4)' }}>
              <div className="w-full pr-2  ">
                <div className="text-base text-gray-template font-medium mb-2 font-circular">Enter pass</div>
                <div className="w-full p-0 m-0 pr-1">
                  <CodeInput onComplete={onSubmitCallback || onSubmit} erroredInput={otpInputError} />
                </div>
              </div>

              <div
                className={classNames(
                  'mbp:block w-32 pl-1 border-l border-l-gray-darklight mbp:pl-5 font-base text-3xl mbp:text-4xl relative flex flex-col items-center justify-center',
                  {
                    hidden: isInlineAuth(),
                  },
                )}>
                {timer && timer > 0 ? (
                  <div className="flex flex-row items-baseline">
                    <span className="font-bold">{timer}</span>
                    <span className="text-base">sec</span>
                  </div>
                ) : (
                  <button
                    className="reloadIcon appearance-none border-0 outline-0 color-brand"
                    type="button"
                    onClick={resendOTP}
                    style={{ position: 'absolute', top: '20px', border: '0px none', outline: '0px none' }}>
                    <HalfReload color="#34966D" />
                    <span
                      className="text-center block text-brand text-14px absolute font-medium font-circular"
                      style={{ bottom: '-25px', left: '-15px' }}>
                      Resend
                    </span>
                  </button>
                )}
              </div>
            </div>
            {!footerDisabled && (
              <div className={classNames('w-full p-0', { 'mt-8': isInlineAuth() })}>
                <div className="text-gray-dark text-14px font-base mt-4 mb-px font-circular">{footerText}</div>
                {footerSubText}
                <button
                  type="button"
                  onClick={onClick}
                  className="outline-none focus:outline-none text-brand font-bold cursor-pointer font-circular">
                  {buttonText}
                </button>
                <span className="text-gray-600 text-14px font-circular px-2">or</span>
                {secondaryAuthAvailable ? (
                  <button
                    type="button"
                    className="outline-none focus:outline-none text-brand font-bold cursor-pointer font-circular">
                    {isChoicePhonePasswordless ? 'Send code to email' : 'Send code to SMS'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={switchLogin}
                    className="outline-none focus:outline-none text-brand font-circular font-bold cursor-pointer">
                    {isChoicePhonePasswordless ? 'Login via email' : 'Login via SMS'}
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-wrap justify-center content-center h-full w-full">
            {!verified ? <LoadingSpinner color="#2B7D5B" width="1.8rem" height="1.8rem" /> : <Tick />}
          </div>
        )}
      </div>
      {isInlineAuth() && (
        <div className="fixed mbp:hidden bottom-0 w-full pr-12 pb-2">
          {!otpResent ? (
            <div className="relative">
              <div className="absolute top-0 pt-5 pl-16">
                <HalfReload color="#34966D" />
              </div>
              <button
                type="button"
                onClick={resendCode}
                className={` pl-1 w-full font-circular outline-none focus:outline-none h-14 font-bold text-lg rounded bg-brand-light rounded text-brand`}>
                Resend code
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={resendCode}
              className="bg-white text-left relative border py-3 pl-5 border-gray-light w-full font-circular outline-none focus:outline-none h-auto font-bold text-lg whitespace-pre-wrap rounded text-gray-darkerlight pr-20">
              The code has been sent
              <div className="flex flex-col  absolute right-0 top-0 h-full justify-center">
                <div className="text-brand font-circular text-lg   mr-3  my-auto align-middle">Resend</div>
              </div>
            </button>
          )}
        </div>
      )}
      {warningMessage && <WarningBar onClick={() => {}} message={warningMessage} />}
      {secondaryAccount && <SuccessBar onClick={() => {}} message={secondaryAccount} />}
      {errorMessage && <ErrorBar onClick={() => {}} message={errorMessage} />}
    </>
  );
}
