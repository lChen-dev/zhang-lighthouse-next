import React from 'react';

import { PropertyMarker } from '@models/Property';
import { openURLInNewTab } from '@utils/helpers';
import { B1, B2, H5 } from '@components/shared/Typography';
import { formatCashbackOnMapCard, getBedroomsList, getBuildingURL, storeSearchQuery } from '@utils/building-helper';

export enum Position {
  ABOVE,
  RIGHT,
  BELOW,
  LEFT,
}

interface Props {
  property: PropertyMarker;
  price: string;
  highlighted: boolean;
  position: Position;
  style?: React.CSSProperties;
  blockNavigation?: boolean;
}
const MapCard: React.FC<Props> = ({ property, price, highlighted, style, position, blockNavigation }: Props) => {
  const images = property.propertyPhotos.map((e) => e.url);

  let arrowClass = 'arrow-down';
  let arrowShadowClass = 'arrow-down-shadow';
  if (position === Position.BELOW) {
    arrowClass = 'arrow-up';
    arrowShadowClass = 'arrow-up-shadow';
  }

  let arrowStyle: { bottom?: string; top?: string; right?: string; left?: string; zIndex?: number } = {
    bottom: '-11px',
    right: 'calc(50% - 20px)',
    zIndex: -1,
  };

  let arrowShadowStyle: { bottom?: string; top?: string; right?: string; left?: string; zIndex?: number } = {
    bottom: '-13px',
    right: 'calc(50% - 22px)',
    zIndex: -2,
  };

  let cardStyle: { bottom?: string; top?: string; right?: string; left?: string } = { bottom: '94%', left: '-7rem' };
  if (position === Position.BELOW) {
    arrowStyle = {
      top: '-11px',
      right: 'calc(50% - 20px)',
      zIndex: -1,
    };

    arrowShadowStyle = {
      top: '-13px',
      right: 'calc(50% - 22px)',
      zIndex: -2,
    };

    cardStyle = { top: '2rem', left: '-7rem' };
  }

  return (
    <div
      className="cursor-pointer w-60 h-76 absolute flex flex-shrink-0 flex-col mb-3 box-border border border-gray-300 mx-1 bg-white rounded card-shadow"
      style={{
        ...cardStyle,
        ...style,
        zIndex: highlighted ? 300 : 30,
      }}
      onClick={(e) => {
        e.preventDefault();
        storeSearchQuery(property.nanoId);
        if (!blockNavigation) openURLInNewTab(getBuildingURL(property));
      }}
    >
      <div className="w-full h-20 text-white relative">
        <img
          className="w-full h-20 object-cover max-w-none z-50 rounded-t"
          src={images[0]}
          alt="property_image"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="px-3 flex-col justify-center w-full">
        <B1
          weight="font-medium"
          color="text-green-bright"
          className="mt-3 truncate"
          style={{ lineHeight: '1.5rem', fontSize: 16 }}
        >
          {formatCashbackOnMapCard(property.cashback)}
        </B1>
        <H5 weight="font-bold" className="truncate pr-3 mt-1">
          {property.name}
        </H5>
        <H5 weight="font-bold mt-1">{price}</H5>
        <B2 color="text-gray-dark" style={{ opacity: '85%' }} weight="font-book" className="truncate mt-3 w-full pr-3">
          <svg
            className="inline-block mr-1"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M13.999 6.66675C13.999 11.3334 7.99902 15.3334 7.99902 15.3334C7.99902 15.3334 1.99902 11.3334 1.99902 6.66675C1.99902 5.07545 2.63116 3.54933 3.75638 2.42411C4.8816 1.29889 6.40773 0.666748 7.99902 0.666748C9.59032 0.666748 11.1164 1.29889 12.2417 2.42411C13.3669 3.54933 13.999 5.07545 13.999 6.66675Z"
                stroke="#34966D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.99984 8.66675C9.10432 8.66675 9.99968 7.77132 9.99968 6.66675C9.99968 5.56218 9.10432 4.66675 7.99984 4.66675C6.89536 4.66675 6 5.56218 6 6.66675C6 7.77132 6.89536 8.66675 7.99984 8.66675Z"
                stroke="#34966D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {property.address}, {property.city}, {property.state} {property.zip}
        </B2>
        <B2 color="text-gray-dark" style={{ opacity: '85%' }} weight="font-book" className="truncate w-full mt-1 pr-3">
          <svg
            className="inline-block mr-1"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.7998 3V9M1.7998 9C1.53459 9 1.28023 9.10536 1.0927 9.29289C0.905161 9.48043 0.799805 9.73478 0.799805 10V15M1.7998 9H13.7998M13.7998 3V9M13.7998 9C14.065 9 14.3194 9.10536 14.5069 9.29289C14.6944 9.48043 14.7998 9.73478 14.7998 10V15M1.7998 5H13.7998M7.7998 9V5M14.7998 12H0.799805"
              stroke="#34966D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {getBedroomsList(property.floorplan)}
        </B2>
        {!blockNavigation && (
          <button
            className="select-none w-full rounded bg-green-bright text-center mt-4 h-10 z-50"
            onClick={(e) => {
              e.preventDefault();
              storeSearchQuery(property.nanoId);
              setTimeout(() => {
                openURLInNewTab(`/building/${property.nanoId}`);
              }, 100);
            }}
          >
            <B2 weight="font-medium" color="text-white">
              See details
            </B2>
          </button>
        )}
        <div className={`${arrowClass} absolute`} style={arrowStyle} />
        <div className={`${arrowShadowClass} absolute`} style={arrowShadowStyle} />
      </div>
    </div>
  );
};

export default MapCard;
