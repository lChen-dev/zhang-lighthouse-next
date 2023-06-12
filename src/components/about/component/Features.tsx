import React from 'react';
import {
  CashbackLandscape,
  OrangeGraph,
  LighthouseNeighbourhood,
  LighthouseCashbackSmilies,
} from '@components/shared/Svgs';
import { B1, H3 } from '@components/shared/Typography';

interface Props {
  heading: string;
  subHeading?: string;
  icon: 'landscape-cashback' | 'orange-graph' | 'lighthouse-neighbourhood' | 'lighthouse-smilies';
}

const Features: React.FC<Props> = ({ heading, subHeading, icon }: Props) => {
  let SvgIcon: any;
  switch (icon) {
    case 'landscape-cashback':
      SvgIcon = CashbackLandscape;
      break;
    case 'orange-graph':
      SvgIcon = OrangeGraph;
      break;
    case 'lighthouse-neighbourhood':
      SvgIcon = LighthouseNeighbourhood;
      break;
    case 'lighthouse-smilies':
      SvgIcon = LighthouseCashbackSmilies;
      break;
    default:
      SvgIcon = CashbackLandscape;
  }
  return (
    <div
      className="bg-white w-full md:flex block p-6 md:p-10 mb-4 relative"
      style={{ minHeight: '218px', borderRadius: '8px', WebkitBoxShadow: '0px 0px 12px rgba(0, 0, 0, 0.12)' }}>
      <div className="flex items-center flex-wrap w-full relative md:flex-no-wrap">
        <div className="md:w-9/12 w-full md:order-first order-last">
          <div className="block w-full">
            <H3>{heading}</H3>
            <B1 color="text-gray-soft" className="pt-6 pr-0 md:pr-16">
              {subHeading}
            </B1>
          </div>
        </div>
        <div className="mb-6 md:mb-0 md:w-3/12 w-full ">
          <SvgIcon />
        </div>
      </div>
    </div>
  );
};

Features.defaultProps = {
  subHeading: '',
};

export default Features;
