import { connectHits } from 'react-instantsearch-dom';
import React, { ComponentClass } from 'react';

import { SmallText, SubHeading } from '@components/shared/ResponsiveFonts';
import { BuildingLead } from '@components/lookup/LeadForm';

interface Props {
  algoliaProps: {
    hit: any;
  };
  showLead: (lead: BuildingLead) => void;
}

export const HitsBlock: React.FC<Props> = ({ algoliaProps: { hit }, showLead}: Props) => {
  const { name, image, address, city, objectID, site } = hit;
  let { cashback } = hit;
  // if cashback exceed 1200, cap it to 1200
  cashback = cashback >= 1200 ? 1200 : cashback;
  cashback = parseInt(`${cashback}`, 10);
  return (
    <div
      className="cursor-pointer shadow-md flex bg-white rounded flex-col mx-2 hover:shadow-xl"
      onClick={(e) => {
        e.preventDefault();
        showLead({
          name,
          cashback,
          image,
          website: site,
          aptsId: objectID,
          city,
          address,
        });
      }}
    >
      <div className="w-full h-48 text-white relative">
        <img className="w-full h-48 object-cover max-w-none" src={image} alt="unit-img" />
        <p className="absolute h-6 px-2 rounded bg-gray bg-opacity-50 text-white flex items-center top-0 left-0 mt-1 ml-1">
          <span className="w-2 h-2 rounded-full bg-orange inline-block mr-1" />
          <SmallText fontWeightClass="font-bold" fontSizeClass="text-18px" textColorClass="text-white">
            ${cashback} Cash Back
          </SmallText>
        </p>
      </div>
      <div className="ml-3 flex-col my-auto justify-around py-4">
        <div className="justify-around">
          <SubHeading fontWeightClass="font-bold">{name}</SubHeading>
        </div>
        <SmallText fontSizeClass="text-14px" fontWeightClass="font-regular" textColorClass="text-gray-medium">
          <span>
            <svg
              className="inline mr-1"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7493 7.5C15.7493 12.75 8.99927 17.25 8.99927 17.25C8.99927 17.25 2.24927 12.75 2.24927 7.5C2.24927 5.70979 2.96043 3.9929 4.2263 2.72703C5.49217 1.46116 7.20906 0.75 8.99927 0.75C10.7895 0.75 12.5064 1.46116 13.7722 2.72703C15.0381 3.9929 15.7493 5.70979 15.7493 7.5Z"
                stroke="#FA8946"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.99933 9.75C10.2419 9.75 11.2491 8.74264 11.2491 7.5C11.2491 6.25736 10.2419 5.25 8.99933 5.25C7.75679 5.25 6.74951 6.25736 6.74951 7.5C6.74951 8.74264 7.75679 9.75 8.99933 9.75Z"
                stroke="#FA8946"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {`${address}, ${city}`}
        </SmallText>
      </div>
    </div>
  );
};

const CustomHits: ComponentClass<any, any> = connectHits(({ hits, hitComponent: HitComponent }: any) =>
  hits.map((hit: any, key: any) => <HitComponent hit={hit} key={key} />)
);

export default CustomHits;
