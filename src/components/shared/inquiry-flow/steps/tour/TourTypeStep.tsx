import React, { useEffect } from 'react';

import { B2, H3 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';

import { useInquiryContext } from '../../InquiryContext';
import InquiryButton from '../../InquiryButton';
import { sendTrack } from '@utils/analytics';

interface Props {
  next: () => void;
}

const TourTypeStep: React.FC<Props> = ({ next }: Props) => {
  const { hideDialog, property, setData } = useInquiryContext();

  useEffect(() => {
    sendTrack('InquiryFormPageLoaded', {
      category: 'inquiry',
      label: 'InquiryFormPageLoaded',
      action: 'InquiryFormPageLoaded',
      page: 'TourTypeStep',
      version: 1,
    });
  }, []);
  return (
    <>
      <H3 className="mb-2">In-person or virtual?</H3>
      <B2 color="text-gray-soft" className="mb-10">
        <span className="block">Lighthouse will send your information to:</span>
        <span className="font-medium">{property.name}</span>
      </B2>

      <div className="flex-1" />

      <div className="flex flex-col mb-2">
        <InquiryButton
          text="in-person tour"
          onClick={() => {
            setData({ tourType: 'in-person' });

            next();
          }}
        />
        <InquiryButton
          text="virtual tour"
          onClick={() => {
            setData({ tourType: 'virtual' });
            sendTrack('InquiryFormPage', {
              category: 'inquiry',
              label: 'InquiryFormPage',
              action: 'InquiryFormPage',
              page: 'TourTypeStep',
              tourType: 'virtual',
              version: 1,
            });
            next();
          }}
        />
      </div>
      <ButtonCta variant="white" className="justify-center" onClick={hideDialog}>
        Cancel
      </ButtonCta>
    </>
  );
};

export default TourTypeStep;
