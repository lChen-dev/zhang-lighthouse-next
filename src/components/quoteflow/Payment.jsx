import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { toast, ToastContainer } from 'react-toastify';

import { B2 } from '@components/shared/Typography';
import { LoadingSpinner } from '@components/shared';
import { sentryCaptureException } from '@utils/sentry';
import { canUpdateSubscription } from "@utils/payment-helpers";
import { sendTrack } from '@utils/analytics';
import { nextApi } from '@utils/http';

import TermsAndConditions from './TermsAndConditionsModal';
import 'react-toastify/dist/ReactToastify.css';

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#FFFFFF',
      fontSize: '24px',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.4)',
      },
      ':-webkit-autofill': {
        color: '#FFFFFF',
      },
    },
    invalid: {
      color: '#ef2961',
    },
  },
};

const CARD_SECONDARY_OPTIONS = {
  style: {
    base: {
      color: '#FFFFFF',
      fontSize: '14px',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.4)',
      },
      ':-webkit-autofill': {
        color: '#FFFFFF',
      },
    },
    invalid: {
      color: '#ef2961',
    },
  },
};

export default function Payment({ formData, saveData, stepPath, nextStep, previousStep, quote }) {
  const fieldDefaults = {
    number: false,
    cardholderName: false,
    expiration: false,
    cvc: false,
    zip: false,
    checkbox1: false,
    checkbox2: false,
  };
  const [payment, setPayment] = useState({ status: 'initial' });
  const [complete, setComplete] = useState(fieldDefaults);
  const [errorMessage, setErrorMessage] = useState({
    number: '',
    expiration: '',
    cvc: '',
  });
  const [cardholderName, setCardholderName] = useState('');
  const [zip, setZip] = useState('');
  const [modalDisplay, setModalDisplay] = useState('none');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setComplete({
      ...complete,
      checkbox2: acceptedTerms,
    });
  }, [acceptedTerms]);

  useEffect(() => {
    sendTrack('InsuranceFormPageLoaded', {
      category: 'insurance',
      label: 'InsuranceFormPageLoaded',
      action: 'InsuranceFormPageLoaded',
      version: 1,
    });
  }, []);

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e) => {
    e.preventDefault();
    let stripeSubscriptionId;
    sendTrack('InsuranceFormPage', {
      category: 'insurance',
      label: 'InsuranceFormPage',
      action: 'InsuranceFormPage',
      page: 'Payment',
      questions: ['paymentInfo'],
      version: 1,
    });
    setIsLoading(true);
    const previousCompleteState = { ...complete };
    setComplete(fieldDefaults);

    // Use your card Element with other Stripe.js APIs
    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: cardholderName,
        address: {
          postal_code: zip,
        },
        email: formData?.email,
      },
    });

    if (error) {
      sentryCaptureException({
        info: 'Policy QuoteFlow: unable to create payment method',
        error,
      });
      setIsLoading(false);
      return;
    }

    sendTrack('InsuranceFormPaymentSubmit', {
      category: 'insurance',
      label: 'InsuranceFormPaymentSubmit',
      action: 'InsuranceFormPaymentSubmit',
      version: 1,
    });

    await nextApi
      .post('/subscription', {
        name: `${formData?.firstName} ${formData?.lastName}`,
        email: formData?.email,
        address: formData?.address,
        paymentMethodId: paymentMethod.id,
        moveInDate: formData?.moveInDate,
        quoteId: quote.id,
        userId: formData?.userId,
      })
      .then(async ({ error: err, data, ...result }) => {
        if (err) {
          setIsLoading(false);
          sentryCaptureException({
            info: 'Policy QuoteFlow: Unable to update subscription',
            error: err,
          });
          throw err;
        }
        await saveData({ subscription: data }, false);
        stripeSubscriptionId = data.id;
        nextApi
          .post('/policy', { quoteId: quote.id, userId: formData?.userId, stripeSubscriptionId })
          .then(async ({ data: policyData }) => {
            await saveData({ policy: policyData?.policy }, false);

            sendTrack('InsuranceFormPaymentSuccess', {
              category: 'insurance',
              label: 'InsuranceFormPaymentSuccess',
              action: 'InsuranceFormPaymentSuccess',
              version: 1,
            });
            sendTrack('PolicyPurchased', {
              category: 'insurance',
              label: 'PolicyPurchased',
              action: 'PolicyPurchased',
              policy: policyData?.policy,
              version: 1,
            });

            setTimeout(() => {
              window.location.replace('/account/insurance');
            }, 1000);
          })
          .catch(async (err) => {
            // Cancel subscription if allowed, policy creation failed here
            const isSubscriptionUpdatable = await canUpdateSubscription(stripeSubscriptionId);
            if (isSubscriptionUpdatable) {
              await stripe.subscriptions.del(stripeSubscriptionId);
            }
            setIsLoading(false);
            toast.error('Something went wrong!', { position: 'bottom-right' });
            setComplete(previousCompleteState);
            sendTrack('InsuranceFormPaymentError', {
              category: 'insurance',
              label: 'InsuranceFormPaymentError',
              action: 'InsuranceFormPaymentError',
              version: 1,
            });
            sentryCaptureException({
              info: 'unable to delete policy',
              err,
            });
            toast.error('Something went wrong!', { position: 'bottom-right' });
          });
      })
      .catch((errors) => {
        setIsLoading(false);
        sentryCaptureException({
          info: 'Policy QuoteFlow: Unable to create policy',
          error: errors,
        });
        toast.error('Something went wrong', { position: 'bottom-right' });
        setComplete(previousCompleteState);
        sendTrack('InsuranceFormPaymentError', {
          category: 'insurance',
          label: 'InsuranceFormPaymentError',
          action: 'InsuranceFormPaymentError',
          version: 1,
        });
      });
  };

  const areAllComplete = () => {
    for (const key in complete) {
      if (complete[key] === false) {
        return false;
      }
    }
    return true;
  };

  const openTermsModal = (e) => {
    if (acceptedTerms === false) {
      setModalDisplay('flex');
    } else {
      setAcceptedTerms(false);
    }
  };

  const moveInDateDay = new Date(formData?.moveInDate).getDate();

  const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return (
    <div>
      <ToastContainer />
      <Head>
        <title>Payment | Lighthouse Insurance</title>
      </Head>
      <TermsAndConditions
        display={modalDisplay}
        setDisplay={setModalDisplay}
        setAcceptedTerms={setAcceptedTerms}
        acceptedTerms={acceptedTerms}
      />
      <div className="l-form-header">
        <h1>Payment</h1>
        <p className="mt-4 mb-8">
          Your first payment will be deducted immediately. Future payments will be deducted{' '}
          {moveInDateDay > 28
            ? 'on the last day of each month'
            : `on the ${moveInDateDay}${nth(moveInDateDay)} of each month`}
          .
        </p>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <div className="o-payment-form">
            <div className="o-card-elements__primary-container">
              <CardNumberElement
                options={CARD_OPTIONS}
                onChange={(e) => {
                  if (e.error) {
                    setPayment({ status: 'error' });
                    setErrorMessage({
                      ...errorMessage,
                      number: e.error.message ?? 'An unknown error occured',
                    });
                  } else {
                    setPayment({ status: 'initial' });
                    setErrorMessage({
                      ...errorMessage,
                      number: '',
                    });
                  }
                  if (e.complete) {
                    setComplete({
                      ...complete,
                      number: true,
                    });
                  } else {
                    setComplete({
                      ...complete,
                      number: false,
                    });
                  }
                }}
              />
            </div>

            <input
              className="o-text-input__cardholder-name"
              type="text"
              placeholder="CARDHOLDER NAME"
              minLength="1"
              required
              onChange={(e) => {
                setCardholderName(e.target.value);
                if (e.target.value.length > 0) {
                  setComplete({
                    ...complete,
                    cardholderName: true,
                  });
                } else {
                  setComplete({
                    ...complete,
                    cardholderName: false,
                  });
                }
              }}
            />

            <div className="o-card-elements__secondary-container">
              <div className="o-card-elements__secondary">
                <CardExpiryElement
                  options={CARD_SECONDARY_OPTIONS}
                  onChange={(e) => {
                    if (e.error) {
                      setPayment({ status: 'error' });
                      setErrorMessage({
                        ...errorMessage,
                        expiration: e.error.message ?? 'An unknown error occured',
                      });
                    } else {
                      setErrorMessage({
                        ...errorMessage,
                        expiration: '',
                      });
                    }
                    if (e.complete) {
                      setComplete({
                        ...complete,
                        expiration: true,
                      });
                    } else {
                      setComplete({
                        ...complete,
                        expiration: false,
                      });
                    }
                  }}
                />
              </div>

              <div className="o-card-elements__secondary">
                <CardCvcElement
                  options={CARD_SECONDARY_OPTIONS}
                  onChange={(e) => {
                    if (e.error) {
                      setPayment({ status: 'error' });
                      setErrorMessage({
                        ...errorMessage,
                        cvc: e.error.message ?? 'An unknown error occured',
                      });
                    } else {
                      setErrorMessage({
                        ...errorMessage,
                        cvc: '',
                      });
                    }
                    if (e.complete) {
                      setComplete({
                        ...complete,
                        cvc: true,
                      });
                    } else {
                      setComplete({
                        ...complete,
                        cvc: false,
                      });
                    }
                  }}
                />
              </div>
              <input
                className="o-text-input__zip-code"
                type="text"
                placeholder="Postal Zip"
                maxLength="5"
                minLength="5"
                required
                onChange={(e) => {
                  setZip(e.target.value);
                  if (e.target.value.length >= 5) {
                    setComplete({
                      ...complete,
                      zip: true,
                    });
                  } else {
                    setComplete({
                      ...complete,
                      zip: false,
                    });
                  }
                }}
              />
            </div>
          </div>
          <div className="o-error-message">
            {Object.values(errorMessage).map((message, index) => (
              <div key={`error-${index}`}>{message}</div>
            ))}
          </div>

          <div className="o-cost-breakdown">
            <table>
              <tbody>
                <tr>
                  <td>Monthly Premium</td>
                  <td>${(quote.monthlyPremium || 0).toFixed('2')}</td>
                </tr>
                <tr>
                  <td>
                    <B2 className="m-0">Policy Fee</B2>
                  </td>
                  <td>$1.00</td>
                </tr>
                <tr>
                  <td>
                    <b>Total Premium</b>
                  </td>
                  <td>
                    <b>${quote.totalPremium}/mo</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="o-consent-container">
            <div className="o-checkbox-container">
              <input
                type="checkbox"
                id="checkbox1"
                required
                onChange={(e) => {
                  if (e.target.checked) {
                    setComplete({
                      ...complete,
                      checkbox1: true,
                    });
                  } else {
                    setComplete({
                      ...complete,
                      checkbox1: false,
                    });
                  }
                }}
              />
              <label htmlFor="checkbox1">
                I understand this policy is limited in coverage. Please refer to the{' '}
                <a target="_blank" href="/static/assets/documents/Sample_Renters_Policy_Form.pdf">
                  sample policy
                </a>{' '}
                for full details.
              </label>
            </div>

            <div className="o-checkbox-container">
              <input type="checkbox" id="checkbox2" required onChange={openTermsModal} checked={acceptedTerms} />
              <label htmlFor="checkbox2" onClick={openTermsModal}>
                I agree to{' '}
                <a href="/static/assets/documents/LighthouseRentersTermsConditions.html" target="_blank">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="https://www.lighthouse.app/privacy" target="_blank">
                  Privacy Policy
                </a>
                .
              </label>
            </div>
          </div>

          <div className="l-previous-next-container">
            <button
              disabled={isLoading}
              onClick={previousStep}
              className="o-btn o-btn--secondary o-btn--secondary__small"
              type="button"
            >
              <img src="/static/assets/Icons/arrow_left.svg" alt="arrowleft" />
            </button>
            <button
              type="submit"
              className="o-btn o-btn--primary o-btn--primary__with-estimate"
              disabled={areAllComplete() === false || isLoading}
              style={{
                cursor: areAllComplete() === true ? 'pointer' : 'not-allowed',
                backgroundColor: areAllComplete() === true ? '#34966D' : '#F1F1F1',
                color: areAllComplete() === true ? '#FFFFFF' : '#C0C0C0',
              }}
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="o-btn--primary__text">
                    ${quote.totalPremium || '--'}/mo <span className="o-btn--primary__continue-text">- continue</span>
                  </span>
                  <img src="/static/assets/Icons/arrow_right.svg" alt="arrowr" />
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
    </div>
  );
}
