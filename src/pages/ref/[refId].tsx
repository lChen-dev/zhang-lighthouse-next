import React from 'react';

import { Footer, Header } from '@components/shared';
import RefHero from '@components/ref/RefHero';
import Details from '@components/ref/Details';

import '../../components/ref/css/ref.css';
import { backendApi } from '@utils/http';

const ReferralLoginPage: any = () => {
  return (
    <>
      <Header />
      <RefHero />
      <Details />
      <Footer />
    </>
  );
};

ReferralLoginPage.getInitialProps = async ({ res, query }: any) => {
  if (!query?.hasOwnProperty('refId') || query.refId.trim() === '') {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
  const { refId } = query;
  const { data: refIdExists } = await backendApi.post('/users/isRefIdValid', { refId });
  if (refIdExists) {
    res.writeHead(302, { Location: `/?ref=${refId}` });
    res.end();
    return {};
  }
  return {};
};

export default ReferralLoginPage;
