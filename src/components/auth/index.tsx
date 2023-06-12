/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import Wizard from '@components/shared/wizard/Wizard';
import { steps } from './Steps';

const Index = (props: unknown): React.ReactElement => {
  return <Wizard steps={steps} {...props} storageItemIndex="userOnboarding" />;
};

export default Index;
