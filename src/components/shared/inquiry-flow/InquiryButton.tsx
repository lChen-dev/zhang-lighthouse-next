import React from 'react';
import { RightArrowIcon } from '@components/shared/Icons';
import { H5 } from '@components/shared/Typography';

interface Props {
  text: string;
  onClick: () => void;
  isHighlighted?: boolean;
}
const InquiryButton: React.FC<Props> = ({ text, onClick, isHighlighted }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-full group bg-white flex mb-2 flex-row items-center py-5 px-6 rounded-lg cursor-pointer last:mb-0 focus:outline-none inquery-btn ${isHighlighted &&
        'highlighted'}`}
    >
      <H5 className="flex-1 text-xl select-none text-left text-color">
        <span className="text-color with-opacity">I want to </span>
        <span className="text-color">{text}</span>
      </H5>
      <span className="text-brand">
        <RightArrowIcon />
      </span>
    </button>
  );
};

export default InquiryButton;
