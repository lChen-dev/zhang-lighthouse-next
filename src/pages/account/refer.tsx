import React from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';

import '../../../public/static/assets/css/account.css';
import Refer from '@components/account/refer/Refer';
import { validateSession } from '@utils/auth';
import { sentryGetServerSideProps } from '@utils/sentry';
import DashboardPage from '@components/account/DashboardPage';

const ReferPage = (): React.ReactElement => {
  return (
    <DashboardPage title="Refer">
      <Refer />
    </DashboardPage>
  );
};

export const getServerSideProps: GetServerSideProps = sentryGetServerSideProps(async ({ req, res }) => {
  try {
    const userId = await validateSession(req as NextApiRequest);
    return { props: { userId } };
  } catch (e) {
    return {
      redirect: {
        destination: '/?post_login_url=/account/refer',
        permanent: false,
      },
    };
  }
});

export default ReferPage;
