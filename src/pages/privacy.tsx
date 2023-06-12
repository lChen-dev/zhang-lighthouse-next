import React from 'react';

import { Footer, Header } from '@components/shared';
import Privacy from '@components/privacy/Privacy';

import '../../public/static/assets/css/style.css';

const PrivacyPage: React.FC = () => (
  <>
    <Header blackNav />
    <Privacy />
    <Footer />
  </>
);

export default PrivacyPage;
