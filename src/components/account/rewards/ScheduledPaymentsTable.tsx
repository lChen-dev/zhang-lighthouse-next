import { DateTime } from 'luxon';
import React, { useState } from 'react';
import classNames from 'classnames';

import LoadingSpinner from '@components/shared/LoadingSpinner';
import useBank from '@hooks/useBank';
import { PaymentStatus, ScheduledPayment } from '@models/index';
import { useFetchScheduledPayments } from '@hooks/account';
import { numberWithCommas } from '@utils/format';
import { B2, H4, H5 } from '@components/shared/Typography';
import { CancelIcon, CheckIconGreen, PendingIcon } from '@components/shared/Icons';

enum Tab {
  SCHEDULED,
  PAID,
  ALL,
}

interface Props {
  scheduledPayments: ScheduledPayment[];
}

const ScheduledPaymentsTable: React.FC<Props> = ({ scheduledPayments: initialPayments }: Props) => {
  const [tab, setTab] = useState(Tab.ALL);
  const { bank } = useBank();
  const { data: scheduledPayments, error, isValidating } = useFetchScheduledPayments({ initialData: initialPayments });

  if (!bank) return null;

  if (error) {
    return (
      <div className="px-6 py-4 xl:px-12">
        <p className="p-4 bg-red-600 text-white mb-2 rounded w-full xl:max-w-4xl">Failed to load scheduled payments</p>
      </div>
    );
  }

  if (!scheduledPayments || isValidating) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner color={'#34966D'} />
      </div>
    );
  }

  let payments: ScheduledPayment[] = [];
  if (tab === Tab.SCHEDULED) {
    payments = scheduledPayments.filter((payment) => payment.status !== PaymentStatus.PROCESSED);
  } else if (tab === Tab.PAID) {
    payments = scheduledPayments.filter((payment) => payment.status === PaymentStatus.PROCESSED);
  } else if (tab === Tab.ALL) {
    payments = scheduledPayments;
  }

  payments = payments.sort(
    (payA, payB) => DateTime.fromISO(payA.date).toMillis() - DateTime.fromISO(payB.date).toMillis()
  );

  return (
    <div className="pt-2">
      <H4 className="mb-2 font-bold">Recent payouts</H4>
      <B2 weight="book">Please allow up to 10 business days for payments to arrive in your account.</B2>
      <div className="grid-cols-3 mt-8 mb-4 w-full table-tabs">
        <TabButton text="All payouts" selected={tab === Tab.ALL} onSelected={() => setTab(Tab.ALL)} />
        <TabButton text="Scheduled" selected={tab === Tab.SCHEDULED} onSelected={() => setTab(Tab.SCHEDULED)} />
        <TabButton text="Paid" selected={tab === Tab.PAID} onSelected={() => setTab(Tab.PAID)} />
      </div>
      {payments.length > 0 ? (
        <>
          {/* mobile version */}
          <div className="block md:hidden mt-6 mb-8">
            {payments.map((item) => (
              <div className="section-border mb-4 px-8 py-6">
                <div className="flex items-center justify-between mb-4">
                  <B2 weight="book" style={{ color: statusStyle({ status: item.status }).color }}>
                    {DateTime.fromISO(item.date).toFormat('DDD')}
                  </B2>
                  {statusStyle({ status: item.status }).icon}
                </div>
                <H5 className="font-bold" style={{ color: statusStyle({ status: item.status }).color }}>
                  ${numberWithCommas(item.amount)}
                </H5>
              </div>
            ))}
          </div>

          {/* deskop table */}
          <div className="hidden md:block">
            <table className="table w-full mt-4">
              <thead>
                <tr className="table-border-bottom" style={{ background: 'linear-gradient(0deg, #FBFBFB, #FBFBFB)' }}>
                  <th
                    className="font-circular text-14px book text-left py-4 pl-2"
                    style={{ color: 'rgba(42, 52, 58, 0.5)' }}
                  >
                    Request date
                  </th>
                  <th
                    className="font-circular text-14px book text-right py-4"
                    style={{ color: 'rgba(42, 52, 58, 0.5)' }}
                  >
                    Amount
                  </th>
                  <th
                    className="font-circular text-14px book text-left py-4 pr-2"
                    style={{ color: 'rgba(42, 52, 58, 0.5)', width: 50, paddingLeft: 70 }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr className="table-row table-border-bottom" key={`payment-${payment.id}`}>
                    <td
                      className="table-cell text-18px pl-2 py-4 book font-circular"
                      style={{ color: statusStyle({ status: payment.status }).color, opacity: 0.85 }}
                    >
                      {DateTime.fromISO(payment.date).toFormat('DDD')}
                    </td>
                    <td
                      className="table-cell font-bold text-18px text-right font-circular"
                      style={{ color: statusStyle({ status: payment.status }).color }}
                    >
                      ${numberWithCommas(payment.amount)}
                    </td>
                    <td className="table-cell font-circular text-left pr-4" style={{ width: 50, paddingLeft: 70 }}>
                      {statusStyle({ status: payment.status }).icon}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="mt-2 text-gray-500 font-circular font-book">No payments found</p>
      )}
    </div>
  );
};
export default ScheduledPaymentsTable;

interface StatusBadgeProps {
  status: string | null;
}

const tableColorsMap = {
  gray: 'rgba(42, 52, 58, 0.45)',
  red: '#E35A5A',
  black: '#2A343A',
  green: '#34966D',
};

function statusStyle({ status }: StatusBadgeProps): { color: string; icon: JSX.Element } {
  switch (status) {
    case null:
    case PaymentStatus.SCHEDULED:
      return {
        color: tableColorsMap.gray,
        icon: (
          <div className="text-14px font-bold flex items-center" style={{ color: tableColorsMap.gray }}>
            <PendingIcon />
            &nbsp;&nbsp;Scheduled
          </div>
        ),
      };
    case PaymentStatus.PENDING:
      return {
        color: tableColorsMap.gray,
        icon: (
          <div className="text-14px font-bold flex items-center" style={{ color: tableColorsMap.gray }}>
            <PendingIcon />
            &nbsp;&nbsp;Pending
          </div>
        ),
      };
    case PaymentStatus.PROCESSED:
      return {
        color: tableColorsMap.black,
        icon: (
          <div className="text-14px font-bold flex items-center" style={{ color: tableColorsMap.green }}>
            <CheckIconGreen width={16} height={11} />
            &nbsp;&nbsp;Processed
          </div>
        ),
      };
    case PaymentStatus.CANCELLED:
      return {
        color: tableColorsMap.red,
        icon: (
          <div className="text-14px font-bold flex items-center" style={{ color: tableColorsMap.red }}>
            <CancelIcon />
            &nbsp;&nbsp;Cancelled
          </div>
        ),
      };
    case PaymentStatus.FAILED:
      return {
        color: tableColorsMap.red,
        icon: (
          <div className="text-14px font-bold flex items-center" style={{ color: tableColorsMap.red }}>
            <CancelIcon />
            &nbsp;&nbsp;Failed
          </div>
        ),
      };
    default:
      return {
        color: '#2A343A',
        icon: <div>{status}</div>,
      };
  }
}

interface TabButtonProps {
  text: string;
  selected: boolean;
  onSelected: () => void;
}
function TabButton({ text, selected, onSelected }: TabButtonProps): JSX.Element {
  return (
    <div style={{ borderBottom: `1px solid ${selected ? '#34966D' : '#EEEEEE'}` }}>
      <button
        className={classNames(
          'mr-8 font-circular text-16px pb-4 border-b-2 w-full font-bold payments-tab focus:outline-none',
          {
            active: selected,
          }
        )}
        type="button"
        onClick={onSelected}
      >
        {text}
      </button>
    </div>
  );
}
