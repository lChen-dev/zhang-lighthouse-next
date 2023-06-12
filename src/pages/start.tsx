import React from 'react';

import { Header, withAuth } from '@components/shared';
import StartPage from '@components/start/start';
import { backendApi, unAuthed } from '@utils/http';
import blockVisitors from '@utils/block-visitors';

const Start: React.FC = () => (
  <>
    <Header blackNav hideItems />
    <StartPage />
  </>
);

export default withAuth(Start, false, async ({ res, req }: any, session: any) => {
  if (blockVisitors({ req, res })) {
    res.end('');
    return {};
  }
  if (session?.userId) {
    const { data: isTypeformSubmitted }: any = await backendApi.post(
      '/users/isTypeformSubmitted',
      {},
      { headers: { cookie: req.headers.cookie } },
    );
    if (isTypeformSubmitted === 1) {
      res.writeHead(302, {
        Location: '/search',
      });
      res.end();
    }
  }
  return { userId: session?.userId };
});