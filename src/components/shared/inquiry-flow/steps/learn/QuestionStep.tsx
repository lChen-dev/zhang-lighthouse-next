import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { B2, B3, H3 } from '@components/shared/Typography';
import Textarea from '@components/shared/Textarea';
import ButtonCta from '@components/shared/ButtonCta';
import { RightArrowIcon } from '@components/shared/Icons';

import { InquiryData, useInquiryContext } from '../../InquiryContext';
import { sendTrack } from '@utils/analytics';

interface Props {
  next: () => void;
}

const QuestionStep: React.FC<Props> = ({ next }: Props) => {
  const { property, data, setData, hideDialog } = useInquiryContext();

  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    errors,
    formState: { isValid },
  } = useForm<Partial<InquiryData>>({ mode: 'onChange', defaultValues: data });

  useEffect(() => {
    sendTrack('InquiryFormPageLoaded', {
      category: 'inquiry',
      label: 'InquiryFormPageLoaded',
      action: 'InquiryFormPageLoaded',
      page: 'QuestionStep',
      version: 1,
    });
    register('question', { required: 'Required' });
  }, []);

  const onSubmit = (inqData: Partial<InquiryData>) => {
    sendTrack('InquiryFormStart', {
      category: 'inquiry',
      label: 'InquiryFormStart',
      action: 'InquiryFormStart',
      version: 1,
    });
    setData(inqData);
    next();
  };

  return (
    <>
      <H3 className="mb-2">What questions do you have?</H3>
      <B2 color="text-gray-soft" className="mb-4">
        <span className="block">Lighthouse will send your information to:</span>
        <span className="font-medium">{property.name}</span>
      </B2>

      <div className="flex-1">
        <B3>
          Question
          <span className="text-brand">*</span>
        </B3>
        <Textarea
          name="question"
          initialValue={data.question}
          rows={4}
          hasError={!!errors.question}
          onChange={(val) => {
            setValue('question', val);
            trigger('question');
          }}
        />
        {errors.question && <span className="text-sm text-red-500">{errors.question.message}</span>}
      </div>

      <ButtonCta
        disabled={!isValid}
        className="justify-center mb-3 mt-6"
        onClick={handleSubmit(onSubmit)}
        icon={RightArrowIcon}
        iconPos="right"
      >
        Continue
      </ButtonCta>
      <ButtonCta variant="white" className="justify-center" onClick={hideDialog}>
        Cancel
      </ButtonCta>
    </>
  );
};

export default QuestionStep;
