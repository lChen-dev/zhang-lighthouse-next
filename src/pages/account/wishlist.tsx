import React from 'react';
import '../../../public/static/assets/css/account.css';
import dynamic from 'next/dynamic';
import { GetServerSideProps, NextApiRequest } from 'next';
import { sentryGetServerSideProps } from '@utils/sentry';
import DashboardPage from '@components/account/DashboardPage';
import { validateSession } from '@utils/auth';

const Wishlist = dynamic(() => import('@components/account/wishlist/Wishlist'), { ssr: false });

const wishlist: React.FC = () => (
  <DashboardPage title="Wishlist">
    <Wishlist />
  </DashboardPage>
);

export const getServerSideProps: GetServerSideProps = sentryGetServerSideProps(async ({ req, res }) => {
  try {
    const userId = await validateSession(req as NextApiRequest);
    return { props: { userId } };
  } catch (e) {
    return {
      redirect: {
        destination: '/?post_login_url=/account/wishlist',
        permanent: false,
      },
    };
  }
});

export default wishlist;
