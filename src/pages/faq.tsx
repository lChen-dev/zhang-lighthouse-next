import React from 'react';

import { Footer, Header, withAuth } from '@components/shared';
import Faq from '@components/faq/Faq';
import Head from 'next/head';
import '../../public/static/assets/css/style.css';

const FaqPage: React.FC = () => (
  <>
    <Head>
      <script
        id="ze-snippet"
        src="https://static.zdassets.com/ekr/snippet.js?key=36fba107-bd9e-47e5-ae32-ef468edecf68"
      />
    </Head>
    <Header blackNav />
    <Faq />
    <Footer />
  </>
);

export default withAuth(FaqPage);
