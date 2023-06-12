import React from 'react';

import { ChevronRightIcon } from '@components/shared/Icons';
import { B1, B2, H2 } from '@components/shared/Typography';

interface Props {
  heading: string;
  description: string;
  linkText: string;
  linkHref: string;
  img: React.ReactElement;
  top?: string;
  left?: string;
  iconContainerClass: string;
}
const ScrollActiveContainer: React.FC<Props> = ({
  heading,
  description,
  linkText,
  linkHref,
  img,
  top,
  iconContainerClass,
}: Props) => {
  return (
    <div className="bg-white px-6 py-8 border rounded-sm block w-full overflow-hidden md:flex md:p-16 process-card">
      <div className="block md:w-8/12 w-full">
        <H2 style={{ paddingBottom: '22px' }}>{heading}</H2>
        <B1 className="pr-4 md:pr-0" style={{ opacity: 0.6, maxWidth: '620px' }}>
          {description}
        </B1>
        <B2 as="a" href={linkHref} className="text-green-bright flex items-center cursor-pointer pt-10 relative z-10">
          {linkText}
          <ChevronRightIcon />
        </B2>
      </div>
      <div className="md:block flex md:justify-start justify-center md:content-start content-center md:w-5/12 w-full  h-full relative">
        <div className={`${iconContainerClass} relative`} style={{ top }}>
          <div className="block mx-auto relative">
            {img}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScrollActiveContainer;
