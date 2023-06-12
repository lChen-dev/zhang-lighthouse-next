import React from 'react';

import { Footer, Header } from '@components/shared';
import Terms from '@components/terms/Terms';

import '../../public/static/assets/css/style.css';

const TermPage: React.FC = () => (
  <>
    <Header blackNav />
    <Terms />
    <Footer />
  </>
);

export default TermPage;
