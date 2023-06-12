import React, { useEffect } from 'react';
import EmailValidator from 'email-validator';
import { useForm } from 'react-hook-form';

import { InquiryData, useInquiryContext } from '@components/shared/inquiry-flow/InquiryContext';
import Input from '@components/shared/Input';
import { B2, H3 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';
import { RightArrowIcon } from '@components/shared/Icons';
import { sendTrack } from '@utils/analytics';

interface Props {
  next: () => void;
}

const ContactInfoStep: React.FC<Props> = ({ next }: Props) => {
  const { data: user, setData, data, property } = useInquiryContext();
  const {
    setValue,
    register,
    trigger,
    getValues,
    errors,
    handleSubmit,
    formState: { isValid },
  } = useForm<Partial<InquiryData>>({
    mode: 'onChange',
    defaultValues: {
      firstName: (data.firstName || sessionStorage.getItem('firstName')) ?? '',
      lastName: (data.lastName || sessionStorage.getItem('lastName')) ?? '',
      email: (data.email || sessionStorage.getItem('email')) ?? '',
      phone: (data.phone || sessionStorage.getItem('phone')) ?? '',
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
    register('firstName', { required: 'Required', validate: (value) => !!value.trim() });
    register('lastName', { required: 'Required', validate: (value) => !!value.trim() });
    register('email', {
      required: 'Required',
      validate: (value) => {
        if (EmailValidator.validate(value)) return true;
        return 'Invalid email';
      },
    });
    register('phone', {
      required: 'Required',
      pattern: {
        value: /\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/,
        message: 'Invalid phone number',
      },
    });
  }, [register]);

  const onSubmit = (inqData: Partial<InquiryData>) => {
    // Store contact info in session storage
    sessionStorage.setItem('firstName', inqData.firstName ?? '');
    sessionStorage.setItem('lastName', inqData.lastName ?? '');
    sessionStorage.setItem('email', inqData.email ?? '');
    sessionStorage.setItem('phone', inqData.phone ?? '');
    sendTrack('InquiryFormPage', {
      category: 'inquiry',
      label: 'InquiryFormPage',
      action: 'InquiryFormPage',
      page: 'ContactInfoStep',
      firstName: inqData.firstName ?? '',
      lastName: inqData.lastName ?? '',
      email: inqData.email ?? '',
      phone: inqData.phone ?? '',
      version: 1,
    });
    setData(inqData);
    next();
  };
  useEffect(() => {
    if (user) {
      if (user.firstName) setValue('firstName', user.firstName);
      if (user.lastName) setValue('lastName', user.lastName);
      if (user.email) setValue('email', user.email);
      if (user.phone) setValue('phone', user.phone);
      trigger();
    }
  }, [setValue, trigger, user]);

  return (
    <>
      <H3 className="mb-2">Contact Information</H3>
      <B2 color="text-gray-soft" className="mb-10">
        <span className="block">Lighthouse will send your information to:</span>
        <span className="font-medium">{property.name}</span>
      </B2>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row items-start">
          <div className="mb-4 w-full">
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              initialValue={getValues().firstName}
              reinitialize
              hasError={!!errors.firstName}
              onChange={(val) => {
                setValue('firstName', val);
                trigger('firstName');
              }}
            />
            {errors.firstName && <span className="text-sm text-red-500">{errors.firstName.message}</span>}
          </div>
          <div className="mb-4 sm:ml-4 w-full">
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              reinitialize
              hasError={!!errors.lastName}
              initialValue={getValues().lastName}
              onChange={(val) => {
                setValue('lastName', val);
                trigger('lastName');
              }}
            />
            {errors.lastName && <span className="text-sm text-red-500">{errors.lastName.message}</span>}
          </div>
        </div>
        <div className="mb-4">
          <Input
            type="email"
            name="email"
            inputMode="email"
            placeholder="Email"
            reinitialize
            hasError={!!errors.email}
            initialValue={getValues().email}
            onChange={(val) => {
              setValue('email', val);
              trigger('email');
            }}
          />
          {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
        </div>
        <div>
          <Input
            mask="(999) 999-9999"
            name="phone"
            placeholder="Phone"
            inputMode="tel"
            reinitialize
            hasError={!!errors.phone}
            onChange={(val) => {
              setValue('phone', val);
              trigger('phone');
            }}
            initialValue={getValues().phone}
          />
          {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
        </div>
      </div>

      <ButtonCta
        disabled={!isValid}
        className="justify-center mb-3 mt-6"
        onClick={handleSubmit(onSubmit)}
        icon={RightArrowIcon}
        iconPos="right">
        Continue
      </ButtonCta>
    </>
  );
};

export default ContactInfoStep;
