/* eslint-disable import/no-cycle */
import React, { createContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import jsCookie from 'js-cookie';
import classNames from 'classnames';

import FormPage1 from '@components/inquiry/FormPage1';
import FormPage2 from '@components/inquiry/FormPage2';
import ContactForm from '@components/inquiry/ContactForm';
import { useRouter } from 'next/router';
import { sendTrack } from '@utils/analytics';

type MetaData = {
  hubspotutk?: string;
  page?: string;
  term?: string;
  medium?: string;
  source?: string;
  userIp?: string;
  campaign?: string;
  device?: string;
  referredBy?: string;
  userId?: string;
  referrer?: string;
};

type FormData = {
  city: string;
  targetNeighborhoods: string[];
  bedrooms: number;
  rentPrice?: number;
  moveDate?: Date;
  leaseLength: string;
  issues: string[];
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactStyle: string[];
  meta: MetaData;
};
const initialData: FormData = {
  city: '',
  targetNeighborhoods: [],
  bedrooms: 1,
  rentPrice: undefined,
  moveDate: undefined,
  leaseLength: '',
  issues: [],
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  contactStyle: [],
  meta: {},
};

type FormContextType = {
  formData: FormData;
  setData: (data: Partial<FormData>) => void;
  next: () => void;
  prev: () => void;
};
export const FormContext = createContext<FormContextType>({
  formData: initialData,
  setData: () => null,
  next: () => null,
  prev: () => null,
});

const formPageComponents = [FormPage1, FormPage2, ContactForm];

const MultiStepForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    ...initialData,
    meta: {
      hubspotutk: jsCookie.get('hubspotutk'),
      term: jsCookie.get('utm_term'),
      medium: jsCookie.get('utm_medium'),
      source: jsCookie.get('utm_source'),
      userIp: jsCookie.get('userIP'),
      campaign: jsCookie.get('utm_campaign'),
      device: jsCookie.get('deviceInfo'),
      referredBy: jsCookie.get('utm_ref'),
      userId: jsCookie.get('ga_user'),
      referrer: jsCookie.get('referrer'),
    },
  });

  const [page, setPage] = useState(0);
  const FormPage = formPageComponents[page];

  useLayoutEffect(() => {
    sendTrack('SearchInquiryFormStart', {
      category: 'inquiry',
      label: 'SearchInquiryFormStart',
      action: 'SearchInquiryFormStart',
      version: 2,
    });
  }, []);

  // Force scroll to top of page when forms "pages" change
  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0 });
    }

    const docWrapper = document.getElementById('doc-wrapper');
    if (docWrapper) docWrapper.scrollTo({ top: 0 });
  }, [page]);

  // Set form data meta.page when window loads
  useEffect(() => {
    if (window && !formData.meta.page) {
      setFormData({
        ...formData,
        meta: {
          ...formData.meta,
          page: window.location.href,
        },
      });
    }
  }, [formData]);

  const contextValue: FormContextType = {
    formData,
    setData: (data) => setFormData({ ...formData, ...data }),
    prev: () => setPage(Math.max(page - 1, 0)),
    next: () => setPage(Math.min(page + 1, formPageComponents.length - 1)),
  };

  return (
    <div className="flex flex-col items-center">
      <div
        id="multi-step-form"
        className="flex flex-col w-full px-4 min-h-screen pt-24 lg:pt-32"
        style={{ maxWidth: '650px' }}
      >
        <FormContext.Provider value={contextValue}>
          <FormPage />
        </FormContext.Provider>
        <div className="flex-1" />
        <img src="/static/assets/images/inquiry-footer.svg" alt="buildings" className="w-full mt-16" />
      </div>
    </div>
  );
};

export default MultiStepForm;
