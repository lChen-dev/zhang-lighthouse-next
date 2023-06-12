import React from 'react';
import Head from 'next/head';

import { Footer, Header } from '@components/shared';
import '../../public/static/assets/css/style.css';

const FaqPage: React.FC = () => (
  <>
    <Head>
      <script src="https://jobs.ashbyhq.com/lighthouse/embed" />
    </Head>
    <Header blackNav />

    <div id="ashby_embed" className="mt-20 mb-10" />
    <Footer />
  </>
);

export default FaqPage;
