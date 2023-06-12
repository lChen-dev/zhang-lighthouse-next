import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { KEY_RETURN } from 'keycode-js';

import { cities, neighborhoodMap } from '@components/inquiry/city-data';
import Checkbox from '@components/shared/Checkbox';
import Input from '@components/shared/Input';
import { FormContext } from '@components/inquiry/MultiStepForm';
import Select, { SelectOption } from '@components/shared/Select';
import { RightArrowIcon } from '@components/shared/Icons';
import Button from '@components/shared/Button';
import { sendTrack } from '@utils/analytics';

const cityOptions: SelectOption[] = [
  { label: 'Select a city', value: '', disabled: true },
  ...cities.sort().map((city) => ({ label: city, disabled: false })),
];

interface Page1Data {
  city: string;
  targetNeighborhoods: string[];
}

const FormPage1: React.FC = () => {
  const { formData, setData, next } = useContext(FormContext);
  const {
    handleSubmit,
    setValue,
    getValues,
    register,
    errors,
    watch,
    trigger,
    formState: { isSubmitting, isValid },
  } = useForm<Page1Data>({
    defaultValues: {
      city: formData.city,
      targetNeighborhoods: formData.targetNeighborhoods ?? [],
    },
    mode: 'onChange',
  });

  const onSubmit = (data: Page1Data): void => {
    setData(data);
    sendTrack('SearchInquiryFormPage', {
      category: 'inquiry',
      label: 'SearchInquiryFormPage',
      action: 'SearchInquiryFormPage',
      page: 'FormPage1',
      questions: ['city', 'targetNeighborhoods'],
      ...data,
      version: 2,
    });
    next();
  };

  useEffect(() => {
    register('city', { required: 'Required' });
    register('targetNeighborhoods');
  }, []);

  const { city, targetNeighborhoods } = watch();
  return (
    <>
      <div className="mb-10">
        <h5 className="font-circular font-medium text-xl mb-1">Start your search.</h5>
        <p className="text-gray-medium font-circular font-light text-sm">
          Welcome to Lighthouse. Browse over 7,000 apartments that offer cash back.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.keyCode === KEY_RETURN) e.preventDefault();
        }}
        className="flex flex-col items-center"
      >
        <div className="w-full flex flex-col lh-form flex-1 justify-center">
          <h1 className="font-circular text-4xl font-medium mb-3 flex flex-col sm:flex-row">
            <span className="mr-2 text-2xl sm:text-4xl">
              Step <span className="text-orange">1</span> of 3.
            </span>
            <span>Choose your city</span>
          </h1>
          <label className="font-circular text-sm mb-6 text-gray-medium font-light" htmlFor="city">
            Where do you want to move?
            <span className="text-orange">*</span>
            <Select
              className="mt-2 text-base"
              initialValue={city}
              onChange={(value) => {
                if (!city) {
                  // This is the first required field so will make sense as a first interaction
                  sendTrack('SearchInquiryFormFirstInteraction', {
                    category: 'inquiry',
                    label: 'SearchInquiryFormFirstInteraction',
                    action: 'SearchInquiryFormFirstInteraction',
                    version: 2,
                  });
                }
                setValue('city', value);
                setValue('targetNeighborhoods', []);
                trigger('city');
              }}
              options={cityOptions}
              name="city"
            />
            {errors.city && <span className="text-sm text-orange">{errors.city.message}</span>}
          </label>

          <label className="font-circular text-sm text-gray-medium font-light" htmlFor="targetNeighborhoods">
            Which neighborhood(s)?
            <span className="text-gray-light font-normal text-xs"> (Optional)</span>
            {neighborhoodMap[city] !== undefined ? (
              <div className="pt-2 grid-cols-2 sm:grid-cols-3 grid gap-y-2 mt-2 text-base">
                {neighborhoodMap[city].sort().map((neigh) => (
                  <Checkbox
                    key={neigh}
                    name="targetNeighborhoods"
                    label={neigh}
                    outlineColor="#C0D4D4"
                    hoverColor="#C0D4D4"
                    value={targetNeighborhoods.includes(neigh)}
                    onChange={(checked) => {
                      let tn = targetNeighborhoods;
                      if (checked) {
                        tn.push(neigh);
                      } else {
                        tn = tn.filter((n) => n !== neigh);
                      }
                      setValue('targetNeighborhoods', tn);
                    }}
                  />
                ))}
              </div>
            ) : (
              <Input
                className="mt-2"
                onBlur={(val) => setValue('targetNeighborhoods', [String(val)])}
                name="targetNeighborhoods"
                initialValue={(getValues().targetNeighborhoods ?? []).join(', ')}
              />
            )}
          </label>
        </div>
        <Button
          text="Next step"
          disabled={!isValid || isSubmitting}
          iconRight={<RightArrowIcon />}
          type="submit"
          className="w-full mt-12 justify-center"
        />
      </form>
    </>
  );
};

export default FormPage1;
