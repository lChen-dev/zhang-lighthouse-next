import React, { useState } from 'react';

import { Header, Footer } from '@components/shared';
import Outro from '@components/shared/Outro/Outro';
import BulletPoints from '@components/shared/BulletPoints/BulletPoints';
import WorkWithExpert from '@components/shared/WorkWithExpert/WorkWithExpert';

import Hero from '@components/schools/components/SpecificSchool/Hero/Hero';
import Buildings from './components/SpecificSchool/Buildings/Buildings';

interface Props {
  school: any;
}

const SpecificSchoolUI: React.FC<Props> = ({ school }: Props) => {
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
        school={school}
      />
      <Buildings school={school} />
      <WorkWithExpert />
      <BulletPoints />
      <Outro />
      <Footer />
    </>
  );
};

export default SpecificSchoolUI;
