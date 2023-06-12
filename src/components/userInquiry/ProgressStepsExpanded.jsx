import { CircularTickSVG } from '@components/shared/Icons';
import { useRouter } from 'next/router';
import React from 'react';
import { steps, stepsExtended } from './steps';
import './styles.css';

function ProgressStepsExpanded({ count }) {
  const { query } = useRouter();
  return (
    <div className=" absolute top-0 left-0 w-full expanded-progressbar">
      <div className="max-w-screen-xl mx-auto flex flex-row justify-start">
        <div className=" flex flex-col mt-24 ml-10 xl:ml-0" style={{ width: '216px' }}>
          <div
            style={{ paddingBottom: '2px' }}
            className="w-full border-b-3 border-brand text-brand text-16px font-circular font-bold"
          >
            {`${Math.floor((Object.keys(steps)?.findIndex((i) => i === query.stepId) / count) * 100)}%`}
          </div>
          <div className="flex-col flex " style={{ marginTop: '47px' }}>
            {stepsExtended.map((Step, ind) => (
              <div
                className={`border-l-2  flex relative flex-row pt-1 ${
                  Object.keys(steps)?.findIndex((i) => i === query.stepId) >= ind
                    ? 'text-brand font-circular font-bold border-brand'
                    : 'border-gray-light text-gray-light font-circular font-bold'
                } `}
                style={{ marginBottom: '40px', paddingLeft: '6px' }}
              >
                {<Step.Icon height={21} width={21} />}
                <span
                  style={{ paddingLeft: '6px' }}
                  className={`${
                    Object.keys(steps)?.findIndex((i) => i === query.stepId) !== ind ? 'text-gray-blue' : 'text-brand'
                  }`}
                >
                  {Step.name}
                  {Step?.Optional && <span className="text-gray-medium ml-1">(optional)</span>}
                </span>
                {Object.keys(steps)?.findIndex((i) => i === query.stepId) > ind && (
                  <div className="absolute top-0" style={{ marginLeft: '-36px', marginTop: '4px' }}>
                    <CircularTickSVG />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressStepsExpanded;
