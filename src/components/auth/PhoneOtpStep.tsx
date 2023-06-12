import React, { useEffect, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';

import PhoneInputContainer from '@components/shared/CodeInput/PhoneInput';
import { nextApi } from '@utils/http';
import FloatingInput from '@components/shared/FloatingInput/FloatingInput';
import { wizardStepProps } from '@components/shared/wizard/Props';
import { sentryCaptureException } from '@utils/sentry';
import { ErrorBar } from '@components/shared/StatusBars';
// TODO: add context?
// import { useWizard } from '@components/shared/wizard/WizardContext';
import { useRouter } from 'next/router';
import Header, { defaultHeaderText, defaultSubHeaderText } from './components/Header';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css';
import { inputString } from './Props';
import { LinkButton, PrimaryButton, SecondaryButton } from './components/Buttons';
import jsCookie from 'js-cookie';

type checkObject = {
  phoneNumber: string;
  showReferral: boolean;
  referral: string;
};

export default function PhoneOtpStep(props: wizardStepProps): React.ReactElement {
  const { stepId, appendToCompletedSteps, setNextStep, saveData, getData } = props;
  let { completedSteps } = props;
  const { referralCode: formReferralCode, phoneNumber: formPhoneNumber } = getData();
  const { query } = useRouter();
  const refExists = !!(query && query?.hasOwnProperty('ref') && query.ref);
  const refValue = refExists ? query.ref : '';
  // ? states
  const [isLoading, setIsLoading] = useState(false);
  const [referral, setReferral] = useState(refValue || formReferralCode || '');
  const [isReferralVisible, setShowReferral] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(formPhoneNumber || '');
  const [formIsComplete, setFormIsComplete] = useState(false);
  const [error, setError] = useState<{ message: string; type: string } | null>(null);

  /*
    ______           __                      _   _
  .' ____ \         [  |                    (_) / |_
  | (___ \_|__   _   | |.--.   _ .--..--.   __ `| |-'
   _.____`.[  | | |  | '/'`\ \[ `.-. .-. | [  | | |
  | \____) || \_/ |, |  \__/ | | | | | | |  | | | |,
   \______.''.__.'_/[__;.__.' [___||__||__][___]\__/

  */
  const onSubmit = async (e: any): Promise<void> => {
    setError(null);
    e.preventDefault();
    setIsLoading(true);
    completedSteps = appendToCompletedSteps('email', 'phone', stepId as string);
    saveData({ userChoiceOfAuth: 'phone-passwordless', email: '', completedSteps });
    try {
      const inviteCode = query.inviteCode || null;
      const { data }: any = await nextApi.post('/auth/send_sms_otp', {
        phoneNumber,
        referredBy: referral,
        inviteCode,
        hubspotutk: jsCookie.get('hubspotutk'),
      });

      saveData({
        methodId: data.methodId,
        expiration: data.expirationSec,
        newUser: data.userCreated,
      });
      setNextStep('otp');
    } catch (err) {
      if (err.response?.data) {
        setError(
          err.response.data ?? {
            message: 'Uh oh! An error occurred',
            type: 'errors.generic',
          }
        );
      }
      sentryCaptureException({ info: 'unable to send OTP to SMS', error: {} });
    } finally {
      setIsLoading(false);
    }
  };

  const updateReferral = ({ target: { value: referralCode } }: inputString): void => {
    reRunChecks({ phoneNumber, showReferral: isReferralVisible, referral: referralCode });
  };
  const updatePhoneNumber = (phone: string): void => {
    reRunChecks({ phoneNumber: phone, showReferral: isReferralVisible, referral });
  };

  const reRunChecks = ({
    phoneNumber: funcPhoneNumber,
    showReferral: funcShowReferral,
    referral: funcReferral,
  }: checkObject): void => {
    // ? if all passes
    if (
      funcPhoneNumber &&
      isValidPhoneNumber(funcPhoneNumber) &&
      funcShowReferral &&
      funcReferral &&
      funcReferral.length >= 3
    ) {
      setFormIsComplete(true);
    }
    // ? if referral is visible but value is provided
    else if (funcPhoneNumber && !funcShowReferral && isValidPhoneNumber(funcPhoneNumber)) {
      setFormIsComplete(true);
    }
    // ? if referral is provided but is less than 3
    else if (funcShowReferral && (!funcReferral || funcReferral.length < 3)) {
      setFormIsComplete(false);
    }
    // ? if all fail
    else {
      setFormIsComplete(false);
    }

    saveData({ phoneNumber: funcPhoneNumber, referralCode: funcReferral, email: '' });
    setReferral(funcReferral);
    setPhoneNumber(funcPhoneNumber);
  };

  const hideReferral = (): void => {
    saveData({ referralCode: '' });
    setReferral('');
    setShowReferral(false);
  };

  const showReferral = (): void => {
    saveData({ referralCode: '' });
    setShowReferral(true);
    setFormIsComplete(false);
  };

  const signInAsEmail = (): void => {
    saveData({ email: '', completedSteps });
    completedSteps = appendToCompletedSteps('email', 'phone', stepId as string);
    setNextStep('email');
  };

  // ? behavior based on existing values from localStorage if storage is enabled
  useEffect(() => {
    reRunChecks({ phoneNumber, showReferral: isReferralVisible, referral });
    if (referral) {
      setShowReferral(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber, isReferralVisible, referral]);

  return (
    <div>
      <form className="o-phone-number-form no-dark">
        <div className="o-phone-number-form__fields pt-2 flex flex-col">
          <PhoneInputContainer onChange={updatePhoneNumber} formPhoneNumber={phoneNumber} />
          {isReferralVisible || referral !== '' ? (
            <>
              <FloatingInput
                Label="Referral code"
                value={referral}
                onChange={updateReferral}
                onClickCancel={hideReferral}
                className={error?.type === 'invalid_referral' ? 'has-error' : ''}
              />
            </>
          ) : (
            <>
              <LinkButton onClick={showReferral} style={{ marginTop: '20px' }}>
                + I have a referral code <span className="text-brand-light-even-darker">(For new users)</span>
              </LinkButton>
            </>
          )}
          {error?.type === 'invalid_referral' && (
            <ErrorBar
              onClick={() => {
                hideReferral();
                setError(null);
              }}
              message="Referral code has not been found."
            />
          )}
          <PrimaryButton onSubmit={onSubmit} formIsValidated={formIsComplete} isLoading={isLoading} />
          <SecondaryButton textColor="text-gray-blue " buttonText="Use Email" onClick={signInAsEmail} />
        </div>
      </form>
    </div>
  );
}

export const phoneStep = {
  Header,
  Component: PhoneOtpStep,
  headerText: defaultHeaderText,
  subHeaderText: defaultSubHeaderText,
  Footer,
};
