import React from 'react';
import { NextApiRequest } from 'next';
import Perks from '@components/account/perks/Perks';
import { validateSession } from '@utils/auth';
import '../../../public/static/assets/css/account.css';
import DashboardPage from '@components/account/DashboardPage';

const PerksPage = (): React.ReactElement => {
  return (
    <DashboardPage title="Dashboard">
      <Perks />
    </DashboardPage>
  );
};

export const getServerSideProps: any = async ({ req, res }: any) => {
  const userId = await validateSession(req as NextApiRequest);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/?post_login_url=/account/perks',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default PerksPage;
