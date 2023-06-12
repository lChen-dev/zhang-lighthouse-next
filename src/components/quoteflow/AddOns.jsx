import Router from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import ReactTooltip from 'react-tooltip';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingSpinner } from '@components/shared';
import { sentryCaptureException } from '@utils/sentry';
import { sendTrack } from '@utils/analytics';

export default function AddOns({ formData, saveData, stepPath, nextStep, quote, previousStep }) {
  const defaultAddOns = {
    replacementCost: {
      pricePreview: '-.--',
    },
    theft: {
      pricePreview: '-.--',
    },
    earthquake: {
      pricePreview: '-.--',
    },
    identityFraud: {
      pricePreview: '-.--',
    },
  };
  const defaultSelectedAddOns = {
    replacementCost: {
      selected: false,
    },
    theft: {
      selected: false,
    },
    earthquake: {
      selected: false,
    },
    identityFraud: {
      selected: false,
    },
  };
  const [addOns, setAddOns] = useState(formData?.addOns || defaultAddOns);
  const [selectedAddOns, setSelectedAddOns] = useState(formData?.selectedAddOns || defaultSelectedAddOns);
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      sendTrack('InsuranceFormPage', {
        category: 'insurance',
        label: 'InsuranceFormPage',
        action: 'InsuranceFormPage',
        page: 'AddOns',
        selectedAddOns,
        version: 1,
      });

      nextStep();
    }
  };

  const getPricePreviews = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/price-previews', {
        ...formData,
        quote,
        addOns: selectedAddOns,
      });
      const priceEffect = response?.data?.priceEffect;
      setAddOns({
        ...addOns,
        ...priceEffect,
      });
      setIsLoading(false);
      return response;
    } catch (err) {
      setIsLoading(false);
      sentryCaptureException({
        info: 'unable to get price-previews on addons section',
        error: err,
      });
      toast.error('Something went wrong!', { position: 'bottom-right' });
    }
  };

  const toggleAddOn = async (addOn) => {
    setSelectedAddOns({
      ...selectedAddOns,
      [addOn]: {
        selected: !selectedAddOns[addOn].selected,
      },
    });
    setIsLoading(true);
    await saveData({
      selectedAddOns: {
        ...selectedAddOns,
        [addOn]: {
          selected: !selectedAddOns[addOn].selected,
        },
      },
      addOns,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    sendTrack('InsuranceFormPageLoaded', {
      category: 'insurance',
      label: 'InsuranceFormPageLoaded',
      action: 'InsuranceFormPageLoaded',
      page: 'AddOns',
      version: 1,
    });

    getPricePreviews().then((e) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <ReactTooltip className="o-tooltip-theme" />
      <ToastContainer />
      <Head>
        <title>Add-Ons. Do you want additional coverage? | Lighthouse Insurance</title>
      </Head>
      <div className="l-form-header l-form-header__addons">
        <h1>Add-Ons</h1>
        <p className="mt-4">Do you want additional coverage?</p>
      </div>
      <div>
        <div className="l-addons-container font-circular">
          <div className="l-addon-container">
            <div className="o-toggle-btn-container">
              <input
                type="checkbox"
                id="replacement-cost"
                className="toggle"
                disabled={isLoading}
                checked={selectedAddOns.replacementCost.selected}
                onChange={toggleAddOn.bind(this, 'replacementCost')}
              />
              <label htmlFor="replacement-cost" className="toggle-btn" />
              <span className="o-price-effect">+ ${addOns.replacementCost.pricePreview}</span>
            </div>
            <div className="o-addon-description">
              <h2>
                Replacement Cost
                <img
                  alt="circle"
                  className="o-info-circle"
                  src="/static/assets/Icons/info_circle.svg"
                  data-effect="solid"
                  data-html
                  data-tip="<p><b>Replacement cost</b> is the cost at the time of loss of a new article identical to the one damaged, destroyed or stolen. When an identical article is no longer manufactured or is not available, replacement cost means the cost of a new property of comparable material and quality and used for the same purpose.</p>
              <p>If you don't select this add-on, you will be paid by <b>actual cost value</b>, which means the cost to repair or replace the lost or damaged property using materials of like kind and quality less depreciation or allowance for obsolescence.</p>"
                />
              </h2>
              <p>Receive a higher value for your claims.</p>
            </div>
          </div>
          <div className="l-addon-container">
            <div className="o-toggle-btn-container">
              <input
                type="checkbox"
                id="theft"
                className="toggle"
                disabled={isLoading}
                checked={selectedAddOns.theft.selected}
                onChange={toggleAddOn.bind(this, 'theft')}
              />
              <label htmlFor="theft" className="toggle-btn" />
              <span className="o-price-effect">+ ${addOns.theft.pricePreview}</span>
            </div>
            <div className="o-addon-description">
              <h2>
                Theft
                <img
                  alt="circle"
                  className="o-info-circle"
                  src="/static/assets/Icons/info_circle.svg"
                  data-effect="solid"
                  data-html
                  data-tip="Without this coverage, you are only covered for Burglary. Burglary has a special definiton that means the unlawful taking of property within premises that has been closed and in which there are visible marks evidencing forcible entry."
                />
              </h2>
              <p>Protection if someone steals your things.</p>
            </div>
          </div>
          <div className="l-addon-container">
            <div className="o-toggle-btn-container">
              <input
                type="checkbox"
                id="earthquake"
                className="toggle"
                disabled={isLoading}
                checked={selectedAddOns.earthquake.selected}
                onChange={toggleAddOn.bind(this, 'earthquake')}
              />
              <label htmlFor="earthquake" className="toggle-btn" />
              <span className="o-price-effect">+ ${addOns.earthquake.pricePreview}</span>
            </div>
            <div className="o-addon-description">
              <h2>
                Earthquake
                <img
                  alt="circle"
                  className="o-info-circle"
                  src="/static/assets/Icons/info_circle.svg"
                  data-effect="solid"
                  data-html
                  data-tip='Without this coverage, you are not covered for loss which results from an earthquake (defined as "One or more earthquake shocks that occur within a seventy-two hour") or earth sinking, rising, shifting, expanding or contracting.'
                />
              </h2>
              <p>Submit claims if your property is damaged by an earthquake.</p>
            </div>
          </div>
          <div className="l-addon-container">
            <div className="o-toggle-btn-container">
              <input
                type="checkbox"
                id="identity-fraud"
                className="toggle"
                disabled={isLoading}
                checked={selectedAddOns.identityFraud.selected}
                onChange={toggleAddOn.bind(this, 'identityFraud')}
              />
              <label htmlFor="identity-fraud" className="toggle-btn" />
              <span className="o-price-effect">+ ${addOns.identityFraud.pricePreview}</span>
            </div>
            <div className="o-addon-description">
              <h2>
                Identity Fraud
                <img
                  alt="circle"
                  className="o-info-circle"
                  src="/static/assets/Icons/info_circle.svg"
                  data-effect="solid"
                  data-html
                  data-tip="Identity fraud means the act of knowingly transferring or using without lawful authority, a means of identification of you with the intent to commit, or to aid or abet another to commit, any unlawful activity that constitutes a violation of federal law or a felony under any applicable state or local law."
                />
              </h2>
              <p>Covers expenses incurred by you as the direct result of identity fraud.</p>
            </div>
          </div>
        </div>
        <div className="l-previous-next-container">
          <button className="o-btn o-btn--secondary o-btn--secondary__small" type="button" onClick={previousStep}>
            <img src="/static/assets/Icons/arrow_left.svg" alt="leftarrow" />
          </button>
          <button className="o-btn o-btn--primary o-btn--primary__with-estimate" type="submit" onClick={onSubmit}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <span className="o-btn--primary__text">
                  ${quote.totalPremium || '--'}/mo <span className="o-btn--primary__continue-text">- continue</span>
                </span>
                <img src="/static/assets/Icons/arrow_right.svg" alt="rightarrow" />
              </>
            )}
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
