import React from 'react';

import { B1, H3 } from '@components/shared/Typography';

interface Props {
  direction?: 'left' | 'right';
  heading: string;
  description: string | React.ReactNode;
  icon: React.ComponentType<any>;
}

const LearningBlock: React.FC<Props> = ({ direction = 'left', heading, description, icon: SvgIcon }: Props) => {
  return (
    <div className="w-full flex flex-wrap learningFlex my-0 py-0">
      {direction === 'right' && <div className="w-6/12 lg:block hidden" />}
      <div className={`learnContainer lg:w-6/12 w-full lg:px-4 px-0 ${direction}`}>
        <div className="learnBlock left lg:flex block w-full" style={{ minHeight: '190px', height: 'auto' }}>
          <div
            className="learnContainerIcon text-brand block w-full lg:pl-0 pl-4"
            style={{
              width: '98px',
              paddingRight: '40px',
              paddingTop: '70px',
              paddingBottom: '70px',
              paddingLeft: '5px',
              position: 'relative',
            }}>
            <SvgIcon stroke="currentColor" />
          </div>
          <div
            className="w-full block mx-0 px-0 learningBlockBorder"
            style={{
              paddingLeft: '36px',
              borderLeft: '1.5px solid #E0E0E0',
            }}>
            <H3 className="mb-4">{heading}</H3>
            <B1 className="font-light" color="text-gray-soft">
              {description}
            </B1>
          </div>
        </div>
      </div>
      {direction === 'left' && <div className="w-6/12 lg:block hidden" />}
    </div>
  );
};
export default LearningBlock;
