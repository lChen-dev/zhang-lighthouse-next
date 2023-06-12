import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sentryCaptureException } from '@utils/sentry';
import { policyActiveStatuses } from '@utils/policy-helpers';
import { useUser } from '@components/shared/UserProvider';
import { nextApi } from '@utils/http';

export default function CheckoutModal({
  policyId,
  display,
  setDisplay,
  updatedQuote,
  interestedParty,
  policyStatus,
  updateDisabled,
}) {
  const { user } = useUser();
  const router = useRouter();

  const closeModal = () => {
    setDisplay('none');
  };

  const isPolicyEditable = policyActiveStatuses(policyStatus);

  const onSubmit = async (e) => {
    if (typeof window !== 'undefined' && isPolicyEditable) {
      await nextApi
        .patch(
          `/policy/${policyId}`,
          {
            quoteId: updatedQuote?.id,
            startOfNextBillingPeriod: updatedQuote?.startOfNextBillingPeriod,
            userId: user.id,
          },
          { timeout: 120000 }, // 2 minutes timeout for saving policy prevent unexpected behaviour on UI, lots of intermediary requests, will need optimization
        )
        .then((response) => {
          const existingPolicyId = interestedParty?.boostId;
          const updatedPolicyId = response?.data?.policyId;
          if (existingPolicyId !== updatedPolicyId) {
            nextApi
              .post(
                '/interested-party',
                {
                  interestedPartyFirstName: interestedParty?.interestedPartyFirstName,
                  interestedPartyLastName: interestedParty?.interestedPartyLastName,
                  interestedPartyEmail: interestedParty?.interestedPartyEmail,
                  interestedPartyAddress: interestedParty?.interestedPartyAddress,
                  interestedPartyCity: interestedParty?.interestedPartyCity,
                  interestedPartyState: interestedParty?.interestedPartyState,
                  interestedPartyZip: interestedParty?.interestedPartyZip,
                  boostId: updatedPolicyId,
                  userId: interestedParty?.userId,
                },
                { timeout: 120000 }, // 2 minutes timeout for saving policy prevent unexpected behaviour on UI, lots of intermediary requests, will need optimization
              )
              .then((result) => {
                return result;
              });
          }
          closeModal();
          window.location.replace(`/account/insurance/policy/${response?.data?.policyId}`);
        })
        .catch((err) => {
          sentryCaptureException({
            info: 'unable to store interested-party info on checkout modal',
            error: err,
          });
          toast.error('Something went wrong!', { position: 'bottom-right' });
        });
    }
  };

  return (
    <div className="o-modal-screen o-dashboard-modal-screen" style={{ display }} onClick={closeModal}>
      <div className="o-dashboard-modal-contents o-dashboard-modal-contents--wide" onClick={(e) => e.stopPropagation()}>
        <div className="o-modal-container o-dashboard-modal-container">
          <h2 className="o-card__secondary-headline">Are you sure you want to update your policy?</h2>
          <p>
            The changes will be put into effect at the start of your next billing period, &nbsp;
            <b style={{ color: 'darkorange' }}>{updatedQuote?.startOfNextBillingPeriod}</b>. You will be charged &nbsp;
            <b style={{ color: 'darkorange' }}>${updatedQuote?.totalPremium}/mo</b>.
          </p>
          <button className="o-btn--full-width o-btn o-btn--primary" type="button" disabled={updateDisabled} onClick={onSubmit}>
            Yes, update my policy
          </button>
          <button className="o-keep-policy" type="button" onClick={closeModal}>
            I want to keep my policy the way it is
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
