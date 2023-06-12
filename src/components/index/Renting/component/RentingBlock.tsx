import React from 'react';

import { B1, H4 } from '@components/shared/Typography';

interface Props {
  title: string;
  description: string;
}

const RentingBlock: React.FC<Props> = ({ title, description }: Props) => {
  return (
    <div className="md:w-12/12 w-full block">
      <div className="py-8 md:py-10">
        <div className="block border-l-2 border-gray-fade md:pl-4 pl-6">
          <H4 className="pb-4 md:pb-6">{title}</H4>
          <B1 style={{ opacity: 0.6 }}>{description}</B1>
        </div>
      </div>
    </div>
  );
};

export default RentingBlock;
