import React from 'react';
import classNames from 'classnames';

import { B2 } from '@components/shared/Typography';

interface Props {
  borderLeft?: boolean;
  text: string;
  icon: React.ComponentType<any>;
}

const StepContent: React.FC<Props> = ({ borderLeft, text, icon: Icon }: Props) => (
  <div
    className={classNames(
      'flex-1 py-6 w-full relative bg-white flex flex-row items-center md:items-start md:flex-col md:px-10 md:py-0',
      {
        'border-t border-l-0 md:border-t-transparent md:border-l': borderLeft,
      }
    )}
  >
    <div className="flex flex-col items-start" style={{ width: '44px' }}>
      <Icon />
    </div>
    <B2 className="pt-0 pl-4 pr-0 w-full md:pt-5 md:pr-4 md:pl-0 md:pr-0" color="text-gray-soft">
      {text}
    </B2>
  </div>
);

StepContent.defaultProps = { borderLeft: false };

export default StepContent;
