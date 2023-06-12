import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sentryCaptureException } from '@utils/sentry';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { sendTrack } from '@utils/analytics';
import { nextApi } from '@utils/http';

function formatPhoneNumber(phoneNumberString) {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return ['(', match[2], ')', match[3], '-', match[4]].join('');
  }
  return null;
}

export default function SubmitClaimModal({ policy, display, setDisplay }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const closeModal = () => {
    setDisplay('none');
    setFormSubmitted(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const insuredRisk = policy?.included?.find(({ type }) => type === 'insured_risk');
      const insuredRiskId = insuredRisk?.id;

      const primaryNamedInsured = policy?.included?.find(
        ({ attributes }) => attributes.role === 'primary_named_insured'
      );
      const customerId = primaryNamedInsured?.relationships?.entity?.data?.id;
      const customer = policy?.included?.find(({ id }) => id === customerId);

      const dateOfLoss = document.getElementById('date-of-loss')?.value;
      const lossDescription = document.getElementById('loss-description')?.value;
      const phoneNumber = customer?.attributes?.phone;

      try {
        if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
          await nextApi.post('/policy/claims', {
            policyId: policy?.data?.id,
            insuredRiskId,
            dateOfLoss,
            lossDescription,
            contactPhone: formatPhoneNumber(customer?.attributes?.phone),
            contactEmail: customer?.attributes?.email,
          });
          sendTrack('ClaimSubmitted', {
            category: 'insurance',
            label: 'ClaimSubmitted',
            action: 'ClaimSubmitted',
            policyId: policy?.data?.id,
            insuredRiskId,
            dateOfLoss,
            lossDescription,
            contactPhone: formatPhoneNumber(customer?.attributes?.phone),
            contactEmail: customer?.attributes?.email,
            version: 1,
          });
          setFormSubmitted(true);
        } else {
          toast.warn('Add a phone number to your account to submit claim!', { position: 'bottom-right' });
        }
      } catch (error) {
        sentryCaptureException({
          info: 'unable top create policy claims info',
          error,
        });
        toast.error('Something went wrong!', { position: 'bottom-right' });
      }
    }
  };

  return (
    <div className="o-modal-screen o-dashboard-modal-screen" style={{ display }} onClick={closeModal}>
      <div className="o-dashboard-modal-contents" onClick={(e) => e.stopPropagation()}>
        <div className="o-modal-container o-dashboard-modal-container">
          <form onSubmit={onSubmit}>
            <h2 className="o-card__secondary-headline">Submit a Claim</h2>
            <p>Tell us what happened and claims processing will be in touch within 24 hours. </p>
            {formSubmitted ? (
              <button type="button" className="o-btn--full-width o-btn o-btn--primary" onClick={closeModal}>
                Return to Dashboard
              </button>
            ) : (
              <>
                <input id="date-of-loss" className="o-submit-claim__input" type="date" required />
                <textarea
                  id="loss-description"
                  className="o-submit-claim__text-area"
                  placeholder="Description"
                  required
                />
                <button className="o-btn--full-width o-btn o-btn--primary" type="submit">
                  Submit Claim
                </button>
              </>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
