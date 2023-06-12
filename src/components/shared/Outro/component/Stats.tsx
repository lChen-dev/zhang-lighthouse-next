import React from 'react';

import { B1, H1 } from '@components/shared/Typography';

let id = 0;

interface Props {
  value: number;
  prepend?: string;
  append?: string;
  commaNumber?: boolean;
  subHeading: string;
  border?: boolean;
}

const Stats: React.FC<Props> = ({
  value,
  prepend = '',
  append = '',
  commaNumber = true,
  subHeading,
  border = true,
}: Props) => {
  ++id;
  return (
    <div
      className="block w-full md:py-0 py-5 text-left mobileBorder text-center md:text-left"
      style={{
        borderRight: `${border ? '1' : '0'}px solid rgba(0,0,0,.1)`,
        paddingRight: '20px',
        paddingLeft: '20px',
      }}>
      <div className="block">
        <H1 className="w-full">
          <span
            className="font-circular animateNumber"
            data-value={value}
            data-id={id}
            data-comma={commaNumber}
            data-prepend={prepend}
            data-append={append}>
            {prepend}0{append}
          </span>
        </H1>
      </div>
      <div className="block">
        <B1>{subHeading}</B1>
      </div>
    </div>
  );
};

export default Stats;
