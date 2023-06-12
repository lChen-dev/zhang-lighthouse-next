import React, { useState } from 'react';

import Modal from '@components/shared/Modal';
import ButtonCta from '@components/shared/ButtonCta';

import { useInquiryContext } from './InquiryContext';

import './stepped-dialog.css';

interface Props {
  steps: React.ComponentType<{ next: () => void }>[];
}

const SteppedDialog: React.FC<Props> = ({ steps }: Props) => {
  const { hideDialog } = useInquiryContext();
  const [step, setStep] = useState(0);
  return (
    <Modal show onHide={hideDialog} title="" className="stepped-dialog">
      {steps.map((Step, index) => {
        if (step === index) return <Step next={() => setStep(index + 1)} />;
        return null;
      })}

      {step > 0 && (
        <ButtonCta variant="white" className="justify-center" onClick={() => setStep(step - 1)}>
          Previous step
        </ButtonCta>
      )}
    </Modal>
  );
};

export default SteppedDialog;
