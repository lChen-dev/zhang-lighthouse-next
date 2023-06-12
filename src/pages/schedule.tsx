import React from 'react';

import { Header, withAuth } from '@components/shared';
import SchedulePage from '@components/schedule/Schedule';

import '../../public/static/assets/css/style.css';

const Schedule: React.FC = () => (
  <>
    <Header blackNav fixed={false} />
    <SchedulePage />
  </>
);

export default withAuth(Schedule);
