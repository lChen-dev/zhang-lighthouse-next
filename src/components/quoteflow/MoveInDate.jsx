import Router from 'next/router';
import Link from 'next/link';
import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { LoadingSpinner } from '@components/shared';
import { sendTrack } from '@utils/analytics';

export default function MoveInDate({ formData, saveData, stepPath, nextStep, previousStep }) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = formData?.moveInDate ? new Date(formData?.moveInDate) : tomorrow;
  const [moveInDate, onChange] = useState(defaultDate);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await saveData({ moveInDate });

    sendTrack('InsuranceFormPage', {
      category: 'insurance',
      label: 'InsuranceFormPage',
      action: 'InsuranceFormPage',
      page: 'Move in date',
      questions: ['moveInDate'],
      moveInDate,
      version: 1,
    });

    setIsLoading(false);
    nextStep();
  };

  // Set the min date to as early as the next day
  // (simplifies the API call which requires the min_effective date to be at midnight)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  useEffect(() => {
    sendTrack('InsuranceFormPageLoaded', {
      category: 'insurance',
      label: 'InsuranceFormPageLoaded',
      action: 'InsuranceFormPageLoaded',
      page: 'Move in date',
      version: 1,
    });
  }, []);

  return (
    <div>
      <Head>
        <title>When should your policy start? | Lighthouse Insurance</title>
      </Head>
      <div className="l-form-header font-circular">
        <h1>When should your policy start?</h1>
        <p className="mt-4 mb-8">Become covered as soon as tomorrow.</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="l-calendar">
          <Calendar onChange={onChange} value={moveInDate} calendarType="US" minDate={minDate} />
        </div>
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
