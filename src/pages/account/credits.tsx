import { NextApiRequest, GetServerSideProps } from 'next';

import { Header, Sidebar } from '@components/shared';
import Credits from '@components/account/Credits';
import { validateSession } from '@utils/auth';
import { createHttpClient } from '@utils/http';
import { sentryGetServerSideProps } from '@utils/sentry';

import '../../../public/static/assets/css/account.css';

const CreditsPage = ({ homecredits, user }: any): React.ReactElement => (
  <>
    <div id="app" className="min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen">
      <Header dashboard />
      <div className="xl:flex-1 xl:flex xl:overflow-y-hidden">
        <Sidebar />
        <main className="py-6 xl:flex-1 xl:overflow-x-hidden cc_cursor">
          <Credits homecredits={homecredits} />
        </main>
        <div className="bg-gray-800 px-4 py-8 w-full absolute bottom-0 right-0" style={{ paddingTop: 40 }} />
      </div>
    </div>
  </>
);

export const getServerSideProps: GetServerSideProps = sentryGetServerSideProps(async ({ req, res }: any) => {
  const userId = await validateSession(req as NextApiRequest);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/?post_login_url=/account/credits',
        permanent: false,
      },
    };
  }
  const client = createHttpClient(req.headers.cookie, { validateStatus: () => true });
  const {
    data: { homecredits },
  } = await client.get('/dashboard/credits');
  return { props: { homecredits } };
});

export default CreditsPage;
