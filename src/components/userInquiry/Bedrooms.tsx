import React, { useEffect } from 'react';

import { ToTheRightArrowGreenSVG } from '@components/shared/Icons';
import { wizardStepProps } from '@components/shared/wizard/Props';

const Bedrooms: React.FC<wizardStepProps> = ({
  saveData,
  sendTrack,
  setNextStep,
  updateCompletedSteps,
  stepId,
}: wizardStepProps) => {
  useEffect(() => {
    sendTrack('Guided Visit form step loaded', { Step: 'Bedrooms' });
  }, []);
  return (
    <div className="w-full">
      {[0.5, 1, 2, 3, 4].map((choice, ind) => (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            saveData({ bedrooms: choice });
            sendTrack('Guided Visit form step', { Step: 'Bedrooms', data: { bedrooms: choice } });
            setTimeout(() => {
              setNextStep('amenities', { bedrooms: choice });
              updateCompletedSteps(stepId as string);
            }, 150);
          }}
          style={{ height: '54px', marginTop: `${ind === 0 ? '-7px' : '0px'}`, marginBottom: '14px' }}
          className={`w-full outline-none focus:outline-none rounded-lg  border border-gray-lighter relative ${
            ind === 0 ? 'transform -translate-y-1' : ''
          }`}>
          <div
            className=" w-162px text-left absolute top-0 ml-6 font-circular font-bold text-20px text-gray-blue "
            style={{ marginTop: '10px' }}>
            {choice === 0.5 ? 'Studio' : choice}
          </div>
          <div className=" absolute right-0 top-0 " style={{ marginTop: '17px', marginRight: '19px' }}>
            <ToTheRightArrowGreenSVG />
          </div>
        </button>
      ))}
    </div>
  );
};

export default Bedrooms;
