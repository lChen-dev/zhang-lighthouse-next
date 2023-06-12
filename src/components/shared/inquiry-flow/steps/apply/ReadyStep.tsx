import React, { useEffect } from 'react';

import { H3 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';
import { useInquiryContext } from '../../InquiryContext';
import { sendTrack } from '@utils/analytics';

interface Props {
  next: () => void;
}

const ReadyStep: React.FC<Props> = ({ next }: Props) => {
  const { hideDialog, setData } = useInquiryContext();

  useEffect(() => {
    sendTrack('InquiryFormPageLoaded', {
      category: 'inquiry',
      label: 'InquiryFormPageLoaded',
      action: 'InquiryFormPageLoaded',
      page: 'ReadyStep',
      version: 1,
    });
  }, []);
  return (
    <>
      <H3 className="mb-10">Ready? Make sure you’re understanding prices!</H3>

      <div className="flex-1" />

      <ButtonCta
        className="justify-center mb-3"
        onClick={() => {
          setData({ startApplication: true });
          sendTrack('InquiryFormStart', {
            category: 'inquiry',
            label: 'InquiryFormStart',
            action: 'InquiryFormStart',
            version: 1,
          });
          next();
        }}
      >
        Yes, I am ready to apply
      </ButtonCta>
      <ButtonCta variant="light" className="justify-center" onClick={hideDialog}>
        I want to browse more details
      </ButtonCta>
    </>
  );
};

export default ReadyStep;
