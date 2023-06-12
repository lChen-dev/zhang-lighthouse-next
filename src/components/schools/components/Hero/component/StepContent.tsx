import React from 'react';
import classNames from 'classnames';

import { B2, B1 } from '@components/shared/Typography';

interface Props {
  borderLeft?: boolean;
  text: string;
  heading: string;
  icon: React.ComponentType<any>;
}

const StepContent: React.FC<Props> = ({ borderLeft, text, icon: Icon, heading }: Props) => (
  <div
    className={classNames(
      'flex-1 py-12 w-full relative bg-white flex flex-col items-start md:items-start md:flex-col md:px-10 md:py-0',
      {
        'border-t border-l-0 md:border-t-0 md:border-l': borderLeft,
      },
    )}>
    <div className="flex flex-col items-start" style={{ width: '44px' }}>
      <Icon />
    </div>
    <B1 className="pt-5 pl-0 pr-0 w-full md:pt-5 md:pr-4 md:pl-0 md:pr-0" color="text-gray" weight="font-bold">
      {heading}
    </B1>
    <B1 className="pt-5 pl-0 pr-0 w-full md:pt-5 md:pr-4 md:pl-0 md:pr-0" color="text-gray-soft">
      {text}
    </B1>
  </div>
);

export default StepContent;
