import React, { useCallback, useEffect, useState } from 'react';
import useScript from 'react-script-hook';

import LoadingSpinner from '@components/shared/LoadingSpinner';
import useBank from '@hooks/useBank';
import { nextApi } from '@utils/http';
import { useErrors } from '@hooks/errors';
import ButtonCta from '@components/shared/ButtonCta';
import Modal from '@components/modal';
import VerifyOTP from '@components/auth/verifyOtp';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from 'context/auth';
import { RightArrowIcon } from '../../shared/Icons';
import PlaidBankSelector from './PlaidBankSelector';
import PlaidBankVerifier from './PlaidBankVerifier';
import 'react-toastify/dist/ReactToastify.css';

const PLAID_LINK_STABLE_URL = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';

export default function BankSelector(): JSX.Element {
  const { user, login } = useAuth();
  const { givenName, familyName, email, emailVerified, phoneNumber } = user || {
    givenName: '',
    familyName: '',
    email: '',
    emailVerified: '',
    phoneNumber: '',
  };

  const { addError } = useErrors();
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState<any>({
    visible: false,
    email,
    phoneNumber,
    expiration: 0,
    methodId: '',
  });
  const [emailSent, setEmailSent] = useState(false);
  const { bank, setBank } = useBank();
  /**
   * Do to race condition in plaid link library we load this script ourselves before loading
   * plaid link components
   */
  const [loadingScript, errorScript] = useScript({
    src: PLAID_LINK_STABLE_URL,
    checkForExisting: true,
  });

  const [generatedToken, setGeneratedToken] = useState<string>();
  const [generatedVerificationToken, setGeneratedVerificationToken] = useState<string>();

  useEffect(() => {
    nextApi
      .post('/banks/create_link_token')
      .then(({ data: { link_token: linkToken } }) => setGeneratedToken(linkToken))
      .catch(addError);
    nextApi
      .post('/banks/create_verification_link_token')
      .then(({ data: { link_token: linkToken } }) => setGeneratedVerificationToken(linkToken))
      .catch(() => null);
  }, []);

  const onSuccess = useCallback(
    async (token, metadata) => {
      setLoading(true);

      try {
        const body = {
          token,
          metadata,
          firstName: givenName,
          lastName: familyName,
          email,
        };
        await nextApi.post('/banks/active', body, { timeout: 10_000 });
        setBank(await (await nextApi.get('/banks/active')).data);
      } catch (err) {
        addError(err);
      }
      setLoading(false);
    },
    [addError, setLoading, setBank, givenName, familyName, email],
  );

  const sendVerificationEmail = async (): Promise<void> => {
    setLoading(true);
    const {
      data: { methodId, expirationSec: expiration },
    }: any = await nextApi.post('/auth/verify_email', { email }).catch(addError);
    setModalState({
      visible: true,
      methodId,
      email,
      phoneNumber,
      expiration,
    });
    toast('verification email sent, please verify from email verification after reload this page to connect bank');
    setLoading(false);
    setEmailSent(true);
  };
  const { visible: modalIsVisible, methodId, expiration } = modalState;

  // Bank has already been selected, show bank info
  return (
    <>
      <ToastContainer />
      <div
        className="rewards-card bg-white mb-12 ml-auto mr-auto p-4 xl:p-6 flex flex-row items-center xl:max-w-4xl w-full"
        style={{ maxWidth: 740, height: 103 }}>
        <div className="flex flex-col flex-1">
          {bank ? (
            <>
              <p className="font-circular text-14px font-regular text-color" style={{ opacity: 0.85 }}>
                Connected bank:
              </p>
              <h5 className="font-circular text-20px font-bold text-color">{bank.bankName}</h5>
              <p
                className="font-circular text-14px book text-color mb-0"
                style={{ opacity: 0.65, letterSpacing: '-0.02em' }}>
                Account number ending in {bank.accountLastFourDigits}
              </p>
            </>
          ) : (
            <p className="text-color font-bold font-circular flex-1 pr-2 m-0">
              Connect your bank account for cash back.
            </p>
          )}
        </div>
        {emailVerified ? (
          <>
            {generatedVerificationToken &&
              bank &&
              bank.verificationStatus === 'pending_manual_verification' &&
              !loadingScript && <PlaidBankVerifier user={user} linkToken={generatedVerificationToken} />}
            {generatedToken && !loadingScript && <PlaidBankSelector user={user} linkToken={generatedToken} />}
          </>
        ) : (
          <ButtonCta
            icon={loading ? LoadingSpinner : RightArrowIcon}
            iconPos="right"
            disabled={loading || !email || emailSent}
            onClick={() => sendVerificationEmail()}>
            Verify Email
          </ButtonCta>
        )}
      </div>
      <div className="relative">
        <Modal show={modalIsVisible} enableDarkMode={false} onClose={() => setModalState({ visible: false })}>
          <VerifyOTP
            email={email}
            phoneNumber={phoneNumber}
            expiration={expiration}
            methodId={methodId}
            callback={() => {
              setModalState({ visible: false });
              login({ ...user, emailVerified: true });
            }}
          />
        </Modal>
      </div>
    </>
  );
}
