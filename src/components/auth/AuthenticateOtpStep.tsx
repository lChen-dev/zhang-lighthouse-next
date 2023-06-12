import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css';
import { validate } from 'email-validator';
import { isValidPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';

// import { useWizard } from '@components/shared/wizard/WizardContext';
import { LoadingSpinner } from '@components/shared';
import { wizardStepProps } from '@components/shared/wizard/Props';
import Header, { defaultSubHeaderText, defaultHeaderText } from './components/Header';
import { FooterImage } from './components/Footer';
import CodeInput from './components/CodeInput';

export default function AuthenticateOtpStep(props: wizardStepProps): React.ReactElement {
  // const { wizardData, saveData, goToStep } = useWizard();
  const {
    nextStep,
    updateCompletedSteps,
    stepId,
    appendToCompletedSteps,
    getData,
    saveData,
    setNextStep,
    setVisibility,
    modalRenderedOn,
  } = props;
  const { completedSteps } = props;
  const { userChoiceOfAuth, phoneNumber, email, expiration, methodId } = getData();
  // ? states
  const formattedPhone = phoneNumber ? formatPhoneNumberIntl(phoneNumber) : '';
  const isChoicePhonePasswordless = userChoiceOfAuth === 'phone-passwordless';
  const oldTimer = useRef<any>(0);
  const [timer, setTimer] = useState(expiration);
  const [isLoading, setIsLoading] = useState(true);

  /*
    ______           __                      _   _
  .' ____ \         [  |                    (_) / |_
  | (___ \_|__   _   | |.--.   _ .--..--.   __ `| |-'
   _.____`.[  | | |  | '/'`\ \[ `.-. .-. | [  | | |
  | \____) || \_/ |, |  \__/ | | | | | | |  | | | |,
   \______.''.__.'_/[__;.__.' [___||__||__][___]\__/

   >> is inside of CodeInput/OTP Component <<

  */

  // this is primary click, for option like did not receive code? click here to send to primary or click here for secondary
  // primary here should
  const onClick = (e: any): void => {
    e.preventDefault();
    appendToCompletedSteps('phone', 'email');
    if (isChoicePhonePasswordless) {
      setNextStep('phone');
      return;
    }
    setNextStep('email');
  };

  useEffect(() => {
    if (
      !userChoiceOfAuth ||
      (userChoiceOfAuth === 'email-passwordless' && (!email || !validate(email))) ||
      (userChoiceOfAuth === 'phone-passwordless' && (!phoneNumber || !isValidPhoneNumber(phoneNumber)))
    ) {
      setNextStep('phone');
    } else {
      setIsLoading(false);
    }

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
  const OTPSameMethod = (): boolean => {
    if (
      (userChoiceOfAuth === 'phone-passwordless' && !methodId.startsWith('phone-number')) ||
      (userChoiceOfAuth === 'email-passwordless' && !methodId.startsWith('email'))
    )
      return false;
    return true;
  };
  return (
    <div className="w-full">
      {!isLoading ? (
        <form className="o-phone-number-form  mt-12 no-dark">
          <div className="o-phone-number-form__fields flex flex-col">
            {OTPSameMethod() ? (
              <div className="text-lg text-gray font-base mb-5 font-circular">
                Verification was sent to{' '}
                <span className="text-lg font-bold text-gray font-circular">
                  {userChoiceOfAuth === 'phone-passwordless' ? 'SMS' : 'Email'}
                </span>
              </div>
            ) : (
              <div className="text-lg text-orange font-base mb-5 font-circular  whitespace-pre-wrap">
                This {userChoiceOfAuth === 'phone-passwordless' ? 'number' : 'email'} is linked to{' '}
                {userChoiceOfAuth === 'phone-passwordless' ? 'an email. ' : ' a number. '} Enter the code sent to this{' '}
                {userChoiceOfAuth === 'phone-passwordless' ? 'email' : 'number'} to sign in.
              </div>
            )}
            <CodeInput
              setVisibility={setVisibility}
              modalRenderedOn={modalRenderedOn}
              nextPath="getting-acquainted-start"
              setTimer={(s?: any) => {
                setTimer(s);
                oldTimer.current = Date.now();
              }}
              appendToCompletedSteps={appendToCompletedSteps}
              stepId={stepId as string}
              completedSteps={completedSteps}
              saveData={saveData}
              updateCompletedSteps={updateCompletedSteps}
              nextStep={nextStep}
              setNextStep={setNextStep}
              timer={timer}
              getData={getData}
              footerText={
                isChoicePhonePasswordless
                  ? 'Don’t have an access to your number?'
                  : 'Don’t have an access to your email?'
              }
              footerSubText={
                email &&
                formattedPhone && (
                  <>
                    <div className="text-gray-dark text-14px font-base mt-px font-circular">
                      You can Sign In with{' '}
                      <span className="font-bold  text">{isChoicePhonePasswordless ? 'Email' : 'SMS'}</span>
                    </div>
                  </>
                )
              }
              buttonText={isChoicePhonePasswordless ? 'Change number' : 'Change email'}
              isChoicePhonePasswordless={isChoicePhonePasswordless}
              secondaryAuthAvailable={phoneNumber && email}
              footerDisabled={false}
              onClick={onClick}
            />
          </div>
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

export const otpConfirmationStep = {
  Header,
  Component: AuthenticateOtpStep,
  headerText: defaultHeaderText,
  subHeaderText: defaultSubHeaderText,
  Footer: FooterImage,
};
