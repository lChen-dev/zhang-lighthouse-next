import React, { useState } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';

import Rewards from '@components/account/rewards/Rewards';
import { BankContext } from '@hooks/useBank';
import { Bank, Lease, ScheduledPayment } from '@models/index';
import BankService from '@services/bank.service';
import LeaseService from '@services/lease.service';
import { validateSession } from '@utils/auth';
import { createHttpClient } from '@utils/http';
import { sentryGetServerSideProps } from '@utils/sentry';

import '../../../public/static/assets/css/account.css';
import '../../../public/static/assets/css/dashboard.css';
import DashboardPage from '@components/account/DashboardPage';

interface Props {
  bank?: Bank;
  scheduledPayments: ScheduledPayment[];
  leases: Lease[];
}

const RewardPage = ({ bank: initialBank, scheduledPayments, leases }: Props): React.ReactElement => {
  const [bank, setBank] = useState(initialBank);
  return (
    <DashboardPage title="Dashboard">
      <BankContext.Provider value={{ bank, setBank }}>
        <Rewards scheduledPayments={scheduledPayments} leaseData={leases} />
      </BankContext.Provider>
    </DashboardPage>
  );
};

export const getServerSideProps: GetServerSideProps = sentryGetServerSideProps(async ({ req, res }) => {
  try {
    const userId = await validateSession(req as NextApiRequest);
    if (userId) {
      const client = createHttpClient(req.headers.cookie, { validateStatus: () => true });
      const { data: scheduledPayments } = await client.get<ScheduledPayment[]>('/scheduled_payments');
      const bank = await BankService.fetchActiveBank(client);
      const leases = await LeaseService.fetchLeases(client, true);

      return {
        props: {
          scheduledPayments,
          bank,
          leases,
        },
      };
    }
  } catch (e) {
    // fall through
  }
  return {
    redirect: {
      destination: '/?post_login_url=/account/rewards',
      permanent: false,
    },
  };
});

export default RewardPage;
