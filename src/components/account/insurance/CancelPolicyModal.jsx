import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sentryCaptureException } from '@utils/sentry';
import { sendTrack } from '@utils/analytics';
import { nextApi } from '@utils/http';

export default function CancelPolicyModal({ policyId, display, setDisplay }) {
  const router = useRouter();

  const closeModal = () => {
    setDisplay('none');
  };

  const onSubmit = async (e) => {
    if (typeof window !== 'undefined') {
      try {
        await nextApi.delete(`/policy/${policyId}`);
        sendTrack('PolicyCanceled', {
          category: 'insurance',
          label: 'PolicyCanceled',
          action: 'PolicyCanceled',
          policy: policyId,
          version: 1,
        });
        closeModal();
        router.push('/account/insurance');
      } catch (error) {
        sentryCaptureException({
          info: 'unable to delete policy',
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
          <h2 className="o-card__secondary-headline">Are you sure you want to cancel your policy?</h2>
          <p>Cancelling will immediately suspend your policy.</p>
          <button type="button" className="o-btn--full-width o-btn o-btn--primary" onClick={onSubmit}>
            Yes, Cancel Policy
          </button>
          <button type="button" className="o-keep-policy" onClick={closeModal}>
            I want to keep my policy
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
