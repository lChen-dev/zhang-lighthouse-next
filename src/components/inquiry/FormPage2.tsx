import React, { useContext, useEffect } from 'react';
import { KEY_RETURN } from 'keycode-js';
import { useForm } from 'react-hook-form';

import { FormContext } from '@components/inquiry/MultiStepForm';
import Select, { SelectOption } from '@components/shared/Select';
import Input from '@components/shared/Input';
import DatePicker from '@components/shared/DatePicker';
import Checkbox from '@components/shared/Checkbox';
import Button from '@components/shared/Button';
import { LeftArrowIcon, RightArrowIcon } from '@components/shared/Icons';
import { Data } from '@react-google-maps/api';
import { sendTrack } from '@utils/analytics';

const bedroomOpts: SelectOption[] = [
  { label: 'Studio', value: 0 },
  { label: '1 Bedroom', value: 1 },
  { label: '2 Bedrooms', value: 2 },
  { label: '3 Bedrooms', value: 3 },
  { label: '4+ Bedrooms', value: 4 },
];

const leaseLengthOpts: SelectOption[] = [
  { label: 'Select a length', value: '', disabled: true },
  { label: '3-5 Months' },
  { label: '6-11 Months' },
  { label: '12+ Months' },
  { label: 'Not sure yet' },
];

const issueList = ['Low Income', 'Misdemeanor', 'Unpaid Balance', 'Felony', 'Broken Lease', 'Eviction'];

interface Page2Data {
  bedrooms: number;
  rentPrice?: number;
  moveDate?: Date;
  leaseLength: string;
  issues: string[];
}

const FormPage2: React.FC = () => {
  const { formData, setData, next, prev } = useContext(FormContext);
  const {
    handleSubmit,
    setValue,
    register,
    errors,
    watch,
    trigger,
    formState: { isSubmitting, isValid },
  } = useForm<Page2Data>({
    defaultValues: {
      bedrooms: formData.bedrooms,
      rentPrice: formData.rentPrice,
      moveDate: formData.moveDate,
      leaseLength: formData.leaseLength,
      issues: formData.issues,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: Page2Data): void => {
    setData(data);
    sendTrack('SearchInquiryFormPage', {
      category: 'inquiry',
      label: 'SearchInquiryFormPage',
      action: 'SearchInquiryFormPage',
      page: 'FormPage2',
      questions: ['bedrooms', 'rentPrice', 'moveDate', 'issues'],
      ...data,
      version: 2,
    });
    next();
  };

  useEffect(() => {
    register('bedrooms', { required: 'Required' });
    register('rentPrice', { required: 'Required' });
    register('moveDate', { required: 'Required' });
    register('issues');
  }, []);

  const { bedrooms, rentPrice, moveDate, issues } = watch();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.keyCode === KEY_RETURN) e.preventDefault();
      }}
      className="flex flex-col items-center"
    >
      <div className="w-full flex flex-col lh-form flex-1 justify-center">
        <h1 className="font-circular text-4xl font-medium flex flex-col sm:flex-row">
          <span className="mr-2 text-2xl sm:text-4xl">
            Step <span className="text-orange">2</span> of 3.
          </span>
          <span>Introduce yourself</span>
        </h1>
        <p className="font-circular font-light text-gray-medium mb-8">
          Lighthouse has apartments that work with all backgrounds and budgets. We strive to get you in at the best
          price.
        </p>

        <div className="flex flex-col sm:flex-row">
          <label className="font-circular text-sm mb-6 text-gray-medium font-light flex-1 sm:mr-1" htmlFor="bedrooms">
            How many bedrooms?
            <span className="text-orange">*</span>
            <Select
              className="mt-2 text-base"
              initialValue={bedrooms}
              onChange={(value) => {
                setValue('bedrooms', value);
                trigger('bedrooms');
                setData({ bedrooms: Number(value) });
              }}
              options={bedroomOpts}
              name="bedrooms"
            />
            {errors.bedrooms && <span className="text-sm text-orange">{errors.bedrooms.message}</span>}
          </label>

          <label className="font-circular text-sm mb-6 text-gray-medium font-light flex-1 sm:mx-1" htmlFor="budget">
            What is your budget?
            <span className="text-orange">*</span>
            <Input
              prefix="$"
              initialValue={rentPrice}
              onBlur={(val) => {
                setValue('rentPrice', val);
                trigger('rentPrice');
                setData({ rentPrice: Number(val) });
              }}
              name="budget"
              type="number"
              min={900}
              inputMode="numeric"
              className="mt-2"
            />
            {errors.rentPrice && <span className="text-sm text-orange">{errors.rentPrice.message}</span>}
          </label>
          <label
            className="font-circular text-sm mb-6 text-gray-medium font-light flex-1 sm:ml-1 mt-0"
            htmlFor="moveDate"
          >
            When is your move-in date?
            <span className="text-orange">*</span>
            <DatePicker
              className="mt-2"
              onChange={(date) => {
                setValue('moveDate', date);
                trigger('moveDate');
                setData({ moveDate: date });
              }}
              name="moveDate"
              initialValue={moveDate}
              min={new Date()}
            />
            {errors.moveDate && <span className="text-sm text-orange">{errors.moveDate.message}</span>}
          </label>
        </div>

        <label className="font-circular text-sm mb-6 text-gray-medium font-light">
          Any issues we should be aware of?
          <span className="text-gray-light text-xs"> (Optional)</span>
          <div className="pt-2 grid-cols-2 sm:grid-cols-3 grid gap-y-2 text-base mt-2">
            {issueList.map((issue) => (
              <Checkbox
                key={issue}
                name="issues"
                label={issue}
                outlineColor="#C0D4D4"
                hoverColor="#C0D4D4"
                value={formData.issues.includes(issue)}
                onChange={(checked) => {
                  let iss = issues;
                  if (checked) {
                    iss.push(issue);
                  } else {
                    iss = iss.filter((i) => i !== issue);
                  }
                  setValue('issues', iss);
                  trigger('issues');
                }}
              />
            ))}
          </div>
          {errors.issues && <span className="text-sm text-orange">{(errors.issues as any).message}</span>}
        </label>
      </div>
      <div className="w-full flex flex-col-reverse sm:flex-row mt-12">
        <Button
          light
          className="sm:mr-4 px-8 mt-4 sm:mt-0 justify-center"
          text="Previous"
          type="button"
          iconLeft={<LeftArrowIcon />}
          onClick={prev}
        />
        <Button
          className="flex-1 justify-center"
          text="Next step"
          type="submit"
          disabled={!isValid || isSubmitting}
          iconRight={<RightArrowIcon />}
        />
      </div>
    </form>
  );
};

export default FormPage2;
