import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';

import { Property } from '@models/Property';
import { B1, H6 } from '@components/shared/Typography';

import 'react-alice-carousel/lib/alice-carousel.css';
import FavoriteButton from '@components/shared/property/FavoriteButton';
import { ZoomIcon } from '@components/shared/Icons';

interface Props {
  property: Property;
  onClose: () => void;
  startIndex?: number;
}

const PhotoViewer: React.FC<Props> = ({ property, startIndex, onClose }: Props) => {
  const [index, setIndex] = useState(startIndex ?? 0);
  const [showAll, setShowAll] = useState(false);

  const items = property.propertyPhotos.map((photo) => (
    <div className="w-full h-full flex flex-row justify-center" style={{ maxHeight: '728px' }}>
      <img src={photo.url} style={{ maxWidth: '1200px' }} className="rounded object-cover w-full h-full" />
    </div>
  ));

  const slideNext = () => {
    setIndex(index + 1);
  };

  const slidePrev = () => {
    setIndex(index - 1);
  };

  const numPhotos = property.propertyPhotos.length;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto" style={{ zIndex: 200 }}>
      <div className="flex flex-row p-5 justify-between items-start mb-8 fixed top-0 w-full z-50">
        {showAll ? (
          <div />
        ) : (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="bg-offwhite py-3 px-6 md:px-16 hover:bg-gray-lighter cursor-pointer rounded font-circular"
            style={{ height: 48 }}
          >
            <H6>See all photos</H6>
          </button>
        )}
        <div className="flex flex-row items-center bg-offwhite py-3 px-4 rounded">
          <FavoriteButton property={property} />

          {/* Close Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer ml-4"
            onClick={onClose}
          >
            <path d="M23 1L1 23M1 1L23 23" stroke="#2A343A" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {showAll ? (
        <div className="flex flex-row justify-center show-all-gallery">
          <div className="flex flex-col md:flex-row mt-32" style={{ maxWidth: '1200px' }}>
            <div className="w-full md:w-1/2 px-2">
              {property.propertyPhotos.slice(0, Math.ceil(numPhotos / 2)).map((photo, idx) => (
                <div
                  className="row-span-1 relative photo-wrapper"
                  key={photo.id}
                  onClick={() => {
                    setIndex(idx);
                    setShowAll(false);
                  }}
                >
                  <img src={photo.url} className="rounded object-cover cursor-pointer h-auto w-full mb-4" />
                  <div className="flex justify-center items-center text-color bg-white view-wrapper">
                    <ZoomIcon />
                    <span className="pl-2 font-circular font-medium text-14px">See photo</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/2 px-2">
              {property.propertyPhotos.slice(Math.ceil(numPhotos / 2)).map((photo, idx) => (
                <div
                  className="row-span-1 relative photo-wrapper"
                  key={photo.id}
                  onClick={() => {
                    setIndex(idx + Math.ceil(numPhotos / 2));
                    setShowAll(false);
                  }}
                >
                  <img src={photo.url} className="rounded object-cover cursor-pointer h-auto w-full mb-4" />
                  <div className="flex justify-center items-center text-color bg-white view-wrapper">
                    <ZoomIcon />
                    <span className="pl-2 font-circular font-medium text-14px">See photo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '18vh' }} className="view-all-gallery">
          <AliceCarousel
            autoWidth
            items={items}
            activeIndex={index}
            mouseTracking
            responsive={{
              0: {
                items: 1,
              },
            }}
            onSlideChanged={(e) => setIndex(e.item)}
            renderNextButton={({ isDisabled }) =>
              !isDisabled && (
                <div
                  onClick={slideNext}
                  className="absolute w-8 h-32 bg-offwhite hover:bg-gray-lighter rounded flex align-center items-center cursor-pointer"
                  style={{ top: 'calc(50% - 4rem)', right: '1rem' }}
                >
                  <svg
                    className="ml-2"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.48486 2.24966L10.8485 8.99966L6.48486 15.7497"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )
            }
            renderPrevButton={({ isDisabled }) =>
              !isDisabled && (
                <div
                  onClick={slidePrev}
                  className="absolute w-8 h-32 bg-offwhite hover:bg-gray-lighter rounded flex align-center items-center cursor-pointer"
                  style={{ top: 'calc(50% - 4rem)', left: '1rem' }}
                >
                  <svg
                    className="ml-2"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.51514 15.7503L5.1515 9.0003L9.51514 2.2503"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )
            }
          />

          <B1 color="text-gray-soft" className="w-full text-center">
            <span className="text-gray-blue">{index + 1}</span>/{numPhotos}
          </B1>
        </div>
      )}
    </div>
  );
};

PhotoViewer.defaultProps = {
  startIndex: 0,
};

export default PhotoViewer;
