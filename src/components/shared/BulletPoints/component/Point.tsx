import React from 'react';

import { GreenTick } from '@components/shared/Icons';
import { H4, B1 } from '@components/shared/Typography';

interface Props {
  text: string;
  subText: string;
}
const Point: React.FC<Props> = ({ text, subText }: Props) => {
  return (
    <div
      className="flex md:w-6/12 md:mr-4 mr-0 md:mb-0 mb-4 w-full bg-white rounded"
      style={{
        boxShadow: '0px 0px 12px rgb(0 0 0 / 15%)',
      }}>
      <div className="flex items-center py-6 md:py-12 laptop:pl-8 pl-5">
        <div className="block">
          <GreenTick />
        </div>
        <div className="block w-full pl-5 pr-10 pt-1">
          <H4 className="whitespace-no-wrap mb-3">{text}</H4>
          <B1 color="text-gray-soft">{subText}</B1>
        </div>
      </div>
    </div>
  );
};

export default Point;
