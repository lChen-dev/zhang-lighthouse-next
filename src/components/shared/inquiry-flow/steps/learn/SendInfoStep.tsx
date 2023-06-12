import React, { useEffect } from 'react';

import { B2, H3 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';

import { useInquiryContext } from '../../InquiryContext';
import { sendTrack } from '@utils/analytics';

interface Props {
  next: () => void;
}

const SendInfoStep: React.FC<Props> = ({ next }: Props) => {
  const { property, setData } = useInquiryContext();

  useEffect(() => {
    sendTrack('InquiryFormPageLoaded', {
      category: 'inquiry',
      label: 'InquiryFormPageLoaded',
      action: 'InquiryFormPageLoaded',
      page: 'SendInfoStep',
      version: 1,
    });
  }, []);
  return (
    <>
      <H3 className="mb-2">Send your info over to building?</H3>
      <B2 color="text-gray-soft" className="mb-10">
        <span className="block">Lighthouse will send your information to:</span>
        <span className="font-medium">{property.name}</span>
      </B2>

      <div className="flex-1" />

      <ButtonCta
        className="justify-center mb-3"
        onClick={() => {
          setData({ sendInfo: true });
          sendTrack('InquiryFormPage', {
            category: 'inquiry',
            label: 'InquiryFormPage',
            action: 'InquiryFormPage',
            page: 'SendInfoStep',
            sendInfo: true,
            version: 1,
          });
          next();
        }}
      >
        Yes, send my info
      </ButtonCta>
      <ButtonCta
        variant="light"
        className="justify-center mb-2"
        onClick={() => {
          setData({ sendInfo: false });
          sendTrack('InquiryFormPage', {
            category: 'inquiry',
            label: 'InquiryFormPage',
            action: 'InquiryFormPage',
            page: 'SendInfoStep',
            sendInfo: false,
            version: 1,
          });
          next();
        }}
      >
        No, don’t send my info
      </ButtonCta>
    </>
  );
};

export default SendInfoStep;
