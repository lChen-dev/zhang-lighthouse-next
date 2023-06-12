import React from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';

import '../../../../public/static/assets/css/account.css';
import '../../../styles/globals.css';
import '../../../components/account/insurance/styles.css';

import Insurance from '@components/account/insurance';
import DashboardPage from '@components/account/DashboardPage';
import { sentryGetServerSideProps } from '@utils/sentry';
import { validateSession } from '@utils/auth';

const InsurancePage = (): React.ReactElement => {
  return (
    <DashboardPage title="Insurance">
      <Insurance />
    </DashboardPage>
  );
};

export const getServerSideProps: GetServerSideProps = sentryGetServerSideProps(async ({ req }) => {
  try {
    const userId = await validateSession(req as NextApiRequest);
    if (userId) return { props: { userId } };
  } catch (e) {
    // fall through
    console.error(e);
  }
  return {
    redirect: {
      destination: `/logout`,
      permanent: false,
    },
  };
});

export default InsurancePage;
