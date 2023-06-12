import React from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import { Bank, Lease, ScheduledPayment } from '@models/index';
import { sentryGetServerSideProps } from '@utils/sentry';

import '../../../public/static/assets/css/account.css';
import '../../../public/static/assets/css/dashboard.css';
import DashboardPage from '@components/account/DashboardPage';
import Dashboard from '@components/account/dashboard/Dashboard';
import { validateSession } from '@utils/auth';
import BankService from '@services/bank.service';
import LeaseService from '@services/lease.service';
import { createHttpClient } from '@utils/http';

interface Props {
  bank: Bank;
  scheduledPayments?: ScheduledPayment[];
  leases: Lease[];
}

const RewardPage: React.FC<Props> = ({ bank, leases, scheduledPayments }) => {
  return (
    <DashboardPage title="Dashboard">
      <Dashboard leases={leases} bank={bank} scheduledPayments={scheduledPayments} />
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
      destination: `/?post_login_url=/account/dashboard`,
      permanent: false,
    },
  };
});

export default RewardPage;
