import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addDays } from 'date-fns';

import { H3 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';
import DatePicker from '@components/shared/DatePicker';
import Select from '@components/shared/Select';
import Textarea from '@components/shared/Textarea';

import { InquiryData, useInquiryContext } from '../../InquiryContext';
import { sendTrack } from '@utils/analytics';

interface Props {
  next: () => void;
}

const ScheduleStep: React.FC<Props> = ({ next }: Props) => {
  const { data, setData } = useInquiryContext();

  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    errors,
    formState: { isValid },
  } = useForm<Partial<InquiryData>>({
    mode: 'onChange',
    defaultValues: { ...data, tourDate: data.tourDate ?? new Date() },
  });

  useEffect(() => {
    sendTrack('InquiryFormPageLoaded', {
      category: 'inquiry',
      label: 'InquiryFormPageLoaded',
      action: 'InquiryFormPageLoaded',
      page: 'ScheduleStep',
      version: 1,
    });
    register('tourTime', { required: 'Required' });
    register('tourDate', { required: 'Required' });
    register('tourComments');
  }, []);

  const onSubmit = (inqData: Partial<InquiryData>) => {
    sendTrack('InquiryFormPage', {
      category: 'inquiry',
      label: 'InquiryFormPage',
      action: 'InquiryFormPage',
      page: 'ScheduleStep',
      ...inqData,
      version: 1,
    });
    setData(inqData);
    next();
  };

  return (
    <>
      <H3 className="mb-4">Available Dates</H3>

      <div className="flex-1">
        <div className="mb-6">
          <DatePicker
            className="lh-datepicker"
            min={new Date()}
            max={addDays(new Date(), 7)}
            name="tourDate"
            inline
            initialValue={data.tourDate}
            onChange={(date) => {
              setValue('tourDate', date);
              trigger('tourDate');
            }}
          />
          {errors.tourDate && <span className="text-sm text-red-500">{errors.tourDate.message}</span>}
        </div>
        <Select
          arrowColor="#34966D"
          className="mb-2"
          onChange={(time) => {
            setValue('tourTime', time);
            trigger('tourTime');
          }}
          options={[
            { label: 'Select a time...', value: '', disabled: true },
            { label: 'Morning (9-12)', value: 'morning' },
            { label: 'Afternoon (12-3)', value: 'afternoon' },
            { label: 'Evening (3-6)', value: 'evening' },
          ]}
          initialValue={data.tourTime}
          name="tourTime"
        />
        <Textarea
          name="tourComments"
          className="mb-2"
          placeholder="Additional comments..."
          initialValue={data.tourComments}
          onChange={(val) => {
            setValue('tourComments', val);
            trigger('tourComments');
          }}
        />
      </div>
      <ButtonCta disabled={!isValid} className="justify-center mb-3" onClick={handleSubmit(onSubmit)}>
        Schedule tour
      </ButtonCta>
    </>
  );
};

export default ScheduleStep;
