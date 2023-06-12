import { NearbyMapCard } from './NearbyMapCard';
import { NearbyResult } from '@hooks/nearby';
import {
  BankIcon,
  CoffeeIcon,
  GroceryIcon,
  GymIcon,
  RestaurantIcon,
  SchoolIcon,
  ShopIcon,
} from '@components/shared/Icons';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';

export interface MarkerProps {
  marker: NearbyResult;
  lat?: number;
  lng?: number;
  name: string;
  formatted_address?: string;
  $hover?: boolean;
}

const PlaceMarkerIconMap: Record<string, ReactNode> = {
  restaurant: <RestaurantIcon />,
  school: <SchoolIcon />,
  supermarket: <GroceryIcon />,
  cafe: <CoffeeIcon />,
  bank: <BankIcon />,
  gym: <GymIcon />,
  shop: <ShopIcon />,
};

export default function PlaceMarker({
  marker,
  type,
  $hover,
}: {
  marker: NearbyResult;
  type: string;
  lat?: number;
  lng?: number;
  name: string;
  formatted_address?: string;
  $hover?: boolean;
}) {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const width = useWindowWidth();

  const node = useRef<HTMLDivElement>(null);
  const mainNode = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (mainNode?.current?.contains(e.target as Node) || node?.current?.contains(e.target as Node)) {
      // inside click
      return;
    }
    setCurrentId(null);
  };

  useEffect(() => {
    if (!!currentId) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [currentId]);

  return (
    <div ref={mainNode}>
      {((currentId === marker.place_id && width > 768) || ($hover && width <= 768)) && (
        <NearbyMapCard
          ref={node}
          image={getImage(marker)}
          name={marker.name}
          description={marker.type}
          rating={marker.rating}
          features={marker.types}
        />
      )}

      <div
        onClick={() => {
          setCurrentId(marker.place_id ?? null);
        }}
        className="marker-box flex flex-col justify-center items-center absolute"
      >
        <div className="bg-white flex justify-center relative items-center marker-circle">
          {PlaceMarkerIconMap[type] ?? PlaceMarkerIconMap.shop}
        </div>

        <svg
          className="marker-line relative"
          width="2"
          height="20"
          viewBox="0 0 2 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1.33337L1 18.3334" stroke="#828E95" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1 1.33337L1 18.3334" stroke="#828E95" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <svg
          className="bottom-circle relative"
          width="20"
          height="10"
          viewBox="0 0 20 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="9.99999" cy="5.16668" rx="9.44444" ry="4.72222" fill="#2A343A" fillOpacity="0.15" />
        </svg>
      </div>
    </div>
  );
}

const getImage = (marker: NearbyResult): string => {
  const [first] = marker.photos || [];
  if (first) {
    return first.getUrl({
      maxWidth: 240,
      maxHeight: 240,
    });
  }
  return '';
};
function SetStateAction<T>(arg0: null) {
  throw new Error('Function not implemented.');
}
