/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useMemo } from 'react';
import Flickity from 'react-flickity-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import classNames from 'classnames';

import { formatPriceRange, getCashback, numberWithCommas } from '@utils/format';
import { openURLInNewTab } from '@utils/helpers';
import { storeSearchQuery, bedRange, getBuildingURL } from '@utils/building-helper';
import { B2, B3, B5, H4, H5 } from '@components/shared/Typography';

import { Property, PropertyPhoto } from '@models/Property';
import { getBedroomRange, getMaxRent, getMinRent } from '@utils/property-helpers';
import FavoriteButton from '@components/shared/property/FavoriteButton';
import { BedIcon, CloseIcon, MapMarkerIcon } from '@components/shared/Icons';

import '../css/flickity.css';
import router from 'next/router';

type Props = {
  property: Property;
  hidePhotos?: boolean;
  onClose?: () => void;
  mobile?: boolean;
  setShowAuth?: any;
  user?: any;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'property'>;

const PropertyCard = React.forwardRef<HTMLDivElement, Props>(
  ({ property, hidePhotos, mobile, onClose, style, className, setShowAuth, user, ...rest }: Props, ref) => {
    const { name, address, propertyPhotos, floorplan, city, state, zip } = property;
    const cashback = getCashback(property.cashback);
    const maxRent = useMemo(() => getMaxRent(floorplan), [floorplan]);
    let minRent = useMemo(() => getMinRent(floorplan), [floorplan]);

    const sortedPhotos = useMemo(
      () =>
        propertyPhotos
          ? propertyPhotos.sort((c, b) => {
              const cRank = c && c.rank ? parseInt(c.rank, 10) : 0;
              const bRank = b && b.rank ? parseInt(b.rank, 10) : 0;
              return cRank - bRank;
            })
          : [],
      [propertyPhotos]
    );

    if (!minRent || !Number.isFinite(minRent)) {
      minRent = property.minRent;
    }

    const [minBedroom, maxBedroom] = useMemo(() => getBedroomRange(floorplan), [floorplan]);
    const price = formatPriceRange(minRent, maxRent);

    const maxImageTries = 3;
    const imageTries: any = [];

    if (!price || price === '') return null;
    if (!cashback || cashback === 0) return null;

    const renderImage = (img: PropertyPhoto) => {
      return (
        <div key={img?.id}>
          <LazyLoadImage
            onDragStart={handleDragStart}
            onDragEnd={handleDragStart}
            className="object-cover max-w-none p-0 m-0 h-32 md:h-full w-full cursor-default"
            src={img?.url}
            alt="property_image"
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
            'relative cursor-pointer mb-3 border box-border flex flex-shrink-0 md:flex-shrink md:flex-row bg-white property-card property-card-vertical',
            className
          )}
          style={{ ...style, scrollSnapAlign: 'center' }}
          {...rest}>
          <div className="flex flex-row items-center z-4 absolute top-0 right-0 p-2 m-2">
            <FavoriteButton property={property} setShowAuth={setShowAuth} />
            {onClose && (
              <div className="ml-2" onClick={onClose}>
                <CloseIcon />
              </div>
            )}
          </div>

          {/* Mobile Image */}
          <div
            className="block md:hidden h-32 text-white relative slider-wrapper"
            style={{ maxWidth: '162px', width: '100%', height: '162px', objectFit: 'cover' }}>
            {renderImage(propertyPhotos[0])}
          </div>
          {/* Desktop Image */}
          <div
            className="hidden md:block h-48 text-white relative slider-wrapper"
            onDragStart={handleDragStart}
            onDragEnd={handleDragStart}
            style={{ maxWidth: '162px', width: '100%', height: '162px', objectFit: 'cover' }}>
            {!hidePhotos && (
              <Flickity
                static
                className={classNames('flickityslider', { hidden: hidePhotos })}
                disableImagesLoaded
                options={{
                  pageDots: false,
                  prevNextButtons: true,
                  imagesLoaded: false,
                  adaptiveHeight: false,
                  lazyLoad: true,
                  draggable: false,
                }}>
                {sortedPhotos.map(renderImage)}
              </Flickity>
            )}
            <p className="absolute rounded bg-gray-dark text-white flex items-center top-0 left-0 sm:w-auto w-32 px-2 py-2 mt-1 sm:mt-2 sm:ml-2">
              <span className="w-2 h-2 rounded-full bg-green-bright inline-block sm:mr-2" />
              <B3 style={{ lineHeight: '98%' }} weight="font-medium" color="text-white">
                ${numberWithCommas(cashback)} Cash Back
              </B3>
            </p>
          </div>

          <div
            className="mx-3 flex-col my-auto justify-around truncate w-full md:w-auto"
            onClick={(e) => {
              e.preventDefault();
              const url = getBuildingURL(property);
              storeSearchQuery(property.nanoId);
              if (mobile) {
                router.push(url);
              } else {
                openURLInNewTab(url);
              }
            }}>
            <p className="absolute md:hidden rounded bg-gray-dark text-white flex items-center top-0 left-0 sm:w-auto w-32 px-2 mt-2 ml-2 pt-2 pb-2">
              <span className="w-2 h-2 rounded-full bg-green-bright inline-block mr-2" />
              <B3 style={{ lineHeight: '98%' }} weight="font-medium" color="text-white">
                ${numberWithCommas(cashback)} Cash Back
              </B3>
            </p>

            <div className="justify-around">
              <H5
                style={{
                  width: '85%',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  display: 'block',
                  fontSize: 18,
                  fontWeight: 500,
                }}>
                {name}
              </H5>
              <B2 className="block md:hidden">{price}</B2>
              <H4 className="hidden md:block">{price}</H4>
            </div>
            <B2
              className="mt-2 md:mt-4 md:w-full w-30 pr-2"
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: 'block',
                width: '100%',
              }}>
              <span className="text-green-bright hidden md:inline-block">
                <MapMarkerIcon />
              </span>
              <span className="text-gray-900 font-book">
                {address}, {city}, {state} {zip}
              </span>
            </B2>
            <B2 className="hidden md:block md:mt-1">
              <span className="text-green-bright">
                <BedIcon />
              </span>
              <span className="text-gray-900 font-book">{bedRange(minBedroom, maxBedroom)}</span>
            </B2>
          </div>
        </div>
      </>
    );
  }
);

function handleDragStart(e: any) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

export default PropertyCard;
