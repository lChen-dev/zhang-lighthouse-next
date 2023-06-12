/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import FaqComponent, { FAQItem } from './FaqComponent';

interface Props {
  faqs: FAQItem[];
  ellipsisAfter?: number;
}
const FaqContainer: React.FC<Props> = ({ faqs, ellipsisAfter }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <>
      {faqs.map((item: FAQItem, index: number) => (
        <FaqComponent
          key={item.question}
          question={item.question}
          answer={item.answer}
          ellipsisAfter={ellipsisAfter}
          open={index === activeIndex}
          setActiveIndex={setActiveIndex}
          index={index}
        />
      ))}
    </>
  );
};

export default FaqContainer;
