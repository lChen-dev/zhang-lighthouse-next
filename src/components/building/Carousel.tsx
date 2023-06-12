import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useWindowWidth } from '@react-hook/window-size';

import { Property } from '@models/Property';
import PhotoViewer from '@components/building/PhotoViewer';
import { ZoomIcon } from '@components/shared/Icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

interface Props {
  property?: Property;
}

const Carousel: React.FC<Props> = ({ property }: Props) => {
  const width = useWindowWidth();
  const [showViewer, setShowViewer] = useState<number | null>(null);
  const propertyCover = getPropertyCover(property);

  const largeScreenItems = [
    <div className="h-64 lg:h-96 grid grid-cols-2 gap-4">
      <div className="grid-span-1">
        {propertyCover ? (
          <div className="relative photo-wrapper" onClick={() => setShowViewer(0)}>
            <img src={propertyCover} className="h-64 lg:h-96 object-cover rounded-lg w-full cursor-pointer" />
            <div className="flex justify-center items-center text-color bg-white view-wrapper">
              <ZoomIcon />
              <span className="pl-2 font-circular font-medium text-14px">See photo</span>
            </div>
          </div>
        ) : (
          <Skeleton height={384} />
        )}
      </div>
      <div className="h-64 lg:h-96 grid-span-1 grid grid-cols-3 grid-rows-2 gap-4">
        {property ? (
          property.propertyPhotos.slice(1, 7).map((photo, index) => (
            <div className="row-span-1 relative photo-wrapper" key={photo.id} onClick={() => setShowViewer(index + 1)}>
              <img src={photo.url} className="rounded-lg object-cover w-full h-full cursor-pointer" />
              <div className="flex justify-center items-center text-color bg-white view-wrapper">
                <ZoomIcon />
                <span className="pl-2 font-circular font-medium text-14px">See photo</span>
              </div>
            </div>
          ))
        ) : (
          <Skeleton height={384} />
        )}
      </div>
    </div>,
    <div className="h-64 lg:h-96 grid-span-1 grid grid-cols-6 grid-rows-2 gap-4">
      {property ? (
        property.propertyPhotos.slice(7, 16).map((photo, index) => (
          <div className="row-span-1 relative photo-wrapper" key={photo.id} onClick={() => setShowViewer(index + 7)}>
            <img src={photo.url} className="rounded-lg object-cover w-full h-full cursor-pointer" />
            <div className="flex justify-center items-center text-color bg-white view-wrapper">
              <ZoomIcon />
              <span className="pl-2 font-circular font-medium text-14px">See photo</span>
            </div>
          </div>
        ))
      ) : (
        <Skeleton height={384} />
      )}
    </div>,
  ];

  const smallScreenItems = property
    ? property.propertyPhotos.map((photo, index) => (
        <div className="w-full h-96" key={photo.id}>
          <img src={photo.url} className="rounded-lg object-cover w-full h-full" onClick={() => setShowViewer(index)} />
        </div>
      ))
    : [<Skeleton height={384} />];

  return (
    <>
      <Swiper spaceBetween={50} slidesPerView={1} navigation={true}>
        {width >= 768
          ? largeScreenItems.map((item, key) => <SwiperSlide key={key}>{item}</SwiperSlide>)
          : smallScreenItems.map((item, key) => <SwiperSlide key={key}>{item}</SwiperSlide>)}
      </Swiper>
      {showViewer !== null && property && (
        <PhotoViewer property={property} startIndex={showViewer} onClose={() => setShowViewer(null)} />
      )}
    </>
  );
};

Carousel.defaultProps = { property: undefined };

export default Carousel;

function getPropertyCover(property?: Property): string | undefined {
  const images = property?.propertyPhotos;
  if (Array.isArray(images) && images.length > 0) {
    return images[0].url;
  }
  return undefined;
}
