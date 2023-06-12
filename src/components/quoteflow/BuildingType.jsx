import Head from 'next/head';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingSpinner } from '@components/shared';
import { MultiFamilyIcon, SingleFamilyIcon } from '@components/shared/Icons';
import { B1 } from '@components/shared/Typography';
import { sendTrack } from '@utils/analytics';

const RESIDENCE_TYPES = { MULTI_FAMILY: 'multi_family', SINGLE_FAMILY: 'single_family' };

export default function BuildingType({ formData, saveData, currentPath, getQuote, nextStep, previousStep }) {
  const defaultResidenceType = RESIDENCE_TYPES.MULTI_FAMILY;
  const [residenceType, setResidenceType] = useState(formData?.residenceType || defaultResidenceType);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    sendTrack('InsuranceFormPage', {
      category: 'insurance',
      label: 'InsuranceFormPage',
      action: 'InsuranceFormPage',
      page: 'BuildingType',
      questions: ['BuildingType'],
      residenceType,
      version: 1,
    });

    await saveData({ residenceType });
    setIsLoading(false);
    nextStep();
  };

  useEffect(() => {
    sendTrack('InsuranceFormPageLoaded', {
      category: 'insurance',
      label: 'InsuranceFormPageLoaded',
      action: 'InsuranceFormPageLoaded',
      page: 'BuildingType',
      version: 1,
    });
  }, []);

  const multiFamilyButtonStyle =
    residenceType === defaultResidenceType
      ? 'o-btn o-btn-left o-btn--primary-building-type o-btn--full-width'
      : 'o-btn o-btn-left o-btn-building-type o-btn--full-width border-gray';

  const singleHomeButtonStyle =
    residenceType !== defaultResidenceType
      ? 'o-btn o-btn-left o-btn--primary-building-type o-btn--full-width'
      : 'o-btn o-btn-left o-btn-building-type o-btn--full-width border-gray';

  const multiFamilyTextStyle = residenceType === defaultResidenceType ? 'o-btn--active__text' : 'o-btn--inactive__text';

  const singleHomeTextStyle = residenceType !== defaultResidenceType ? 'o-btn--active__text' : 'o-btn--inactive__text';

  return (
    <div>
      <ToastContainer />
      <Head>
        <title>Your building type? | Lighthouse Insurance</title>
      </Head>
      <div className="l-form-header">
        <h1>Your building type?</h1>
        <B1 className="mt-4 mb-8">What kind of rental do you have?</B1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="o-building-type-container group">
          <button
            className={multiFamilyButtonStyle}
            type="button"
            onClick={() => setResidenceType(RESIDENCE_TYPES.MULTI_FAMILY)}
          >
            <MultiFamilyIcon />
            <span className={multiFamilyTextStyle}>Multifamily Community</span>
          </button>
          <button
            className={singleHomeButtonStyle}
            type="button"
            onClick={() => setResidenceType(RESIDENCE_TYPES.SINGLE_FAMILY)}
            disabled={isLoading}
          >
            <SingleFamilyIcon />
            <span className={singleHomeTextStyle}>Rental Home</span>
          </button>
        </div>
        <div className="l-previous-next-container">
          <button className="o-btn o-btn--secondary" type="button" onClick={previousStep} disabled={isLoading}>
            <img alt="arrowl" src="/static/assets/Icons/arrow_left.svg" color="#FFFFFF" />
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
