import React from 'react';

import '../../../../../public/static/assets/css/account.css';
import '../../../../styles/globals.css';
import InsurancePolicy from '@components/account/insurance/InsurancePolicy';
import DashboardPage from '@components/account/DashboardPage';
import { withAuth } from '@components/shared';

const InsurancePolicyPage = (): React.ReactElement => {
  return (
    <DashboardPage title="InsurancePolicy">
      <InsurancePolicy />
    </DashboardPage>
  );
};

export default withAuth(InsurancePolicyPage, true);
