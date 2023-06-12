import { createContext, useContext } from 'react';

import { Property } from '@models/Property';
import { User } from '@models/User';

export type InquiryType = 'apply' | 'tour' | 'learn' | 'unset';

export type InquiryData = {
  inquiryType: InquiryType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactByEmail: boolean;
  contactByPhone: boolean;
  contactByText: boolean;

  // Apply
  startApplication?: boolean;

  // Learn
  question?: string;
  sendDetails?: boolean;
  sendInfo?: boolean;

  // Tour
  tourType?: string;
  tourDate?: Date;
  tourTime?: string;
  tourComments?: string;
};

export type InquiryCtxType = {
  user?: User | null;
  setData: (data: Partial<InquiryData>) => void;
  data: InquiryData;
  property: Property;
  hideDialog: () => void;
  sendInquiry: (data: InquiryData) => Promise<void>;
};

export const InquiryContext = createContext<InquiryCtxType>({
  property: {} as Property,
  hideDialog: () => null,
  setData: () => null,
  sendInquiry: () => Promise.resolve(),
  data: {
    inquiryType: 'unset',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactByText: false,
    contactByEmail: false,
    contactByPhone: false,
  },
});

export const useInquiryContext = () => useContext(InquiryContext);
