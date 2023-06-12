import React from 'react';
import { GetServerSideProps } from 'next';

import { Footer, Header } from '@components/shared';
import SuccessPage from '@components/success/Success';

import '../../public/static/assets/css/style.css';

const Success: React.FC = () => (
  <>
    <Header />
    <SuccessPage />
    <Footer />
  </>
);

// because we want the query params to be correct on initial render we need to trigger SSR
// https://nextjs.org/docs/routing/dynamic-routes#caveats
export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
});

export default Success;
