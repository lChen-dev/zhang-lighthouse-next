import React from 'react';
import { NextApiRequest } from 'next';

import { Header, Sidebar } from '@components/shared';
import Searches from '@components/account/Searches';
import { validateSession } from '@utils/auth';
import { createHttpClient } from '@utils/http';

import '../../../public/static/assets/css/account.css';

const SearchesPage: React.FC = ({ searches, user }: any) => (
  <div id="app" className="min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen">
    <Header dashboard />
    <div className="xl:flex-1 xl:flex xl:overflow-y-hidden">
      <Sidebar />
      <main className="py-6 xl:flex-1 xl:overflow-x-hidden cc_cursor">
        <Searches user={user} searches={searches} />
      </main>
      <div className="bg-gray-800 px-4 py-8 w-full absolute bottom-0 right-0" style={{ paddingTop: 40 }} />
    </div>
  </div>
);

export const getServerSideProps: any = async ({ req, res }: any) => {
  const userId = await validateSession(req as NextApiRequest);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/?post_login_url=/account/searches',
        permanent: false,
      },
    };
  }
  const client = createHttpClient(req.headers.cookie || '');
  const {
    data: { searches },
  } = await client.get('/dashboard/lastSearch');

  return { props: { searches } };
};

export default SearchesPage;
