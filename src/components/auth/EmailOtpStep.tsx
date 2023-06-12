import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css';
import { validate } from 'email-validator';
import { nextApi } from '@utils/http';
import FloatingInput from '@components/shared/FloatingInput/FloatingInput';
import { wizardStepProps } from '@components/shared/wizard/Props';
import { sentryCaptureException } from '@utils/sentry';
// TODO: add context?
// import { useWizard } from '@components/shared/wizard/WizardContext';
import { ErrorBar } from '@components/shared/StatusBars';
import { useRouter } from 'next/router';
import Header, { defaultHeaderText, defaultSubHeaderText } from './components/Header';
import Footer from './components/Footer';
import { LinkButton, PrimaryButton, SecondaryButton } from './components/Buttons';
import { inputString } from './Props';
import jsCookie from 'js-cookie';

export type checkObject = {
  email: string;
  showReferral: boolean;
  referral: string;
};

export default function EmailOtpStep(props: wizardStepProps): React.ReactElement {
  const { stepId, appendToCompletedSteps, setNextStep, saveData, getData } = props;
  let { completedSteps } = props;
  // ? previous stored data
  const { email: formEmail, referralCode: formReferralCode } = getData();
  const { query } = useRouter();
  const refExists = !!(query && query?.hasOwnProperty('ref') && query.ref);
  const refValue = refExists ? query.ref : '';

  // ? states
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(formEmail || '');
  const [referral, setReferral] = useState(refValue || formReferralCode || '');
  const [referralIsVisible, setShowReferral] = useState(false);
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
    e.preventDefault();
    completedSteps = appendToCompletedSteps('email', 'phone', stepId as string);
    saveData({ userChoiceOfAuth: 'email-passwordless', phoneNumber: '', completedSteps });
    setIsLoading(true);

    try {
      const inviteCode = query.inviteCode || null;
      const { data } = await nextApi.post('/auth/send_email_otp', {
        email,
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
    } catch (error) {
      if (error.response?.data) {
        setError(
          error.response.data ?? {
            message: 'Uh oh! An error occurred',
            type: 'errors.generic',
          }
        );
      }
      sentryCaptureException({
        info: 'unable to send OTP',
        error: {},
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ? state handler events
  const showReferral = (): void => {
    saveData({ referralCode: '' });
    setShowReferral(true);
    setFormIsComplete(false);
  };

  const hideReferral = (): void => {
    saveData({ referralCode: '' });
    setReferral('');
    setShowReferral(false);
  };

  const signInAsPhone = (): void => {
    saveData({ phoneNumber: '', completedSteps });
    completedSteps = appendToCompletedSteps('email', 'phone', stepId as string);
    setNextStep('phone');
  };

  // ? record referaral input value
  const updateReferral = ({ target: { value: referralCode } }: inputString): void => {
    reRunChecks({ email, showReferral: referralIsVisible, referral: referralCode });
  };
  // ? email input value
  const updateEmail = ({ target: { value } }: inputString): void => {
    reRunChecks({ email: value, showReferral: referralIsVisible, referral });
  };

  const reRunChecks = ({
    email: funcEmail,
    showReferral: funcShowReferral,
    referral: funcReferral,
  }: checkObject): void => {
    // ? all conditions fullfiled
    if (funcEmail && validate(funcEmail) && funcShowReferral && funcReferral && funcReferral.length >= 3) {
      setFormIsComplete(true);
    }
    // ? referral is visible but value  not provided
    else if (funcEmail && !funcShowReferral && validate(funcEmail)) {
      setFormIsComplete(true);
    }
    // ? referral is visible but value is less than 3 characters
    else if (funcShowReferral && (!funcReferral || funcReferral.length < 3)) {
      setFormIsComplete(false);
    }
    // ? all conditions failed
    else {
      setFormIsComplete(false);
    }
    // ? save to local storage
    saveData({ email: funcEmail, referralCode: funcReferral, phoneNumber: '' });
    setEmail(funcEmail);
    setReferral(funcReferral);
  };

  // ? behavior based on existing values from localStorage if storage is enabled
  useEffect(() => {
    reRunChecks({ email, showReferral: referralIsVisible, referral });
    if (referral) {
      setShowReferral(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, referralIsVisible, referral]);

  return (
    <div>
      <form className="o-phone-number-form no-dark">
        <div className="o-phone-number-form__fields flex flex-col " style={{ paddingTop: '4px' }}>
          <FloatingInput Label="Your email" onChange={updateEmail} value={email} />
          {referralIsVisible || referral !== '' ? (
            <FloatingInput
              Label="Referral code"
              value={referral}
              onChange={updateReferral}
              onClickCancel={hideReferral}
            />
          ) : (
            <LinkButton onClick={showReferral}>
              + I have a referral code <span className="mt-2 text-brand-light-even-darker">(For new users)</span>
            </LinkButton>
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
          <PrimaryButton formIsValidated={formIsComplete} onSubmit={onSubmit} isLoading={isLoading} />
          <SecondaryButton textColor="text-gray-blue" onClick={signInAsPhone} buttonText="Use SMS" />
        </div>
      </form>
    </div>
  );
}

export const emailStep = {
  Header,
  Component: EmailOtpStep,
  headerText: defaultHeaderText,
  subHeaderText: defaultSubHeaderText,
  Footer,
};
