/* eslint-disable react/jsx-one-expression-per-line */
import React, { ReactNode } from 'react';

import { Lease, PaymentStatus, ScheduledPayment } from '@models/index';
import { useFetchLeases } from '@hooks/account';
import { LoadingSpinner } from '@components/shared';
import { B1, H1 } from '@components/shared/Typography';
import { numberWithCommas } from '@utils/format';
import Payment from '@components/quoteflow/Payment';
import BankSelector from './BankSelector';
import OfferSelector from './OfferSelector';
import ScheduledPaymentsTable from './ScheduledPaymentsTable';

export const formaPriceSize = (num: number): ReactNode => {
  const strArr = String(num).split('.');
  return (
    <H1 className="font-bold inline-block text-center ml-auto mr-auto mb-2" style={{ display: 'block' }}>
      ${numberWithCommas(Number(strArr[0]))}
      <span className="font-circular font-bold text-28px lg:text-36px">.{strArr.length === 1 ? '00' : strArr[1]}</span>
    </H1>
  );
};

interface Props {
  scheduledPayments: ScheduledPayment[];
  leaseData: Lease[];
}

const Rewards: React.FC<Props> = ({ leaseData, scheduledPayments }: Props) => {
  const { data: leases, error, revalidate } = useFetchLeases(true, {
    initialData: leaseData,
  });

  const earnedAmount = scheduledPayments
    .filter(
      (item) =>
        item.status === PaymentStatus.PENDING ||
        item.status === PaymentStatus.SCHEDULED ||
        item.status === PaymentStatus.PROCESSED,
    )
    .reduce((acc, cur) => (acc += cur.amount), 0);

  if (error) {
    return (
      <div className="px-6 py-4 xl:px-12">
        <p className="p-4 bg-red-600 text-white mb-2 rounded w-full xl:max-w-4xl">Failed to load leases</p>
      </div>
    );
  }

  // User needs to select offer
  const pendingLeases: Lease[] = (leases || []).filter((lease) => !lease.acceptedOffer);
  if (pendingLeases.length > 0) {
    return <OfferSelector leases={pendingLeases} onConfirm={revalidate} />;
  }

  if (!leases)
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner color="#34966D" />
      </div>
    );

  // User needs to verify email
  // Connect bank account w/ Plaid
  // Show bank account w/ scheduled payments
  return (
    <div className="py-4 xl:px-12 responsive-section-dashboard w-full box-border">
      <B1 className="text-center lg:mt-8" weight="book" style={{ opacity: 0.6 }}>
        Your earnings on Lighthouse:
      </B1>
      {formaPriceSize(earnedAmount || 0)}
      <BankSelector />
      <ScheduledPaymentsTable scheduledPayments={scheduledPayments} />
    </div>
  );
};

export default Rewards;
