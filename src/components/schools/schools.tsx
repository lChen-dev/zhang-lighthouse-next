import React, { useState } from 'react';

import { Header, Footer } from '@components/shared';
import Outro from '@components/shared/Outro/Outro';
import TrustPilot from '@components/shared/TrustPilot/TrustPilot';

import Hero from '@components/schools/components/Hero/Hero';
import SendRequest from './components/SendRequest/SendRequest';
import FindSchool from './components/FindSchool/FindSchool';

interface Props {
  schools: any;
}

const SchoolsUI: React.FC<Props> = ({ schools }: Props) => {
  const [showUniversitiesDialog, setShowUniversitiesDialog] = useState(false);

  function onHideUniDialog() {
    setShowUniversitiesDialog(false);
  }

  function onShowUniDialog() {
    setShowUniversitiesDialog(true);
  }

  return (
    <>
      <Header />
      <Hero
        showUniversitiesDialog={showUniversitiesDialog}
        onHideUniDialog={onHideUniDialog}
        onShowUniDialog={onShowUniDialog}
      />
      <FindSchool schools={schools} onShowUniDialog={onShowUniDialog} />
      <SendRequest />
      <TrustPilot />
      <Outro />
      <Footer />
    </>
  );
};

export default SchoolsUI;
