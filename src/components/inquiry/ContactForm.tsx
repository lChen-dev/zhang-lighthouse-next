import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import EmailValidator from 'email-validator';
import { KEY_RETURN } from 'keycode-js';
import { useRouter } from 'next/router';

import { FormContext } from '@components/inquiry/MultiStepForm';
import Input from '@components/shared/Input';
import Button from '@components/shared/Button';
import { LeftArrowIcon } from '@components/shared/Icons';
import { unAuthed } from '@utils/http';
import { useErrors } from '@hooks/errors';
import { sentryCaptureException } from '@utils/sentry';
import { sendTrack } from '@utils/analytics';
import { getUserObject } from '@utils/auth';

interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const ContactForm: React.FC = () => {
  const router = useRouter();
  const { addError } = useErrors();
  const { formData, prev, setData } = useContext(FormContext);

  const {
    handleSubmit,
    register,
    setValue,
    errors,
    watch,
    trigger,
    formState: { isValid, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    sendTrack('SearchInquiryFormPage', {
      category: 'inquiry',
      label: 'SearchInquiryFormPage',
      action: 'SearchInquiryFormPage',
      page: 'ContactForm',
      questions: ['firstName', 'lastName', 'phone', 'email'],
      version: 2,
    });
    sendTrack('SearchInquiryFormSubmit', {
      category: 'inquiry',
      label: 'SearchInquiryFormSubmit',
      action: 'SearchInquiryFormSubmit',
      ...data,
      ...getUserObject(),
      version: 2,
    });
    return unAuthed
      .post('/inquiries/search', { ...formData, ...data })
      .then(() => {
        sendTrack('SearchInquiryFormSuccess', {
          category: 'inquiry',
          label: 'SearchInquiryFormSuccess',
          action: 'SearchInquiryFormSuccess',
          version: 2,
        });
        router.push({
          pathname: '/search',
          query: { city: formData.city, maxPrice: formData.rentPrice, bedrooms: formData.bedrooms },
        });
      })
      .catch((err) => {
        sendTrack('SearchInquiryFormError', {
          category: 'inquiry',
          label: 'SearchInquiryFormError',
          action: 'SearchInquiryFormError',
          version: 2,
        });
        addError(err);
        sentryCaptureException({
          info: 'unable to get response from inquiries/search on contact form',
          error: err,
        });
      });
  };

  useEffect(() => {
    register('firstName', { required: 'Required' });
    register('lastName', { required: 'Required' });
    register('phone', {
      required: 'Required',
      validate: (data) => {
        if (!data.match(/\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/)) {
          return 'Invalid phone number';
        }
        return true;
      },
    });
    register('email', {
      required: 'Required',
      validate: (data) => {
        if (data && !EmailValidator.validate(data)) return 'Invalid email';
        return true;
      },
    });
  }, []);

  const { firstName, lastName, phone, email } = watch();

  return (
    <form
      className="flex flex-col items-center"
      onKeyDown={(e) => {
        if (e.keyCode === KEY_RETURN) e.preventDefault();
      }}
      onSubmit={(e) => e.preventDefault()}>
      <div className="w-full flex flex-col lh-form flex-1 justify-center">
        <h1 className="font-circular text-4xl font-medium flex flex-col sm:flex-row">
          <span className="mr-2 text-2xl sm:text-4xl">
            Step <span className="text-orange">3</span> of 3.
          </span>
          <span>Stay in touch</span>
        </h1>
        <p className="font-circular font-light text-gray-medium mb-8">
          Fill in your contact info to see results in your city and get access to buildings with cash back. You will
          also unlock access to our free personalized concierge service.
        </p>
        <div className="flex flex-col sm:flex-row flex-shrink-0 mb-5">
          <label
            className="font-circular text-sm flex-1 mb-6 text-gray-medium font-light sm:mb-0 sm:mr-1"
            htmlFor="firstName">
            First Name
            <span className="text-orange">*</span>
            <Input
              className="mt-2"
              name="firstName"
              onBlur={(val) => {
                setValue('firstName', val);
                trigger('firstName');
                setData({ firstName: String(val) });
              }}
              initialValue={firstName}
              autoComplete="given-name"
            />
            {errors.firstName && <span className="text-sm text-orange">{errors.firstName.message}</span>}
          </label>
          <label className="font-circular text-sm text-gray-medium font-light flex-1 sm:ml-1" htmlFor="lastName">
            Last Name
            <span className="text-orange">*</span>
            <Input
              className="mt-2"
              name="lastName"
              onBlur={(val) => {
                setValue('lastName', val);
                trigger('lastName');
                setData({ lastName: String(val) });
              }}
              initialValue={lastName}
              autoComplete="family-name"
            />
            {errors.lastName && <span className="text-sm text-orange">{errors.lastName.message}</span>}
          </label>
        </div>

        <div className="flex flex-col sm:flex-row flex-shrink-0 mb-5">
          <label
            className="font-circular text-sm text-gray-medium font-light mb-6 flex-1 sm:mb-0 sm:mr-1"
            htmlFor="phone">
            Phone Number
            <span className="text-orange">*</span>
            <Input
              className="mt-2"
              mask="(999) 999-9999"
              name="phone"
              inputMode="tel"
              onBlur={(val) => {
                setValue('phone', val);
                trigger('phone');
                setData({ phone: String(val) });
              }}
              initialValue={phone}
              autoComplete="tel-national"
            />
            {errors.phone && <span className="text-sm text-orange">{errors.phone.message}</span>}
          </label>

          <label className="font-circular text-sm text-gray-medium font-light mb-6 flex-1 sm:ml-1" htmlFor="email">
            Email
            <span className="text-orange">*</span>
            <Input
              className="mt-2"
              type="email"
              name="email"
              inputMode="email"
              onBlur={(val) => {
                setValue('email', val);
                trigger('email');
                setData({ email: String(val) });
              }}
              initialValue={email}
              autoComplete="email"
            />
            {errors.email && <span className="text-sm text-orange">{errors.email.message}</span>}
          </label>
        </div>
      </div>

      <div className="w-full flex flex-col-reverse sm:flex-row mt-12">
        <Button
          light
          className="sm:mr-4 px-8 justify-center"
          text="Previous"
          type="button"
          iconLeft={<LeftArrowIcon />}
          onClick={prev}
        />
        <Button
          className="flex-1 justify-center sm:mb-0 mb-4"
          text="See Results"
          type="submit"
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};

export default ContactForm;
