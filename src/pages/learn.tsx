import React from 'react';

import { Footer, Header } from '@components/shared';
import LearnMorePage from '@components/learn/learn';

import '../../public/static/assets/css/style.css';

const LearnMore: React.FC = () => (
  <>
    <Header />
    <LearnMorePage />
    <Footer />
  </>
);

export default LearnMore;
