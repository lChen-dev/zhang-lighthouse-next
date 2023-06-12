/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import classNames from 'classnames';

import { formatPriceRange, getCashback, numberWithCommas } from '@utils/format';
import { openURLInNewTab } from '@utils/helpers';
import { storeSearchQuery as maybeStoreSearchInMemory, getBuildingURL, storeSearchQuery } from '@utils/building-helper';
import { B2, H5 } from '@components/shared/Typography';
import { Property, PropertyPhoto } from '@models/Property';
import { getBedroomRange, getMaxRent, getMinRent } from '@utils/property-helpers';
import FavoriteButton from '@components/shared/property/FavoriteButton';
import { ArrowLinkIcon, CloseIcon } from '@components/shared/Icons';
import '../css/flickity.css';
import { useRouter } from 'next/router';

type Props = {
  property: Property;
  hidePhotos?: boolean;
  onClose?: () => void;
  mobile?: boolean;
  setShowAuth?: (e?: any) => any;
  user?: any;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'property'>;

const HorizontalPropertyCard = React.forwardRef<HTMLDivElement, Props>(
  ({ property, hidePhotos, mobile, onClose, style, className, setShowAuth, user, ...rest }: Props, ref) => {
    const { name, address, propertyPhotos, floorplan, city, state, zip } = property;
    const router = useRouter();

    const cashback = getCashback(property.cashback);
    const maxRent = useMemo(() => getMaxRent(floorplan), [floorplan]);
    let minRent = useMemo(() => getMinRent(floorplan), [floorplan]);
    if (!minRent || !Number.isFinite(minRent)) {
      minRent = property.minRent;
    }

    const [minBedroom, maxBedroom] = useMemo(() => getBedroomRange(floorplan), [floorplan]);
    const price = formatPriceRange(minRent, maxRent);

    const maxImageTries = 3;
    const imageTries: any = [];

    if (!price || price === '') return null;
    if (!cashback || cashback === 0) return null;

    const clickHandler = (e: any): void => {
      if (!user) {
        e.preventDefault();
        e.stopPropagation();
        if (setShowAuth) setShowAuth(true);
      }
    };

    const renderImage = (img: PropertyPhoto) => {
      return (
        <div key={img.id}>
          <LazyLoadImage
            onDragStart={handleDragStart}
            onDragEnd={handleDragStart}
            className="object-cover max-w-none p-0 m-0 h-32 md:h-full w-full cursor-default"
            src={img.url}
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
                if (!imageTries[filename]) {
                  imageTries[filename] = maxImageTries;
                }
                if (filename !== '' && imageTries[filename] >= 1) {
                  e.target.setAttribute('src', src.replace(oldFilename, `${number}_${filename}`));
                  imageTries[filename]--;
                }
              }
            }}
            style={{
              display: 'block',
              borderBottomLeftRadius: 4,
              borderTopLeftRadius: 4,
              objectFit: 'cover',
            }}
          />
        </div>
      );
    };

    return (
      <>
        <div
          ref={ref}
          className={classNames(
            'relative cursor-pointer mb-3 border box-border flex-col bg-white mx-1 property-card property-card-horizontal',
            className,
          )}
          style={{
            ...style,
            scrollSnapAlign: 'center',
            height: onClose ? 212 : 250,
            minHeight: onClose ? 212 : 250,
            maxHeight: onClose ? 212 : 250,
          }}
          {...rest}>
          <div className="property-card-arrow">
            <ArrowLinkIcon />
          </div>
          {/* icons */}
          <div
            className="flex bg-white flex-row items-center absolute top-0 right-0 p-2 m-2 property-card-controls"
            style={{ zIndex: 1 }}>
            <div onClick={clickHandler}>
              <FavoriteButton property={property} size="sm" setShowAuth={setShowAuth} />
            </div>
            {onClose && (
              <div className="ml-2 text-color" onClick={onClose}>
                <CloseIcon />
              </div>
            )}
          </div>

          {/* Mobile Image */}
          <div
            className="block text-white relative slider-wrapper"
            style={{ height: onClose ? 90 : 128, objectFit: 'cover', overflow: 'hidden' }}>
            {renderImage(propertyPhotos[0])}
          </div>

          <div
            className="mx-3 flex-col my-auto justify-around truncate w-full md:w-auto"
            onClick={(e) => {
              e.preventDefault();
              const url = getBuildingURL(property);
              maybeStoreSearchInMemory(property.nanoId);
              if (mobile) {
                router.push(url);
              } else {
                openURLInNewTab(url);
              }
            }}>
            <div className="justify-around">
              <p className="horizontal-cash-back font-medium font-circular">${numberWithCommas(cashback)} Cash Back</p>
              <H5
                style={{
                  width: '90%',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  display: 'block',
                  fontWeight: 500,
                }}>
                {name}
              </H5>
              <B2 className="block text-16px font-medium">{price}</B2>
            </div>
            <B2
              className="mt-1 md:w-full w-30 pr-2"
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: 'block',
                width: '100%',
              }}>
              <span
                className="text-gray-900 truncate inline-block"
                style={{ maxWidth: '85%', width: '100%', fontWeight: 450 }}>
                {address}, {city}, {state} {zip}
              </span>
            </B2>
          </div>
        </div>
      </>
    );
  },
);

function handleDragStart(e: any) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

export default HorizontalPropertyCard;
