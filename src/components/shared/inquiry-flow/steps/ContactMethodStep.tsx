import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { B1, B2, H3, H5 } from '@components/shared/Typography';
import { Checkbox, LoadingSpinner } from '@components/shared';
import ButtonCta from '@components/shared/ButtonCta';
import { useErrors } from '@hooks/errors';

import { InquiryData, useInquiryContext } from '../InquiryContext';
import { sendTrack } from '@utils/analytics';

const ContactMethodStep: React.FC = () => {
  const { data, property, setData, sendInquiry, hideDialog } = useInquiryContext();
  const { addError, clearErrors } = useErrors();

  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    setValue,
    register,
    trigger,
    getValues,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<Partial<InquiryData>>({
    mode: 'onChange',
    defaultValues: {
      contactByText: sessionStorage.getItem('contactByText') === 'yes',
      contactByPhone: sessionStorage.getItem('contactByPhone') === 'yes',
      contactByEmail: sessionStorage.getItem('contactByEmail') === 'yes',
    },
  });

  useEffect(() => {
    sendTrack('InquiryFormPageLoaded', {
      category: 'inquiry',
      label: 'InquiryFormPageLoaded',
      action: 'InquiryFormPageLoaded',
      page: 'ContactInfoStep',
      version: 1,
    });
    register('contactByPhone');
    register('contactByText');
    register('contactByEmail');
  }, []);

  const onSubmit = async (formData: Partial<InquiryData>): Promise<void> => {
    clearErrors();
    setSubmitting(true);
    sendTrack('InquiryFormPage', {
      category: 'inquiry',
      label: 'InquiryFormPage',
      action: 'InquiryFormPage',
      page: 'ContactInfoStep',
      contactByPhone: formData.contactByPhone ? 'yes' : 'no',
      contactByText: formData.contactByText ? 'yes' : 'no',
      contactByEmail: formData.contactByEmail ? 'yes' : 'no',
      version: 1,
    });
    try {
      sessionStorage.setItem('contactByPhone', formData.contactByPhone ? 'yes' : 'no');
      sessionStorage.setItem('contactByText', formData.contactByText ? 'yes' : 'no');
      sessionStorage.setItem('contactByEmail', formData.contactByEmail ? 'yes' : 'no');

      setData(formData);
      await sendInquiry({ ...data, ...formData });
      setShowSuccess(true);
    } catch (e: any) {
      addError(e);
    }
    setSubmitting(false);
  };

  const { contactByText, contactByPhone, contactByEmail } = watch();
  const submitDisabled = !isValid || !(contactByText || contactByPhone || contactByEmail);

  return (
    <>
      <H3 className="mb-3">What’s the best way to contact you?</H3>
      <B2 color="text-gray-soft" className="mb-10">
        <span className="block">Lighthouse will send your information to:</span>
        <span className="font-medium">{property.name}</span>
      </B2>

      <div className="flex flex-col mb-10">
        <Checkbox
          className="select-none mb-3"
          label={
            <B1 style={{ lineHeight: '1.5rem' }}>
              Email at <span className="underline">{data.email}</span>
            </B1>
          }
          value={getValues().contactByEmail ?? false}
          onChange={(checked) => {
            setValue('contactByEmail', checked);
            trigger('contactByEmail');
          }}
          name="contactByEmail"
        />
        <Checkbox
          className="select-none mb-3"
          label={
            <B1 style={{ lineHeight: '1.5rem' }}>
              Phone call at <span className="underline">{data.phone}</span>
            </B1>
          }
          value={getValues().contactByPhone ?? false}
          onChange={(checked) => {
            setValue('contactByPhone', checked);
            trigger('contactByPhone');
          }}
          name="contactByPhone"
        />
        <Checkbox
          className="select-none mb-3"
          label={
            <B1 style={{ lineHeight: '1.5rem' }}>
              Text at <span className="underline">{data.phone}</span>
            </B1>
          }
          value={getValues().contactByText ?? false}
          onChange={(checked) => {
            setValue('contactByText', checked);
            trigger('contactByText');
          }}
          name="contactByText"
        />
      </div>

      <div className="flex flex-col p-4 bg-offwhite mt-4 mb-3">
        <H5 className="mb-2">Notice</H5>
        <B2 color="text-gray-soft">${property.cashback} back when you put Lighthouse on your application.</B2>
      </div>

      <ButtonCta disabled={submitDisabled} className="justify-center mb-2" onClick={handleSubmit(onSubmit)}>
        {submitting ? <LoadingSpinner /> : 'Send request'}
      </ButtonCta>

      {showSuccess && (
        <div
          onClick={hideDialog}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
            backdropFilter: 'blur(8px)',
            top: '-4.5rem',
          }}
        >
          <button
            type="button"
            className="close absolute hidden sm:block"
            onClick={hideDialog}
            style={{ top: '2rem', right: '2rem' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 1L1 23M1 1L23 23" stroke="#CCC" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
          <div className="px-10 py-6 rounded-lg bg-white">
            <svg width="52" height="51" viewBox="0 0 52 51" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="25.5" r="24" stroke="#34966D" strokeOpacity="0.25" strokeWidth="3" />
              <path
                d="M37.5 16.875L21.6875 32.6875L14.5 25.5"
                stroke="#34966D"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactMethodStep;
