import Link from 'next/link';
import Head from 'next/head';
import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@components/shared';
import { sendTrack } from '@utils/analytics';

const PERSONAL_CONTENTS_ALLOWED_VALUES = [10000, 15000, 20000, 25000, 30000, 35000, 40000];
const PERSONAL_LIABILITY_ALLOWED_VALUES = [25000, 50000, 100000, 300000];
const DEDUCTIBLE_ALLOWED_VALUES = [250, 500, 1000];

export default function CorePolicies({ formData, saveData, stepPath, nextStep, quote, previousStep }) {
  const { personalContents, personalLiability, deductible } = formData;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    nextStep();
    sendTrack('InsuranceFormPage', {
      category: 'insurance',
      label: 'InsuranceFormPage',
      action: 'InsuranceFormPage',
      page: 'Core Policies',
      questions: ['corePolicies'],
      personalContents,
      personalLiability,
      deductible,
      version: 1,
    });
  };

  const changeValue = async (operation, state) => {
    let ALLOWED_VALUES = [];
    let currentValue;
    if (state === 'personalContents') {
      ALLOWED_VALUES = PERSONAL_CONTENTS_ALLOWED_VALUES;
      currentValue = personalContents;
    } else if (state === 'personalLiability') {
      ALLOWED_VALUES = PERSONAL_LIABILITY_ALLOWED_VALUES;
      currentValue = personalLiability;
    } else if (state === 'deductible') {
      ALLOWED_VALUES = DEDUCTIBLE_ALLOWED_VALUES;
      currentValue = deductible;
    }

    const currentIndex = ALLOWED_VALUES.indexOf(currentValue);
    let newIndex;

    if (operation === 'subtract') {
      newIndex = currentIndex - 1;
      if (newIndex < 0) return;
    } else if (operation === 'add') {
      newIndex = currentIndex + 1;
      if (newIndex === ALLOWED_VALUES.length) return;
    }
    setIsLoading(true);
    await saveData({ [state]: ALLOWED_VALUES[newIndex] });
    setIsLoading(false);
  };

  function formatAmount(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  useEffect(() => {
    sendTrack('InsuranceFormPageLoaded', {
      category: 'insurance',
      label: 'InsuranceFormPageLoaded',
      action: 'InsuranceFormPageLoaded',
      page: 'Core Policies',
      version: 1,
    });
  }, []);
  return (
    <div>
      <ReactTooltip className="o-tooltip-theme" />
      <Head>
        <title>Your Policy. Select your core coverage. | Lighthouse Insurance</title>
      </Head>
      <div className="l-form-header l-form-header__core-policies">
        <h1>Your Policy</h1>
        <p className="mt-4">Select your core coverage.</p>
      </div>
      <div>
        <div className="l-core-policies">
          <div className="l-core-policy-container">
            <h2>
              Personal Property{' '}
              <img
                alt="circle"
                className="o-info-circle"
                src="/static/assets/Icons/info_circle.svg"
                data-tip="Personal Property covers sudden direct accidental physical loss or damage to covered property owned by or rented"
                data-effect="solid"
              />
            </h2>
            <p className="mt-4">
              Most apartments require at least $10,000. Covers property you own or rent. We suggest you purchase enough
              to cover the full value of everything you own.
            </p>
            <div className="o-incrementer">
              <button
                className="o-incrementer__btn"
                disabled={isLoading}
                type="button"
                onClick={changeValue.bind(this, 'subtract', 'personalContents')}>
                <img src="/static/assets/Icons/minus.svg" alt="minus" />
              </button>
              <div className="o-incrementer__amount">
                <span className="o-incrementer__dollar-sign">$</span> {formatAmount(personalContents)}
              </div>
              <button
                className="o-incrementer__btn"
                disabled={isLoading}
                type="button"
                onClick={changeValue.bind(this, 'add', 'personalContents')}>
                <img src="/static/assets/Icons/plus.svg" alt="plus" />
              </button>
            </div>
          </div>
          <div className="l-core-policy-container">
            <h2>
              Personal Liability
              <img
                alt="circle"
                className="o-info-circle"
                src="/static/assets/Icons/info_circle.svg"
                data-tip="Personal Liability covers damages for bodily injury or property damage caused by an occurrence covered by this policy for which an insured becomes legally liable."
                data-effect="solid"
              />
            </h2>
            <p className="mt-4">
              Most apartments require approximately $100,000. Covers your liabilities that arise from bodily injury or
              property damage.
            </p>
            <div className="o-incrementer">
              <button
                className="o-incrementer__btn"
                disabled={isLoading}
                type="button"
                onClick={changeValue.bind(this, 'subtract', 'personalLiability')}
              >
                <img src="/static/assets/Icons/minus.svg" alt="minus" />
              </button>
              <div className="o-incrementer__amount">
                <span className="o-incrementer__dollar-sign">$</span> {formatAmount(personalLiability)}
              </div>
              <button
                className="o-incrementer__btn"
                disabled={isLoading}
                type="button"
                onClick={changeValue.bind(this, 'add', 'personalLiability')}
              >
                <img src="/static/assets/Icons/plus.svg" alt="plus" />
              </button>
            </div>
          </div>
          <div className="l-core-policy-container">
            <h2>
              Deductible{' '}
              <img
                alt="circle"
                className="o-info-circle"
                src="/static/assets/Icons/info_circle.svg"
                data-tip="You will receive payments for loss to covered property only when it exceeds the applicable deductible."
                data-effect="solid"
              />
            </h2>
            <p className="mt-4">
              The deductible is the amount you must pay out of pocket before receiving reimbursement for a claim. A
              lower deductible will increase the price of your policy but means you will pay less out of pocket in the
              event of a claim.
            </p>
            <div className="o-incrementer">
              <button
                className="o-incrementer__btn"
                disabled={isLoading}
                type="button"
                onClick={changeValue.bind(this, 'subtract', 'deductible')}
              >
                <img src="/static/assets/Icons/minus.svg" alt="minus" />
              </button>
              <div className="o-incrementer__amount">
                <span className="o-incrementer__dollar-sign">$</span> {formatAmount(deductible)}
              </div>
              <button
                className="o-incrementer__btn"
                disabled={isLoading}
                type="button"
                onClick={changeValue.bind(this, 'add', 'deductible')}
              >
                <img src="/static/assets/Icons/plus.svg" alt="plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="l-previous-next-container">
          <button className="o-btn o-btn--secondary o-btn--secondary__small" type="button" onClick={previousStep}>
            <img src="/static/assets/Icons/arrow_left.svg" alt="left" />
          </button>
          <button
            type="submit"
            className="o-btn o-btn--primary o-btn--primary__with-estimate"
            disabled={isLoading}
            onClick={onSubmit}
          >
            <span className="o-btn--primary__text">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  ${quote.totalPremium || '--'}/mo <span className="o-btn--primary__continue-text">- continue</span>{' '}
                </>
              )}
            </span>
            <img src="/static/assets/Icons/arrow_right.svg" alt="right" />
          </button>
        </div>
        <div className="o-cancel-container">
          <a className="o-cancel" href="/account/insurance">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
