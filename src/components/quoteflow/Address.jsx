import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import SearchLocationInput from './SearchLocationInput';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingSpinner } from '@components/shared';
import { sentryCaptureException } from '@utils/sentry';
import { sendTrack } from '@utils/analytics';

const ALLOWED_STATES = ['AZ', 'CA', 'IL', 'PA', 'TX', 'NY'];

export default function Address({ formData, saveData, currentPath, getQuote, nextStep, previousStep }) {
  const { router } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    const addressOne = e.target.querySelector('#o-search-location__address-one').value;
    const addressTwo = e.target.querySelector('#o-search-location__address-two').value;
    const city = e.target.querySelector('#o-search-location__city').value;
    const state = e.target.querySelector('#o-search-location__state').value;
    const zip = e.target.querySelector('#o-search-location__zip').value;
    e.preventDefault();
    if (!/^[0-9]{5}(-[0-9]{4})?$/.test(zip)) {
      toast.error(`Invalid Zip code`, {
        position: 'bottom-right',
      });
      return;
    }

    setIsLoading(true);

    const address = {
      addressOne,
      addressTwo,
      city,
      state,
      zip,
    };

    if (ALLOWED_STATES.includes(state.toUpperCase())) {
      await saveData({ address });
      setIsLoading(false);
      sendTrack('InsuranceFormPage', {
        category: 'insurance',
        label: 'InsuranceFormPage',
        action: 'InsuranceFormPage',
        page: 'Address',
        ...address,
        version: 1,
      });
      nextStep();
    } else {
      sendTrack('InsuranceFormPage', {
        category: 'insurance',
        label: 'InsuranceFormPage',
        action: 'InsuranceFormPage',
        page: 'Address',
        ...address,
        StateNotAllowed: true,
        version: 1,
      });
      sentryCaptureException({
        info: 'State is not allowed on address',
        error: new Error('We can only issue policies in the following states at this time'),
        data: { state },
      });
      toast.error(`We can only issue policies in the following states at this time: ${ALLOWED_STATES.join(', ')}`, {
        position: 'bottom-right',
      });
    }
  };

  useEffect(() => {
    sendTrack('InsuranceFormPageLoaded', {
      category: 'insurance',
      label: 'InsuranceFormPageLoaded',
      action: 'InsuranceFormPageLoaded',
      page: 'Address',
      version: 1,
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <Head>
        <title>Where are you living? | Lighthouse Insurance</title>
      </Head>
      <div className="l-form-header font-circular">
        <h1>Where are you living?</h1>
        <p className="mt-4 mb-4">
          Lighthouse Insurance is live in Texas, Arizona, Illinois, Pennsylvania, New York, and California.
          <br />
          <a href="mailto:hello@lighthouse.app" target="blank">
            Let us know
          </a>{' '}
          if you want renter's insurance in your state.
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <SearchLocationInput defaultValue={formData?.address} className="o-search-location-container" />
        <div className="l-previous-next-container">
          <button className="o-btn o-btn--secondary" type="button" onClick={previousStep} disabled={isLoading}>
            <img alt="arrowl" src="/static/assets/Icons/arrow_left.svg" />
            <span className="o-btn--secondary__text">Previous</span>
          </button>
          <button type="submit" className="o-btn o-btn--primary" disabled={isLoading}>
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
