import React, { useMemo } from 'react';
import { SmallText, SubHeading } from '@components/shared/ResponsiveFonts';
import { bedRange } from '@utils/building-helper';
import { Floorplan, Property } from '@models/Property';
import { abbreviateNumber } from '@utils/format';
import { BuildingLead } from '@components/lookup/LeadForm';

const getMaxRent = (floorplan: Floorplan[]) => Math.max(...floorplan.map((f) => f.maxRent));

const getBedroomRange = (floorplan: Floorplan[]) => {
  let min = Math.min(...floorplan.map((f) => f.bedroomCount));
  let max = Math.max(...floorplan.map((f) => f.bedroomCount));
  min = Number.isFinite(min) ? min : 0;
  max = Number.isFinite(max) ? max : 0;
  return Array.from(new Set([min, max]));
};

const MIN_ALLOWED_PRICE = 400;
const formatPriceRange = (minPrice: number, maxPrice: number) => {
  if ((!minPrice && !maxPrice) || (minPrice < MIN_ALLOWED_PRICE && maxPrice < MIN_ALLOWED_PRICE))
    return 'Call for Rent';
  if (!minPrice || minPrice < MIN_ALLOWED_PRICE) return `$${maxPrice}`;
  if (!maxPrice || maxPrice < MIN_ALLOWED_PRICE) return `$${minPrice}`;

  let resultPrice: any = Array.from(new Set([minPrice, maxPrice])).filter((price) => price && Number.isFinite(price));
  resultPrice = resultPrice.length > 0 ? `$${resultPrice.join(' - ')}` : '';
  return resultPrice;
};

interface Props {
  result: Property;
  showLead: (lead: BuildingLead) => void;
}

const Result: React.FC<Props> = ({ result, showLead }: Props) => {
  const { name, address, propertyPhotos, minRent, floorplan, city, website, cashback, apts_id } = result;

  const image = propertyPhotos[0]?.url;
  let maxImageTries = 3;
  const maxRent = useMemo(() => getMaxRent(floorplan), [floorplan]);
  const [minBedroom, maxBedroom] = useMemo(() => getBedroomRange(floorplan), [floorplan]);
  const price = formatPriceRange(minRent, maxRent);
  if (!price || price === '') return <></>;
  if (!cashback || cashback === 0) return <></>;

  return (
    <div
      className="cursor-pointer shadow-md sm:flex block bg-white rounded md:h-48 h-64"
      onClick={(e) => {
        e.preventDefault();
        showLead({
          name,
          cashback: parseInt((cashback as any) || 0, 10),
          image,
          website,
          city,
          address,
          aptsId: apts_id,
        });
      }}
    >
      <div className="sm:w-48 w-full sm:h-full h-24 text-white relative">
        <img
          className="sm:w-32 w-full sm:h-full h-24 object-cover max-w-none"
          src={image}
          alt="property_image"
          onError={(e: any) => {
            const src = e.target.getAttribute('src') || '';
            if (src) {
              const oldFilename = src.split(/\//).pop();
              const nameArr = oldFilename.split('_');
              let number = parseInt(nameArr[0] || 0, 10);
              // eslint-disable-next-line prefer-destructuring
              const filename = nameArr[1] || '';
              if (number < 10) {
                number++;
              } else {
                number = 1;
              }
              if (filename !== '' && maxImageTries >= 1) {
                e.target.setAttribute('src', src.replace(oldFilename, `${number}_${filename}`));
                maxImageTries--;
              }
            }
          }}
          style={{
            objectFit: 'cover',
            minWidth: '160px',
          }}
        />
        <p className="absolute h-6 px-1 rounded bg-gray bg-opacity-50 text-white flex items-center top-0 left-0 mt-1 sm:ml-1 sm:w-auto w-32">
          <span className="w-2 h-2 rounded-full bg-orange inline-block sm:mr-1" />
          <SmallText fontWeightClass="font-bold" fontSizeClass="text-14px" textColorClass="text-white">
            ${abbreviateNumber(Math.trunc(cashback))} Cash Back
          </SmallText>
        </p>
      </div>
      <div className="ml-3 sm:flex-col block my-auto sm:justify-around">
        <div className="justify-around">
          <SmallText
            fontSizeClass="text-14px"
            fontWeightClass="font-regular"
            textColorClass="text-gray-medium"
            style={{
              width: '260px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              display: 'block',
            }}
          >
            {city}
          </SmallText>
          <SubHeading
            fontWeightClass="font-bold"
            style={{
              letterSpacing: '0.01em',
              width: '260px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              display: 'block',
            }}
          >
            {name}
          </SubHeading>
          <SubHeading textColorClass="text-green" fontWeightClass="font-bold">
            {price}
          </SubHeading>
        </div>
        <SmallText
          fontSizeClass="text-14px"
          fontWeightClass="font-regular"
          textColorClass="text-gray-medium"
          style={{
            width: '240px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: 'block',
          }}
        >
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
          {address}
        </SmallText>
        <SmallText fontSizeClass="text-16px" otherClasses="block mt-2">
          {bedRange(minBedroom, maxBedroom)}
        </SmallText>
      </div>
    </div>
  );
};

export default Result;
