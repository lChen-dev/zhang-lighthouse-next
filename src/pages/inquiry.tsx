import React from 'react';

import { Header } from '@components/shared';
import InquiryPage from '@components/inquiry/inquiry';
import withAuth from '@components/shared/withAuth';

const start: React.FC = () => (
  <>
    <Header blackNav />
    <InquiryPage />
  </>
);

export default withAuth(start);
