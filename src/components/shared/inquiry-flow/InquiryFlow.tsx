import React, { useState } from 'react';
import jsCookie from 'js-cookie';
import TrackProperty from '@tracking/Property';

import { Property } from '@models/Property';
import { unAuthed } from '@utils/http';
import { DateTime } from 'luxon';
import { sentryCaptureException } from '@utils/sentry';

import { sendTrack } from '@utils/analytics';
import { getUserObject } from '@utils/auth';
import { useAuth } from 'context/auth';
import InquiryButton from './InquiryButton';
import { InquiryContext, InquiryData, InquiryCtxType, InquiryType } from './InquiryContext';
import SteppedDialog from './SteppedDialog';

import QuestionStep from './steps/learn/QuestionStep';
import SendDetailsStep from './steps/learn/SendDetailsStep';
import SendInfoStep from './steps/learn/SendInfoStep';
import ContactInfoStep from './steps/ContactInfoStep';
import ContactMethodStep from './steps/ContactMethodStep';
import ReadyStep from './steps/apply/ReadyStep';
import ScheduleStep from './steps/tour/ScheduleStep';
import TourTypeStep from './steps/tour/TourTypeStep';

const initialData: InquiryData = {
  inquiryType: 'unset',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  contactByPhone: false,
  contactByEmail: false,
  contactByText: false,
};

interface Props {
  property: Property;
  setShowAuth?: any;
}

const InquiryFlow: React.FC<Props> = ({ property, setShowAuth }: Props) => {
  const [data, setData] = useState<InquiryData>(initialData);
  const [flowType, setFlowType] = useState<InquiryType | null>(null);
  const { user } = useAuth();

  console.log(user);

  const setFlow = (type: InquiryType): void => {
    setFlowType(type);
    setData({
      ...initialData,
      inquiryType: type,
    });
  };

  const contextValue: InquiryCtxType = {
    user,
    property,
    hideDialog: (): void => setFlowType(null),
    data,
    setData: (newData): void => setData({ ...data, ...newData }),
    sendInquiry: async (formData): Promise<void> => {
      sendTrack('InquiryFormSubmit', {
        category: 'inquiry',
        label: 'InquiryFormSubmit',
        action: 'InquiryFormSubmit',
        ...data,
        ...getUserObject(),
        version: 1,
      });
      await sendInquiry(formData, property, user.userId || user.sub || user.id || '').catch((e) => {
        sentryCaptureException({
          info: 'InquiryFlow: unable to sendInquiry',
          error: e,
        });
      });
    },
  };
  const clickHandler = () => {
    if (!user) {
      if (setShowAuth) setShowAuth(true);
      return;
    }
    TrackProperty.interested(property, 'apply');
    setFlow('apply');
  };
  return (
    <InquiryContext.Provider value={contextValue}>
      <div className="flex flex-col w-full">
        <InquiryButton text="apply" isHighlighted onClick={clickHandler} />
        <InquiryButton
          text="learn more"
          onClick={(): void => {
            TrackProperty.interested(property, 'learn');
            setFlow('learn');
          }}
        />
        <InquiryButton
          text="tour"
          onClick={(): void => {
            TrackProperty.interested(property, 'tour');
            setFlow('tour');
          }}
        />
      </div>

      {flowType === 'apply' && <SteppedDialog steps={[ReadyStep, ContactInfoStep, ContactMethodStep]} />}
      {flowType === 'learn' && (
        <SteppedDialog steps={[QuestionStep, SendDetailsStep, SendInfoStep, ContactInfoStep, ContactMethodStep]} />
      )}
      {flowType === 'tour' && (
        <SteppedDialog steps={[TourTypeStep, ScheduleStep, ContactInfoStep, ContactMethodStep]} />
      )}
    </InquiryContext.Provider>
  );
};

async function sendInquiry(data: InquiryData, property: Property, userId: any): Promise<void> {
  const contactPreference = [];
  if (data.contactByEmail) contactPreference.push('email');
  if (data.contactByPhone) contactPreference.push('call');
  if (data.contactByText) contactPreference.push('sms');

  await unAuthed
    .post(
      '/inquiries/building',
      {
        inquiryType: data.inquiryType,

        // Inquiry Data
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        contactPreference: contactPreference.join(', '),

        // Apply
        startApplication: data.startApplication,

        // Learn
        question: data.question,
        sendDetails: data.sendDetails,
        sendInfo: data.sendInfo,

        // Tour
        tourType: data.tourType,
        tourDate: data.tourDate ? DateTime.fromJSDate(data.tourDate).toFormat('DDD') : undefined,
        tourTime: data.tourTime,
        tourComments: data.tourComments,

        // Property Details
        propertyName: property.name.trim(),
        aptsId: property.apts_id,
        propertyId: property.id,
        cashback: property.cashback,
        site: property.website,
        city: property.city,
        address: property.address,
        img: property.propertyPhotos[0]?.url,
        auth0Id: userId,

        // Metadata
        meta: {
          hubspotutk: jsCookie.get('hubspotutk'),
          gaUserId: userId || '',
          page: `${window.location.origin}${window.location.pathname}`,
        },
      },
      { timeout: 60e3 * 3 }
    )
    .catch((e) => {
      sentryCaptureException({
        info: 'unable to inquiries building',
        error: e,
      });
    });
}

export default InquiryFlow;
