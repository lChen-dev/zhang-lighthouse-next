import React from 'react';

import { Minus, Plus } from '@components/shared/Icons';
import { B1, H4 } from '@components/shared/Typography';

export type FAQItem = {
  question: string;
  answer: string | JSX.Element;
};

interface Props {
  question: string;
  answer: string | JSX.Element;
  open: boolean;
  setActiveIndex: (index: number | null) => void;
  index: number;
  ellipsisAfter?: number;
}

const FaqComponent: React.FC<Props> = ({
  question = '',
  answer = '',
  open = false,
  setActiveIndex,
  index,
  ellipsisAfter = 0,
}: Props) => {
  let ans = answer;
  if (typeof ans === 'string') {
    ans = ellipsisAfter > 0 ? `${ans.slice(0, ellipsisAfter)}...` : ans;
  }
  return (
    <div className="pt-5 block w-full transition-all">
      <div
        className={` block ${open ? 'pb-5' : 'pb-0'}`}
        style={{
          borderBottom: '1px solid rgba(0,0,0,.1)',
          transition: 'all 100ms',
        }}>
        <div
          className="faqHeading flex justify-between w-full cursor-pointer"
          onClick={() => setActiveIndex(open ? null : index)}>
          <H4 color={open ? 'text-green-bright' : 'text-gray-blue'} className="pr-4 select-none">
            {question}
          </H4>
          <div
            className={`block relative ${open ? 'text-brand' : 'text-gray-template'}`}
            style={{ top: open ? '15px' : '5px' }}>
            {open ? <Minus /> : <Plus />}
          </div>
        </div>
        <B1
          className="block w-full pr-4 pt-4 select-none transition-all"
          color="text-gray-soft"
          style={{
            height: open ? 'auto' : '0px',
            opacity: open ? '1' : '0',
            lineHeight: open ? 'unset' : '0px',
          }}>
          {ans}
        </B1>
      </div>
    </div>
  );
};

export default FaqComponent;
