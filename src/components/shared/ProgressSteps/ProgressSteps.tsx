import classNames from 'classnames';
import React from 'react';
import './style.css';

interface Props {
  Icons: React.FC[];
  activeIcon: number;
  lastStepDifferent?: boolean;
}
const ProgressSteps = ({ Icons, activeIcon, lastStepDifferent }: Props): React.ReactElement => {
  return (
    <div className="mt-6">
      <ul className="steps">
        {Icons.map((Icon: any, key: number) => {
          return lastStepDifferent ? (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={key}
              className={` ${
                activeIcon > key ? 'stepyellow stepyellow--complete' : 'stepyellow stepyellow--incomplete'
              }`}>
              <div
                className={`bg-white ${classNames({
                  'text-salmon-normal': activeIcon === key,
                  'text-gray-light': activeIcon < key,
                  'text-salmon-light': activeIcon > key,
                })}`}>
                <Icon />
              </div>
            </li>
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <li key={key} className={`step ${activeIcon > key ? 'step--complete' : 'step--incomplete'}`}>
              <div
                className={`bg-white stepContainer ${classNames({
                  'text-brand': activeIcon === key,
                  'text-gray-light': activeIcon < key,
                  'text-brand-light-even-darker': activeIcon > key,
                })}`}>
                <Icon />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProgressSteps;
