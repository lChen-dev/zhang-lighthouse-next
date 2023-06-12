import React, { useState } from 'react';

import Modal from '@components/shared/Modal';
import { B1 } from '@components/shared/Typography';
import { RightArrowIcon, LeftArrowIcon } from '@components/shared/Icons';
import ButtonCta from '@components/shared/ButtonCta';

interface Props {
  show?: boolean;
  onHide: () => void;
}

const HowLighthouseWorkDialog: React.FC<Props> = ({ show, onHide }: Props) => {
  const [activeStep, setActiveStep] = useState(1);
  // Active Steps are basically the steps of How lighthouse Works Modal. Where, 1 = First Step, 2 = Second Step and 3 = Third Step.
  function handleStepChange() {
    if (activeStep === 3) {
      onHide();
      setActiveStep(1);
    } else {
      setActiveStep(activeStep + 1);
    }
  }
  return (
    <Modal show={show} onHide={onHide} title="" className="how-lighthouse-work-dialog">
      <div className="step-img-container relative">
        {activeStep === 1 && (
          <img src="/static/assets/images/how-step1.svg" className="how-step1-img mx-auto object-contain" alt="" />
        )}
        {activeStep === 2 && (
          <img src="/static/assets/images/how-step2.svg" className="how-step2-img mx-auto object-contain" alt="" />
        )}
        {activeStep === 3 && (
          <img src="/static/assets/images/how-step3.svg" className="how-step3-img mx-auto object-contain" alt="" />
        )}
      </div>
      <div className="py-10 px-10">
        <div className="step-progress flex flex-row pt-10 pb-10">
          <div className={`rounded ${activeStep === 1 ? 'bg-green-600' : 'bg-gray-300'} h-1 w-full mx-1`} />
          <div className={`rounded ${activeStep === 2 ? 'bg-green-600' : 'bg-gray-300'} h-1 w-full mx-1`} />
          <div className={`rounded ${activeStep === 3 ? 'bg-green-600' : 'bg-gray-300'} h-1 w-full mx-1`} />
        </div>
        <div>
          {activeStep === 1 && (
            <B1>
              Lighthouse is an apartment search site that offers cash back by helping apartments find renters like you.
              Of course, it is 100% free.
            </B1>
          )}
          {activeStep === 2 && (
            <B1>
              Browse hundreds of buildings that pay cash back. If you need help, talk to our team and get guidance.
              Apply with Lighthouse and move.
            </B1>
          )}
          {activeStep === 3 && (
            <B1>
              When you move in, Lighthouse will send you a link to directly connect your bank, and send cash back
              straight to your account!
            </B1>
          )}
        </div>
      </div>
      <div className="flex py-4 px-10">
        {activeStep > 1 && (
          <button
            type="button"
            className="py-2 px-4 rounded outline-none mr-2"
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
            style={{ backgroundColor: 'rgba(52, 150, 109, 0.1)', color: '#34966D', outline: 'none' }}>
            <LeftArrowIcon />
          </button>
        )}
        <ButtonCta
          variant="primary"
          icon={RightArrowIcon}
          className="w-full justify-center flex-1"
          onClick={() => {
            handleStepChange();
          }}>
          {activeStep === 3 ? 'Got it, let’s go!' : 'Next'}
        </ButtonCta>
      </div>
    </Modal>
  );
};

export default HowLighthouseWorkDialog;
