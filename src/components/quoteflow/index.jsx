import { Elements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Header } from '@components/shared';
import { toast, ToastContainer } from 'react-toastify';
import BuildingType from '@components/quoteflow/BuildingType';
import { sentryCaptureException } from '@utils/sentry';
import { sendTrack } from '@utils/analytics';
import { nextApi } from '@utils/http';
import { useAuth } from 'context/auth';

import Name from './Name';
import Address from './Address';
import MoveInDate from './MoveInDate';
import CorePolicies from './CorePolicies';
import AddOns from './AddOns';
import FinalSteps from './FinalSteps';
import Payment from './Payment';
import InterestedParty from './InterestedParty';
import getStripe from '../../utils/get-stripejs';
import 'react-toastify/dist/ReactToastify.css';

const stepPath = '/insurance/quote/[stepId]';

const steps = {
  name: Name,
  'building-type': BuildingType,
  address: Address,
  'move-in-date': MoveInDate,
  'core-policies': CorePolicies,
  'add-ons': AddOns,
  'final-steps': FinalSteps,
  payment: Payment,
  'interested-party': InterestedParty,
};

const stepKeys = Object.keys(steps);

const getAdjacentSteps = (step) => {
  const currentStep = stepKeys.findIndex((s) => s === step);
  return {
    currentStep: `/insurance/quote/${stepKeys[currentStep]}`,
    previousStep: currentStep > 0 ? `/insurance/quote/${stepKeys[currentStep - 1]}` : null,
    nextStep: currentStep < stepKeys.length ? `/insurance/quote/${stepKeys[currentStep + 1]}` : null,
  };
};

export default function Quote() {
  const { user } = useAuth();
  const router = useRouter();
  const { stepId: routerId } = router.query;
  const [stepId, setStepId] = useState(routerId);
  const [Step, updateStep] = useState(() => steps[stepId]);

  const setNextStep = (step) => {
    const nextIndex = stepKeys[stepKeys.indexOf(step)];
    if (steps[nextIndex]) {
      if (nextIndex.includes('interested-party')) {
        updateStep(steps['interested-party']);
        setStepId('interested-party');
        window.location.replace('/account/insurance');
        return;
      }
      router.push(nextIndex);
      updateStep(() => {
        const upNext = steps[nextIndex];
        if (!upNext) {
          return steps[stepKeys[0]];
        }
        return upNext;
      });
      setStepId(nextIndex);
    }
  };

  let sessionStorageFormData;
  if (typeof sessionStorage !== 'undefined') {
    sessionStorageFormData = JSON.parse(sessionStorage.getItem('formData'));
  }
  let sessionStorageQuote;
  if (typeof sessionStorage !== 'undefined') {
    sessionStorageQuote = JSON.parse(sessionStorage.getItem('quote'));
  }

  const defaultState = {
    firstName: '',
    personalContents: 10000,
    personalLiability: 100000,
    deductible: 250,
  };

  const [formData, setFormData] = useState({ ...defaultState, ...sessionStorageFormData });
  const [quote, setQuote] = useState({ ...sessionStorageQuote });
  const [componentVisible, setComponentVisible] = useState(false);

  const getQuote = async (formData = {}) => {
    try {
      const response = await nextApi.post('/quote', {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        phoneNumber: formData?.phoneNumber,
        address: formData?.address,
        moveInDate: formData?.moveInDate,
        personalContents: formData?.personalContents,
        personalLiability: formData?.personalLiability,
        deductible: formData?.deductible,
        addOns: formData?.selectedAddOns,
        valuableItems: formData?.valuableItems,
        significantOthers: formData?.significantOthers,
        quoteId: quote.id,
        residenceType: formData?.residenceType,
      });
      const updatedQuote = response?.data;
      sessionStorage.setItem('quote', JSON.stringify({ ...quote, ...updatedQuote }));
      setQuote({ ...quote, ...updatedQuote });
    } catch (err) {
      sentryCaptureException({
        info: 'Policy QuoteFlow: unable to create quote',
        error: err,
      });
      toast.error('Something went wrong!', { position: 'bottom-right' });
    }
  };
  const saveData = (data = {}, quote = true) => {
    const oldData = JSON.parse(sessionStorage.getItem('formData'));
    const obj = { ...oldData, ...formData, ...data, stepId };
    sessionStorage.setItem('formData', JSON.stringify(obj));
    setFormData({ ...formData, ...data });
    if (quote) return getQuote({ ...obj });
    return {};
  };

  useEffect(() => {
    // If this user hasn't been created yet, the user's name will be the phone number
    if (stepId === 'name') {
      sendTrack('InsuranceFormStart', {
        category: 'insurance',
        label: 'InsuranceFormStart',
        action: 'InsuranceFormStart',
        version: 1,
      });
    }
    setComponentVisible(true);
    let phoneNumber;
    if (user?.phoneNumber) {
      phoneNumber = user.phoneNumber;
    } else {
      // Get phone number from session
      phoneNumber = sessionStorage.getItem('phoneNumber');
    }
    saveData({ phoneNumber }, false);
  }, []);

  useEffect(() => {
    if (user) {
      saveData({
        userId: user.id,
        firstName: user.givenName,
        lastName: user.familyName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user]);

  // Enable browser buttons (back/next)
  useEffect(() => {
    setNextStep(stepId);
  }, [stepId]);

  return (
    <>
      <Header />
      <main className="l-quote-flow">
        {componentVisible && (
          <>
            <Elements stripe={getStripe()}>
              <ToastContainer />
              {Step && (
                <Step
                  formData={formData}
                  saveData={saveData}
                  getQuote={getQuote}
                  nextStep={() => {
                    const allSteps = Object.keys(steps);
                    const currentStepIndex = allSteps.indexOf(stepId);
                    const nextStepIndex = allSteps[currentStepIndex + 1];
                    if (nextStepIndex) {
                      setNextStep(nextStepIndex);
                      return;
                    }
                    setNextStep(currentStepIndex);
                  }}
                  currentPath={() => {
                    const data = getAdjacentSteps(stepId);
                    const { currentStep } = data;
                    return currentStep;
                  }}
                  stepPath={stepPath}
                  previousStep={() => {
                    const allSteps = Object.keys(steps);
                    const currentStepIndex = allSteps.indexOf(stepId);
                    const nextStepIndex = allSteps[currentStepIndex - 1];
                    if (nextStepIndex) {
                      setNextStep(nextStepIndex);
                      return;
                    }
                    setNextStep(currentStepIndex);
                  }}
                  quote={quote}
                />
              )}
            </Elements>
          </>
        )}
      </main>
    </>
  );
}
