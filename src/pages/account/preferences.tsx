import React from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import Preferences from '@components/account/preferences/Preferences';
import { sentryGetServerSideProps } from '@utils/sentry';

import '../../../public/static/assets/css/account.css';
import DashboardPage from '@components/account/DashboardPage';
import { validateSession } from '@utils/auth';

const PreferencesPage = (): React.ReactElement => (
  <DashboardPage title="Preferences">
    <Preferences />
  </DashboardPage>
);

export const getServerSideProps: GetServerSideProps = sentryGetServerSideProps(async ({ req, res }) => {
  try {
    const userId = await validateSession(req as NextApiRequest);
    if (userId) {
      return { props: { userId } };
    }
  } catch (e) {
    // fall through
    console.error(e);
  }
  return {
    redirect: {
      destination: '/?post_login_url=/account/preferences',
      permanent: false,
    },
  };
});

export default PreferencesPage;
