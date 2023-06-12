import { useEffect, useState } from 'react';
import Head from 'next/head';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingSpinner } from '@components/shared';
import { B1, H2 } from '@components/shared/Typography';
import { sentryCaptureException } from '@utils/sentry';
import { sendTrack } from '@utils/analytics';
import { useUser } from '@components/shared/UserProvider';
import { nextApi } from '../../utils/http';

export default function Name({ formData, saveData, currentPath, nextStep }) {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(formData?.firstName || user?.givenName);
  const [lastName, setLastName] = useState(formData?.lastName || user?.familyName);
  const [email, setEmail] = useState(formData?.email || user?.email);
  const [firstKeyPress, setFirstKeyPress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    saveData({ firstName, lastName, email });

    sendTrack('InsuranceFormPage', {
      category: 'insurance',
      label: 'InsuranceFormPage',
      action: 'InsuranceFormPage',
      page: 'Name',
      questions: ['firstName', 'lastName', 'email'],
      firstName,
      lastName,
      email,
      version: 1,
    });

    await nextApi.patch('/users/me', { firstName, lastName, email }).catch((err) => {
      sentryCaptureException({
        info: 'Policy QuoteFlow: unable to update user info',
        error: err,
      });
      toast.error('Something went wrong!', { position: 'bottom-right' });
      setIsLoading(false);
    });
    setIsLoading(false);
    nextStep();
  };

  useEffect(() => {
    sendTrack('InsuranceFormPageLoaded', {
      category: 'insurance',
      label: 'InsuranceFormPageLoaded',
      action: 'InsuranceFormPageLoaded',
      page: 'Name',
      version: 1,
    });
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.givenName);
      setLastName(user.familyName);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <div className="l-name">
      <ToastContainer />
      <Head>
        <title>Introduce Yourself? Please enter your information. | Lighthouse Insurance</title>
      </Head>
      <div className="l-form-header">
        <H2>Introduce Yourself?</H2>
        <B1 className="mt-4 mb-4">Please enter your information.</B1>
      </div>
      <form onSubmit={onSubmit} className="o-name-form">
        <div className="o-name-form__fields">
          <fieldset className="o-fieldset">
            <label className="o-text-input__label">First Name</label>
            <input
              type="text"
              id="first-name"
              autoFocus
              minLength={1}
              onChange={(event) => {
                setFirstName(event.target.value);
                if (firstKeyPress === false) {
                  sendTrack('InsuranceFormFirstInteraction', {
                    category: 'insurance',
                    label: 'InsuranceFormFirstInteraction',
                    action: 'InsuranceFormFirstInteraction',
                    version: 1,
                  });
                  setFirstKeyPress(true);
                }
              }}
              defaultValue={firstName}
              className="o-text-input"
              placeholder="Enter first name"
              required
            />
          </fieldset>
          <fieldset className="o-fieldset">
            <label className="o-text-input__label">Last Name</label>
            <input
              type="text"
              id="last-name"
              minLength={1}
              onChange={(event) => setLastName(event.target.value)}
              defaultValue={lastName}
              className="o-text-input"
              placeholder="Enter last name"
              required
            />
          </fieldset>
          <fieldset className="o-fieldset">
            <label className="o-text-input__label">Email</label>
            <input
              type="email"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              defaultValue={email}
              className="o-text-input"
              placeholder="Enter email"
              title="Please provide a valid e-mail address"
              required
            />
          </fieldset>
        </div>
        <div className="l-next-container">
          <button type="submit" disabled={isLoading} className="o-btn o-btn--primary">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <span className="o-btn--primary__text">Next step</span>
                <img alt="arrowr" src="/static/assets/Icons/arrow_right.svg" />
              </>
            )}
          </button>
        </div>
        <div className="o-cancel-container">
          <a className="o-cancel" href="/account/insurance">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
