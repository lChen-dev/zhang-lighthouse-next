import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css';
import ProgressSteps from '@components/shared/ProgressSteps/ProgressSteps';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { CheckSVG, EmailIcon, HumanSVG, LetterSVG, ShieldSVG } from '@components/shared/Icons';
import PhoneInput from '@components/shared/CodeInput/PhoneInput';
import { nextApi } from '@utils/http';
import FloatingInput from '@components/shared/FloatingInput/FloatingInput';
import { validate } from 'email-validator';
import { wizardStepProps } from '@components/shared/wizard/Props';
import { sentryCaptureException } from '@utils/sentry';
import { ErrorBar, WarningBar } from '@components/shared/StatusBars';
import { useAuth } from 'context/auth/index';
import { B2 } from '@components/shared/Typography';
import { FooterImage } from './components/Footer';
import CodeInput from './components/CodeInput';
import Header from './components/Header';
import { inputString } from './Props';
import { PrimaryButton, SecondaryButton } from './components/Buttons';
import { IdentifyUser } from './functions';
import { getMetadata } from '@utils/helpers';

type checkObject = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function GettingAcquaintedStart(props: wizardStepProps): React.ReactElement {
  const {
    getData,
    saveData,
    setNextStep,
    stepId,
    nextStep,
    updateCompletedSteps,
    appendToCompletedSteps,
    setVisibility,
    modalRenderedOn,
  } = props;
  const { completedSteps } = props;
  const {
    email: formEmail,
    phoneNumber,
    firstName: formFirstName,
    lastName: formLastName,
    userChoiceOfAuth,
    referralCode,
  } = getData();
  const oldTimer = useRef<any>(0);
  const { expiration } = getData();
  const { login } = useAuth();
  const [ShowVerification, setShowVerification] = useState(false); // initial form with name and email
  const [firstName, setFirstName] = useState(formFirstName || '');
  const [lastName, setLastName] = useState(formLastName || '');
  const [email, setEmail] = useState(formEmail || '');
  const [phone, setPhone] = useState(phoneNumber || '');
  const [formIsComplete, setFormIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errType, setErrorType] = useState('');
  const [timer, setTimer] = useState(expiration);
  const [isLoading, setIsLoading] = useState(false);
  /*
    ______           __                      _   _
  .' ____ \         [  |                    (_) / |_
  | (___ \_|__   _   | |.--.   _ .--..--.   __ `| |-'
   _.____`.[  | | |  | '/'`\ \[ `.-. .-. | [  | | |
  | \____) || \_/ |, |  \__/ | | | | | | |  | | | |,
   \______.''.__.'_/[__;.__.' [___||__||__][___]\__/

   submit with verify

  */
  const onSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const newData = { firstName, lastName, email, phoneNumber: phone };

    let errored = false;
    await nextApi.post('/auth/sign_up_info', newData).catch(
      ({
        response: {
          data: { message, errorType },
        },
      }) => {
        setErrorMessage(message);
        setErrorType(errorType);
        setIsLoading(false);
        errored = true;
      },
    );

    if (errored) return;

    nextApi.post('/kustomer/user-sign-up', {
      firstName,
      lastName,
      email,
      emailVerified: userChoiceOfAuth === 'email-passwordless',
      phone,
      phoneVerified: userChoiceOfAuth === 'phone-passwordless',
      referredBy: referralCode,
      metadata: getMetadata(),
    });

    const loginMedium = { email, phoneNumber: phone };
    const isPhone = userChoiceOfAuth === 'phone-passwordless';
    if (!isPhone) {
      delete newData.email;
      delete loginMedium.email;
    } else {
      delete newData.phoneNumber;
      delete loginMedium.phoneNumber;
    }
    try {
      const url = isPhone ? '/auth/verify_email' : '/auth/verify_sms';
      const { data } = await nextApi.post(url);
      saveData({
        ...getData(),
        methodId: data.methodId,
        expiration: data.expirationSec,
        newUser: data.userCreated,
      });
      setShowVerification(true);
    } catch (error) {
      sentryCaptureException({
        info: "can't save user info",
        error,
      });
    }
    setIsLoading(false);
  };

  /*
    ______           __                      _   _
  .' ____ \         [  |                    (_) / |_
  | (___ \_|__   _   | |.--.   _ .--..--.   __ `| |-'
   _.____`.[  | | |  | '/'`\ \[ `.-. .-. | [  | | |
  | \____) || \_/ |, |  \__/ | | | | | | |  | | | |,
   \______.''.__.'_/[__;.__.' [___||__||__][___]\__/
    
    submit without verify

  */

  const continueWithoutVerify = async (e?: any): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const newData = { firstName, lastName, email, phoneNumber: phone };
    try {
      let errored = false;
      await nextApi.post('/auth/sign_up_info', newData).catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          setErrorMessage(message);
          setIsLoading(false);
          errored = true;
        },
      );
      if (errored) return;

      IdentifyUser({
        login,
        callback: (user) => {
          nextApi.post('/kustomer/user-sign-up', {
            id: user.userId,
            firstName: user.givenName,
            lastName: user.familyName,
            email: user.email,
            emailVerified: user.emailVerified,
            phone: user.phoneNumber,
            phoneVerified: user.phoneVerified,
            referredBy: referralCode,
            referralCode: user.referralCode,
            metadata: getMetadata(),
          });
        },
      });
      appendToCompletedSteps('getting-acquainted-verified');
      setNextStep('getting-acquainted-verified');
    } catch (error) {
      sentryCaptureException({
        info: "can't save user info in without verification action",
        error,
      });
    }
  };

  const onClick = (e: any): void => {
    e.preventDefault();
  };

  const reRunChecks = ({
    firstName: funcFirstName,
    lastName: funcLastName,
    email: funcEmail,
    phone: funcPhone,
  }: checkObject): void => {
    if (
      funcPhone &&
      isValidPhoneNumber(funcPhone) &&
      funcFirstName &&
      funcLastName &&
      funcEmail &&
      validate(funcEmail)
    ) {
      setFormIsComplete(true);
    } else {
      setFormIsComplete(false);
    }
    saveData({
      ...getData(),
      phoneNumber: funcPhone,
      firstName: funcFirstName,
      lastName: funcLastName,
      email: funcEmail,
    });
  };

  useEffect(() => {
    if (!ShowVerification) {
      return;
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
    // eslint-disable-next-line consistent-return
    return (): void => {
      oldTimer.current = 0;
      clearInterval(interval);
    };
  }, [timer, ShowVerification]);

  useEffect(() => {
    reRunChecks({ firstName, lastName, email, phone });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone, firstName, lastName, email]);

  let Icons = [HumanSVG, CheckSVG, ShieldSVG];
  const activeIcon = 0;
  if (modalRenderedOn?.toLowerCase().startsWith('/insurance')) {
    Icons = [HumanSVG, CheckSVG];
  }

  const renderError = () => {
    if (errType === 'phone_in_use') {
      return (
        <div className="p-4 w-full border-0 outline-0 font-medium relative whitespace-normal bg-orange-warn mt-4">
          <B2 color="text-white">
            It seems like you&apos;re an existing user. Sign in by <b className="text-white">{phone}</b> or change
            number.
          </B2>
        </div>
      );
    }
    if (errType === 'email_in_use') {
      return (
        <div className="p-4 w-full border-0 outline-0 font-medium relative whitespace-normal bg-orange-warn mt-4">
          <B2 color="text-white">
            It seems like you&apos;re an existing user. Sign in by <b className="text-white">{email}</b> or change
            email.
          </B2>
        </div>
      );
    }
    if (errorMessage) return <ErrorBar message={errorMessage} onClick={() => setErrorMessage('')} />;
    return null;
  };

  const renderPrimaryBtn = () => {
    if (errType === 'phone_in_use') {
      return (
        <PrimaryButton onSubmit={() => setNextStep('phone')} formIsValidated buttonText={`Sign in using ${phone}`} />
      );
    }
    if (errType === 'email_in_use') {
      return (
        <PrimaryButton onSubmit={() => setNextStep('email')} formIsValidated buttonText={`Sign in using ${email}`} />
      );
    }
    return (
      <PrimaryButton
        formIsValidated={formIsComplete}
        onSubmit={onSubmit}
        isLoading={isLoading}
        buttonText={`Verify ${userChoiceOfAuth === 'phone-passwordless' ? 'Email' : 'SMS'} & continue`}
      />
    );
  };

  const renderSecondaryBtn = () => {
    if (errType === 'phone_in_use' || errType === 'email_in_use') return null;
    return (
      <SecondaryButton
        buttonText="Continue without verifying"
        disabled={!formIsComplete}
        onClick={continueWithoutVerify}
      />
    );
  };

  return (
    <div>
      <ProgressSteps Icons={Icons} activeIcon={activeIcon} />
      <form className="o-phone-number-form  mt-3 no-dark">
        <div className="o-phone-number-form__fields flex flex-col">
          {!ShowVerification && (
            <>
              <FloatingInput
                Label="Your first name"
                onChange={(e: inputString): void => {
                  saveData({ firstName: e.target.value });
                  setFirstName(e.target.value);
                }}
                inputClassName="rounded-sm "
                value={firstName}
              />
              <FloatingInput
                Label="Your last name"
                onChange={(e: inputString): void => {
                  saveData({ lastName: e.target.value });
                  setLastName(e.target.value);
                }}
                value={lastName}
                inputClassName="rounded-sm "
              />
              {userChoiceOfAuth === 'phone-passwordless' ? (
                <FloatingInput
                  Label="Your email"
                  value={email}
                  Icon={<LetterSVG />}
                  inputClassName="rounded-sm "
                  onChange={(e: inputString): void => {
                    saveData({ email: e.target.value });
                    setEmail(e.target.value);
                  }}
                />
              ) : (
                <PhoneInput
                  onChange={(value: string): void => {
                    saveData({ phoneNumber: value });
                    setPhone(value);
                    setErrorType('');
                    setErrorMessage('');
                  }}
                />
              )}
              {renderError()}
              {renderPrimaryBtn()}
            </>
          )}
          {ShowVerification && (
            <>
              <div className="text-lg text-gray font-base mb-5">
                Verification was sent to{' '}
                <span className="text-lg font-bold text-gray">
                  {userChoiceOfAuth === 'phone-passwordless' ? 'Email' : 'SMS'}
                </span>
              </div>
              <CodeInput
                enableUser
                setVisibility={setVisibility}
                modalRenderedOn={modalRenderedOn}
                nextPath="getting-acquainted-verified"
                setTimer={(s?: any) => {
                  oldTimer.current = Date.now();
                  setTimer(s);
                }}
                timer={timer}
                footerText=""
                footerDisabled
                footerSubText={<div className="text-gray-dark text-14px font-base mt-px">Didn’t receive?</div>}
                buttonText={userChoiceOfAuth === 'phone-passwordless' ? 'Send code to SMS' : 'Send code to email'}
                onClick={onClick}
                isChoicePhonePasswordless={userChoiceOfAuth === 'phone-passwordless'}
                secondaryAuthAvailable={email && phoneNumber}
                stepId={stepId as string}
                getData={getData}
                saveData={saveData}
                setNextStep={setNextStep}
                nextStep={nextStep}
                completedSteps={completedSteps}
                updateCompletedSteps={updateCompletedSteps}
                appendToCompletedSteps={appendToCompletedSteps}
              />
            </>
          )}
          {renderSecondaryBtn()}
        </div>
      </form>
    </div>
  );
}

export const gettingAcquaintedStartStep = {
  Header,
  Component: GettingAcquaintedStart,
  headerText: `Let's get acquainted`,
  subHeaderText: 'Let us know more about yourself',
  Footer: FooterImage,
};
