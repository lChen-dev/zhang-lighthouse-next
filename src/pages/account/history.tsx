import React from 'react';
import { NextApiRequest } from 'next';

import { Sidebar, Header } from '@components/shared';
import History from '@components/account/History';

import { validateSession } from '@utils/auth';
import { createHttpClient } from '@utils/http';

import '../../../public/static/assets/css/account.css';

const HistoryPage: React.FC = ({ history, user }: any) => (
  <>
    <div id="app" className="min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen">
      <Header dashboard />
      <div className="xl:flex-1 xl:flex xl:overflow-y-hidden">
        <Sidebar />
        <main className="py-6 xl:flex-1 xl:overflow-x-hidden cc_cursor">
          <History history={history} />
        </main>
        <div className="bg-gray-800 px-4 py-8 w-full absolute bottom-0 right-0" style={{ paddingTop: 40 }} />
      </div>
    </div>
  </>
);

export const getServerSideProps: any = async ({ req, res }: any) => {
  const userId = await validateSession(req as NextApiRequest);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/?post_login_url=/account/history',
        permanent: false,
      },
    };
  }
  const client = createHttpClient(req.headers.cookie || '');
  const {
    data: { history },
  } = await client.get('/dashboard/history');

  return { props: { history } };
};

export default HistoryPage;
