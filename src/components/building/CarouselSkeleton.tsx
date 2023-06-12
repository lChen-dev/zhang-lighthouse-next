import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

const CarouselSkeleton: FC = () => (
  <div className="block md:grid grid-cols-2 gap-2 pb-4 ">
    <Skeleton className="w-full md:h-full" style={{ minHeight: 300, borderRadius: 8 }} />
    <div className="hidden md:grid grid grid-cols-3 gap-2">
      <Skeleton height={195} style={{ borderRadius: 8 }} />
      <Skeleton height={195} style={{ borderRadius: 8 }} />
      <Skeleton height={195} style={{ borderRadius: 8 }} />
      <Skeleton height={195} style={{ borderRadius: 8 }} />
      <Skeleton height={195} style={{ borderRadius: 8 }} />
      <Skeleton height={195} style={{ borderRadius: 8 }} />
    </div>
  </div>
);

export default CarouselSkeleton;
