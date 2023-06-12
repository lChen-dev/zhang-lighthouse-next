/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import jsCookie from 'js-cookie';

// eslint-disable-next-line import/no-cycle
import Input from '@components/shared/Input';
import Select, { SelectOption } from '@components/shared/Select';
import DatePicker from '@components/shared/DatePicker';
import Checkbox from '@components/shared/Checkbox';
import Button from '@components/shared/Button';
import { ChevronRightIcon, Tick } from '@components/shared/Icons';
import { unAuthed } from '@utils/http';
import { getErrorMessage } from '@hooks/errors';
import EmailValidator from 'email-validator';
import AppConfirmationModal from './AppConfirmationModal';
import ScheduleTourModal from './ScheduleTourModal';
import RequestAgentModal from './RequestAgentModal';
import SuccessModal from './SuccessModal';
import { sendTrack } from '@utils/analytics';

export type BuildingLead = {
  name: string;
  cashback: number;
  image?: string;
  aptsId?: string;
  city: string;
  address: string;
  website: string;
};

interface Props {
  building: BuildingLead;
  initiateWizard: Function;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  beds: string;
  date?: Date;
  notes: string;
  scheduleTour: boolean;
  checkAvailability: boolean;
  talkToAgent: boolean;
  startApplication: boolean;
  contactByEmail: boolean;
  contactBySMS: boolean;
  contactByCall: boolean;
};

const initialLeadFormData: Partial<FormData> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  beds: 'any',
  date: undefined,
  notes: '',
  scheduleTour: false,
  checkAvailability: false,
  talkToAgent: false,
  startApplication: false,
  contactByEmail: false,
  contactBySMS: false,
  contactByCall: false,
};

const bedroomOpts: SelectOption[] = [
  { label: 'Any', value: 'any' },
  { label: 'Studio', value: 0 },
  { label: '1 BR', value: 1 },
  { label: '2 BR', value: 2 },
  { label: '3 BR', value: 3 },
  { label: '4+ BR', value: '4 or more' },
];

const LeadForm: React.FC<Props> = ({ building, initiateWizard }: Props) => {
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [wizard, setWizard] = useState(false);
  const [tourNote, setTourNote] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [screen, setScreen] = useState({ requestAgent: false, requestTour: false, requestApplication: false });
  const updateScreen = (obj: { requestAgent?: boolean; requestTour?: boolean; requestApplication?: boolean }): void => {
    setScreen({ ...screen, ...obj });
  };
  const { cashback } = building;
  const {
    register,
    setValue,
    getValues,
    trigger,
    handleSubmit,
    errors,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<FormData>({
    defaultValues: initialLeadFormData,
    mode: 'onBlur',
  });

  const doSubmit = async () => {
    const { name, imageName }: any = inputValues;
    const data = getValues();
    const { contactByCall, contactByEmail, contactBySMS } = data;
    const contactPreference = [];
    if (contactByCall) contactPreference.push('call');
    if (contactBySMS) contactPreference.push('SMS');
    if (contactByEmail) contactPreference.push('email');

    const payload = {
      propertyName: building.name.trim(),
      cashback: building.cashback,
      aptsId: imageName || building.aptsId,
      name,
      email: data.email.trim(),
      phone: data.phone.trim(),
      moveInDate: data.date?.toLocaleDateString('en-US'),
      comment: data.notes,
      img: building.image,
      scheduleTour: data.scheduleTour,
      talkToAgent: data.talkToAgent,
      checkAvailability: data.checkAvailability,
      startApplication: data.startApplication,
      site: building.website,
      city: building.city,
      address: building.address,
      beds: data.beds,
      meta: {
        hubspotutk: jsCookie.get('hubspotutk'),
        anonymousId: jsCookie.get('ga_user'),
        page: `${location.origin}${location.pathname}`,
      },
      lookup_confirmation_tour_time_note: tourNote,
      lookup_confirmation_contact_preference: contactPreference.join(', '),
      lookup_confirmation_apply: data.startApplication ? 'Yes' : 'No',
    };
    const { requestApplication, requestAgent, requestTour } = screen;
    let successMessage = '';
    if (requestAgent) {
      const watch = contactByEmail ? 'email' : 'phone';
      successMessage = `Watch your ${watch} for next steps.`;
    }
    if (requestTour) {
      successMessage = 'We are confirming your tour and will be in touch soon with next steps.';
    }
    if (requestApplication) {
      successMessage = `We will be in touch soon with next steps.`;
    }
    await unAuthed.post('/lookup', payload, {
      timeout: 1000 * 60 * 3,
    });
    sendTrack('lookupRequestSubmit', {
      category: 'lookup',
      label: 'lookupRequestSubmit',
      action: 'lookupRequestSubmit',
      ...payload,
      version: 1,
    });
    reset(initialLeadFormData);
    setWizard(false);
    setSuccess(true);
    setMessage(successMessage);
  };
  const onSubmit = async (data: FormData): Promise<void> => {
    const { scheduleTour, talkToAgent, checkAvailability, startApplication } = data;
    const name = `${data.firstName.trim()} ${data.lastName.trim()}`;
    if (
      building.name === '' ||
      building.cashback === null ||
      name.trim() === '' ||
      !EmailValidator.validate(data.email)
    )
      return;
    let imageName: any = '';
    try {
      imageName = building?.image && building?.image.includes('/') ? building?.image.split('/').pop() : '';
      imageName =
        imageName?.includes('.jpg') || imageName?.includes('.png') ? imageName.split('_')[1].split('.')[0] : '';
    } catch (e) {
      setSubmitError(getErrorMessage(e));
    }
    if (checkAvailability || talkToAgent) {
      updateScreen({
        requestAgent: true,
      });
    }
    if (scheduleTour) {
      updateScreen({ requestTour: true });
    }
    if (startApplication) {
      updateScreen({ requestApplication: true });
    }
    setWizard(true);
    initiateWizard(true);
    setInputValues({ data, imageName, building, name });
  };

  useEffect(() => {
    register('firstName', {
      required: 'Required',
      validate: (value) => {
        return !!value.trim();
      },
    });
    register('lastName', {
      required: 'Required',
      validate: (value) => {
        return !!value.trim();
      },
    });
    register('email', {
      required: 'Required',
      validate: (value) => {
        return EmailValidator.validate(value);
      },
    });
    register('phone', {
      required: 'Required',
      pattern: {
        value: /\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/,
        message: 'Invalid phone number',
      },
    });
    register('beds', { required: 'Required' });
    register('date', { required: 'Required' });
    register('notes');
    register('scheduleTour');
    register('checkAvailability');
    register('talkToAgent');
    register('startApplication');
    register('contactByCall');
    register('contactByEmail');
    register('contactBySMS');
  }, []);

  if (wizard) {
    const { requestAgent, requestTour, requestApplication } = screen;
    if (requestApplication) {
      return <AppConfirmationModal building={building} doSubmit={doSubmit} />;
    }
    if (requestTour) {
      return <ScheduleTourModal building={building} doSubmit={doSubmit} setTourNote={setTourNote} />;
    }
    if (requestAgent) {
      const { contactByEmail, contactByCall, contactBySMS } = getValues();
      const formIsFilled = contactByCall || contactByEmail || contactBySMS;
      return (
        <RequestAgentModal
          data={getValues()}
          building={building}
          setValue={setValue}
          trigger={trigger}
          getValues={getValues}
          formIsFilled={formIsFilled}
          doSubmit={doSubmit}
        />
      );
    }

    return <SuccessModal />;
  }
  if (success) {
    return (
      <>
        <div
          className="block bg-white"
          style={{
            background: '#FFFFFF',
            boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            width: '405px',
            height: '132px',
          }}
        >
          <div
            className="flex justify-items-center justify-center align-middle"
            style={{
              position: 'relative',
              top: '45px',
            }}
          >
            <Tick />
          </div>
        </div>
        <div className="block">
          <b className="text-36px font-circular text-black pt-5 block">Success.</b>
          <p className="text-18px text-gray-template">{message}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="font-circular mb-4">{cashbackMessage(cashback)}</p>
      <form className="lh-form flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-4">
          <label className="font-circular text-lg flex-1 mb-4 sm:mb-0 sm:mr-1" htmlFor="firstName">
            First Name
            <span className="text-orange">*</span>
            <Input
              name="firstName"
              onBlur={(val) => {
                setValue('firstName', String(val));
                trigger('firstName');
              }}
              initialValue={getValues().firstName}
            />
            {errors.firstName && <span className="text-sm text-orange">{errors.firstName.message}</span>}
          </label>

          <label className="font-circular text-lg flex-1 mb-4 sm:mb-0 sm:ml-1" htmlFor="lastName">
            Last Name
            <span className="text-orange">*</span>
            <Input
              name="lastName"
              onBlur={(val) => {
                setValue('lastName', String(val));
                trigger('lastName');
              }}
              initialValue={getValues().lastName}
            />
            {errors.lastName && <span className="text-sm text-orange">{errors.lastName.message}</span>}
          </label>
        </div>

        <label className="font-circular text-lg mb-4" htmlFor="email">
          Email
          <span className="text-orange">*</span>
          <Input
            type="email"
            name="email"
            inputMode="email"
            onBlur={(val) => {
              setValue('email', String(val));
              trigger('email');
            }}
            initialValue={getValues().email}
          />
          {errors.email && <span className="text-sm text-orange">{errors.email.message}</span>}
        </label>

        <label className="font-circular text-lg mb-4" htmlFor="phone">
          Phone Number
          <span className="text-orange">*</span>
          <Input
            mask="(999) 999-9999"
            name="phone"
            inputMode="tel"
            onBlur={(val) => {
              setValue('phone', String(val));
              trigger('phone');
            }}
            initialValue={getValues().phone}
          />
          {errors.phone && <span className="text-sm text-orange">{errors.phone.message}</span>}
        </label>

        <div className="flex flex-col sm:flex-row flex-shrink-0 mb-0 sm:mb-4">
          <label className="font-circular text-lg flex-1 mb-4 sm:mb-0 sm:mr-1" htmlFor="bedrooms">
            # Bedrooms
            <span className="text-orange">*</span>
            <Select
              initialValue={getValues().beds}
              onChange={(value) => {
                setValue('beds', String(value));
                trigger('beds');
              }}
              options={bedroomOpts}
              name="bedrooms"
            />
            {errors.beds && <span className="text-sm text-orange">{errors.beds.message}</span>}
          </label>

          <label className="font-circular text-lg flex-1 mb-4 sm:mb-0 sm:ml-1" htmlFor="moveDate">
            Move-in Date
            <span className="text-orange">*</span>
            <DatePicker
              onChange={(date) => {
                setValue('date', date);
                trigger('date');
              }}
              name="moveDate"
              initialValue={getValues().date}
              min={new Date()}
            />
            {errors.date && <span className="text-sm text-orange">{errors.date.message}</span>}
          </label>
        </div>

        <label className="font-circular text-lg mb-4" htmlFor="note">
          Special Requests
          <Input
            autoComplete="off"
            type="text"
            name="note"
            onBlur={(val) => {
              setValue('notes', String(val));
              trigger('notes');
            }}
            initialValue={getValues().notes}
          />
        </label>

        <label className="font-circular text-lg mb-4" htmlFor="addOpts[]">
          What do you want to do?
          <div className="pt-2 grid-cols-1 sm:grid-cols-2 grid gap-y-2">
            <Checkbox
              name="addOpts[]"
              label="Schedule tour"
              outlineColor="#C0D4D4"
              hoverColor="#C0D4D4"
              value={getValues().scheduleTour}
              onChange={(checked) => {
                setValue('scheduleTour', checked);
                trigger('scheduleTour');
              }}
            />
            <Checkbox
              name="addOpts[]"
              label="Check availability"
              outlineColor="#C0D4D4"
              hoverColor="#C0D4D4"
              value={getValues().checkAvailability}
              onChange={(checked) => {
                setValue('checkAvailability', checked);
                trigger('checkAvailability');
              }}
            />
            <Checkbox
              name="addOpts[]"
              label="Talk to leasing office"
              outlineColor="#C0D4D4"
              hoverColor="#C0D4D4"
              value={getValues().talkToAgent}
              onChange={(checked) => {
                setValue('talkToAgent', checked);
                trigger('talkToAgent');
              }}
            />
            <Checkbox
              name="addOpts[]"
              label="Start application"
              outlineColor="#C0D4D4"
              hoverColor="#C0D4D4"
              value={getValues().startApplication}
              onChange={(checked) => {
                setValue('startApplication', checked);
                trigger('startApplication');
              }}
            />
          </div>
        </label>

        <div className="w-full flex flex-row justify-end">
          <Button
            text={isSubmitting ? 'Submitting...' : 'Submit'}
            type="submit"
            disabled={!isValid || isSubmitting}
            iconRight={<ChevronRightIcon />}
          />
        </div>
      </form>
      {submitError && <span className="text-red block">Submit Error: {submitError}</span>}
    </>
  );
};

function cashbackMessage(cashback: number): string {
  const cashbackYearly = Math.min(cashback, 1200); // cap it to 1200
  const cashbackMonthly = Math.floor(cashbackYearly / 12);

  let msg = `Get $${cashbackYearly} in cash back`;
  if (cashbackYearly > 300) msg += `, or $${cashbackMonthly} per month`;
  msg += ' by applying with Lighthouse.';
  return msg;
}

export default LeadForm;
