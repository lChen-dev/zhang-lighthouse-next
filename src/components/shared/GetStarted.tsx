import React, { useState } from 'react';
import { H2, H4, B1, B2, H3, H5 } from '@components/shared/Typography';
import { ChangeIcon, CheckIcon, CopyIcon, ShieldIcon } from './Icons';
import Link from 'next/link';
import CopyToClipboard from 'react-copy-to-clipboard';
import useSWR from 'swr';
import { User } from '@models/User';
import { authed } from '@utils/http';
import { LoadingSpinner } from '.';
import { Bank } from '@models/Bank';
import { Lease } from '@models/Lease';
import { PaymentStatus, ScheduledPayment } from '@models/ScheduledPayment';
import { formaPriceSize } from '@components/account/rewards/Rewards';
import { getBuildingURL, storeSearchQuery } from '@utils/building-helper';
import router from 'next/router';

interface Props {
  bank: Bank;
  leases: Lease[];
  scheduledPayments: ScheduledPayment[];
}

const GetStarted: React.FC<Props> = ({ bank, scheduledPayments, leases }) => {
  const [copied, setCopied] = useState(false);
  const { data: user } = useSWR<User>('/users/me', async () => (await authed.get('/users/me')).data, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  const earnedAmount = scheduledPayments
    .filter((item) => item.status === PaymentStatus.PROCESSED)
    .reduce((acc, cur) => (acc += cur.amount), 0);

  const referralUrl = user ? `https://www.lighthouse.app/ref/${encodeURIComponent(user?.referralCode)}` : '';
  if (!user || !leases) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner color={'#34966D'} />
      </div>
    );
  }
  return (
    <div className="pt-8 md:pt-3 xl:pt-6 w-full pb-6 md:pr-6 responsive-section-dashboard">
      {user?.givenName && (
        <>
          <H2 className="mb-1 font-bold">Welcome, {user?.givenName}!</H2>
          <B1 className="mb-8" weight="book" style={{ opacity: 0.85 }}>
            This is your dashboard for everything Lighthouse.
          </B1>
        </>
      )}

      {leases.length === 0 ? (
        <>
          <H4 className="mb-1 font-bold">You don’t have any lease yet</H4>
          <B2 className="mb-8" weight="book" style={{ opacity: 0.85 }}>
            Start renting right now.
          </B2>
          <div className="section-border w-full px-6 lg:px-12 pt-6 sm:pt-12 pb-8 flex justify-start md:justify-between mb-8">
            <div className="w-full md:w-auto">
              <ShieldIcon className="mb-4" />

              <H3 className="font-bold">Work with expert</H3>
              <B1 weight="book" style={{ opacity: 0.85 }}>
                Free apartment advice and searching
              </B1>
              <a
                href="/start"
                className="text-gray-dark block bg-orange-bright hover:bg-orange-400 mt-6 py-4 px-6 text-lg sm:text-xl rounded font-circular text-center"
              >
                <b>Get started</b> <span className="book">- it&apos;s free</span>
              </a>

              <a
                href="/search"
                style={{ opacity: 0.5 }}
                className="block mt-3 text-16px font-circular text-color text-center font-bold"
              >
                Browse on my own
              </a>
            </div>
            <img
              className="hidden md:block w-2/5 lg:w-auto lg:-mt-24"
              src="/static/assets/images/dashboard-illustration.svg"
            />
          </div>
        </>
      ) : (
        <>
          {/* have lease */}
          <H4 className="mb-1 font-bold">Your lease</H4>
          <B2 className="mb-8" weight="book" style={{ opacity: 0.85 }}>
            Units that you’re renting.
          </B2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {leases.map((item) => (
              <div className="section-border py-4 lg:py-10 px-6 lg:px-12">
                <H5 className="font-bold truncate" style={{ maxWidth: '100%' }}>
                  {item.property?.name}, {item.property?.zip}, {item.property?.address}, {item.property?.city},
                  {item.property?.state}
                </H5>
                <H3 className="font-bold mb-2">${item.monthlyRent}/mo</H3>
                <B1 className="mb-8" weight="book" style={{ opacity: 0.85 }}>
                  ${item.monthlyRewardAmount ? `${item.monthlyRewardAmount} monthly` : item.lumpRewardAmount} cash back
                </B1>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    const url = item.property && getBuildingURL(item.property);
                    storeSearchQuery(item.id);
                    router.push(url ?? '/');
                  }}
                >
                  <B1 className="text-green-active font-bold flex items-center cursor-pointer">
                    View
                    <img className="pl-2" src="/static/assets/Icons/arrow_right_alt_green.svg" alt="arrow" />
                  </B1>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {bank?.accountLastFourDigits ? (
        <>
          <div
            className="section-border w-full dashboard-earnings md:px-6 lg:px-12 pt-6 sm:pt-8 pb-8 flex flex-col items-center md:items-start md:flex-row justify-start md:justify-between"
            style={{ boxSizing: 'border-box' }}
          >
            <div className="dashboard-card w-full md:w-1/2 mb-10 md:mb-0">
              <B1 weight="book" className="font-medium">
                Your earnings:
              </B1>
              <div className="inline-block mb-4">{formaPriceSize(earnedAmount ? earnedAmount : 0)}</div>{' '}
              <B1 className="font-book mr-6 whitespace-nowrap" style={{ opacity: 0.65 }}>
                Account number ending in {bank.accountLastFourDigits}
              </B1>
              <div className="flex items-center flex-wrap">
                <H4 className="mb-1 mr-4" weight="font-bold">
                  {bank.bankName}
                </H4>
                <Link href="/account/rewards">
                  <div className="text-green-active flex items-center cursor-pointer">
                    <ChangeIcon />
                    <B1 className="text-green-active font-bold mr-6 ml-2 mb-0">Change</B1>
                  </div>
                </Link>
              </div>
            </div>
            <div className="dashboard-ref md:border-l w-full md:w-1/2 md:pl-5">
              <H4 className="block mb-2 pt-4 font-bold">Referrals</H4>
              <B2 className="block mb-6" weight="book">
                Share Lighthouse with a friend and get $50 for each that signs up, moves in, and starts renting.
                <Link href="/account/refer">
                  <span className="text-green-active font-bold cursor-pointer"> See more</span>
                </Link>
              </B2>

              <div className="w-full flex flex-col sm:flex-row sm:items-center relative">
                <CopyToClipboard
                  text={referralUrl}
                  onCopy={() => {
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 3000);
                  }}
                >
                  <div className="w-full">
                    <input
                      type="text"
                      className="px-6 pl-12 focus:outline-none py-4 flex-1 font-circular mr-0 w-full xl:mr-2 input-copy cursor-pointer"
                      value={referralUrl}
                      readOnly
                    />

                    <span
                      style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', outline: 0 }}
                    >
                      <CopyIcon />
                    </span>
                  </div>
                </CopyToClipboard>
                {copied && (
                  <div
                    className="input-copy flex items-center px-6"
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                  >
                    <span style={{ color: '#34966D', marginRight: 14 }}>
                      <CheckIcon />
                    </span>
                    <span className="font-bold font-circular">Link copied</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="section-border w-full dashboard-earnings md:px-6 lg:px-12 pt-6 sm:pt-8 pb-8 flex flex-col items-center md:items-start md:flex-row justify-start md:justify-between"
          style={{ boxSizing: 'border-box' }}
        >
          <div className="dashboard-card w-full md:w-1/2 mb-10 md:mb-0">
            <B1 weight="book">Your earnings:</B1>
            <div className="inline-block mb-6">{formaPriceSize(earnedAmount ? earnedAmount : 0)}</div>{' '}
            <B2 className="block mb-2" weight="book">
              You didn’t add any card
            </B2>
            <Link href="/account/rewards">
              <B1 className="text-green-active font-bold cursor-pointer">+ Add card</B1>
            </Link>
          </div>
          <div className="dashboard-ref md:border-l w-full md:w-1/2 md:pl-5">
            <H4 className="block mb-2 pt-4 font-bold">Referrals</H4>
            <B2 className="block mb-6" weight="book">
              Share Lighthouse with a friend and get $50 for each that signs up, moves in, and starts renting.
              <Link href="/account/refer">
                <span className="text-green-active font-bold cursor-pointer"> See more</span>
              </Link>
            </B2>
            <div className="w-full flex flex-col sm:flex-row sm:items-center relative">
              <CopyToClipboard
                text={referralUrl}
                onCopy={() => {
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 3000);
                }}
              >
                <div className="w-full">
                  <input
                    type="text"
                    className="px-6 pl-12 focus:outline-none py-4 flex-1 font-circular mr-0 w-full xl:mr-2 input-copy cursor-pointer"
                    value={referralUrl}
                    readOnly
                  />

                  <span
                    style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', outline: 0 }}
                  >
                    <CopyIcon />
                  </span>
                </div>
              </CopyToClipboard>
              {copied && (
                <div
                  className="input-copy flex items-center px-6"
                  style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                  <span style={{ color: '#34966D', marginRight: 14 }}>
                    <CheckIcon />
                  </span>
                  <span className="font-circular font-bold">Link copied</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStarted;
