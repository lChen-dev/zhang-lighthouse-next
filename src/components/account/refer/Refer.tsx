import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import EmailValidator from 'email-validator';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import '../../../../public/static/assets/css/dashboard.css';
import { CheckIcon, CopyIcon, GiftIcon, ReferIcon, SmileIcon } from '@components/shared/Icons';
import { nextApi } from '@utils/http';
import { useErrors } from '@hooks/errors';
import { B1, B2, H2, H4 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';
import { useFetchUser } from '@hooks/user';

export default function Refer(): JSX.Element {
  const { data: user } = useFetchUser();
  const { addError } = useErrors();
  const [copied, setCopied] = useState(false);

  const [inviteState, setInviteState] = useState({ email: '', sent: false, error: '' });
  const { email, sent, error } = inviteState;

  const sendInviteEmail = async (): Promise<void> => {
    if (!email) return;
    if (EmailValidator.validate(email)) {
      await nextApi
        .post('/users/sendReferral', { email })
        .then(() => {
          setInviteState({ email: '', error: '', sent: true });
          setTimeout(() => setInviteState({ email, error, sent: false }), 2000);
        })
        .catch(addError);
    } else {
      setInviteState({ email, sent: false, error: 'Invalid email address' });
    }
  };

  if (!user) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner color="#34966D" />
      </div>
    );
  }

  const { referralCode } = user;
  const referralUrl = `https://www.lighthouse.app/ref/${encodeURIComponent(referralCode)}`;
  return (
    <div className="px-6 py-4 pb-8 xl:px-12 responsive-section-dashboard">
      <div className="flex flex-col xl:flex-row">
        <div className="flex-1 mb-6 xl:mb-0 xl:mr-8 box-border">
          <H2 className="mt-0 lg:mt-8 font-bold">Earn $50 for each referred friend</H2>
          <B1 className="mb-10 text-color" weight="book" style={{ opacity: 0.6 }}>
            Your friend will earn $50 too.
          </B1>
          <div className="flex flex-col-reverse xl:flex-row">
            <div className="p-4 xl:p-8 bg-white section-border flex-1 max-w-3xl xl:mr-12 mt-6 xl:mt-0">
              <B1 weight="font-bold">Copy and share your link</B1>
              <div className="w-full flex flex-col sm:flex-row sm:items-center relative">
                <input
                  type="text"
                  className="px-6 pl-12 focus:outline-none py-4 flex-1 font-circular mr-0 xl:mr-2 input-copy"
                  value={referralUrl}
                  readOnly
                />
                <CopyToClipboard
                  text={referralUrl}
                  onCopy={() => {
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 3000);
                  }}>
                  <button
                    style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', outline: 0 }}>
                    <CopyIcon />
                  </button>
                </CopyToClipboard>
                {copied && (
                  <div
                    className="input-copy flex items-center px-6"
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    <span style={{ color: '#34966D', marginRight: 14 }}>
                      <CheckIcon />
                    </span>
                    <span>Link copied</span>
                  </div>
                )}
              </div>
              <div className="w-full text-sm pt-2 sm:pt-1">
                <B2 color="text-gray-soft">
                  <span className="font-circular book">Share link on: </span>
                  <LinkButton
                    link={`https://www.facebook.com/share.php?u=https://www.lighthouse.app/ref/${encodeURIComponent(
                      referralCode,
                    )}&quote=Earn as you rent. Get your new apartment with Lighthouse.`}
                    text="Facebook"
                  />
                  <span className="px-1">|</span>
                  <LinkButton
                    link={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Earn as you rent. Get your new apartment with Lighthouse. https://www.lighthouse.app/ref/${referralCode}`,
                    )}`}
                    text="Twitter"
                  />
                  <span className="px-1">|</span>
                  <LinkButton
                    link={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.lighthouse.app/ref/${encodeURIComponent(
                      referralCode,
                    )}&title=Earn as you rent | Lighthouse&summary=Earn as you rent. Get your new apartment with Lighthouse.&source=lighthouse.rent`}
                    text="LinkedIn"
                  />
                </B2>
              </div>

              <B1 className="mt-8" weight="font-bold">
                Or invite friends by email
              </B1>
              <div className="flex flex-col mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={({ target: { value } }) => {
                    const err = EmailValidator.validate(value) ? '' : 'Invalid email address';
                    setInviteState({ sent, email: value, error: err });
                  }}
                  inputMode="email"
                  placeholder="Enter email address"
                  className="px-6 focus:outline-none py-4 flex-1 font-circular input-copy"
                />
                {error && <span className="text-red-600 font-circular">{error}</span>}
                <div className="w-full flex flex-row">
                  <ButtonCta
                    className="mt-8 w-full flex justify-center"
                    onClick={sendInviteEmail}
                    disabled={!!error || !email}>
                    {sent ? 'Sent!' : 'Send Referral Link'}
                  </ButtonCta>
                </div>
              </div>
            </div>

            <div className="xl:max-w-sm">
              <H4 className="font-bold">How It Works</H4>
              <table>
                <tbody>
                  <tr>
                    <td
                      className="text-brand"
                      style={{
                        verticalAlign: 'center',
                        width: '20px',
                        maxWidth: '20px',
                        minWidth: '20px',
                        boxSizing: 'content-box',
                      }}>
                      <ReferIcon />
                    </td>
                    <td className="pl-2 py-3" style={{ verticalAlign: 'center' }}>
                      <B2 color="text-gray-soft" weight="book">
                        Share a link with another renter.
                      </B2>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-brand"
                      style={{
                        verticalAlign: 'center',
                        width: '20px',
                        maxWidth: '20px',
                        minWidth: '20px',
                        boxSizing: 'content-box',
                      }}>
                      <SmileIcon />
                    </td>
                    <td className="pl-2 py-3" style={{ verticalAlign: 'center' }}>
                      <B2 color="text-gray-soft" weight="book">
                        They sign up and find a unit with cash back.
                      </B2>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-brand"
                      style={{
                        verticalAlign: 'center',
                        width: '20px',
                        maxWidth: '20px',
                        minWidth: '20px',
                        boxSizing: 'content-box',
                      }}>
                      <GiftIcon />
                    </td>
                    <td className="pl-2 py-3" style={{ verticalAlign: 'center' }}>
                      <B2 color="text-gray-soft" weight="book">
                        After move in, you both get $50 in cash.
                      </B2>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LinkButtonProps {
  link: string;
  text: string;
}
function LinkButton({ link, text }: LinkButtonProps): JSX.Element {
  const onClick = () => {
    window.location.href = link;
  };
  return (
    <button type="button" className="mx-1 text-brand font-bold hover:underline focus:outline-none" onClick={onClick}>
      {text}
    </button>
  );
}
