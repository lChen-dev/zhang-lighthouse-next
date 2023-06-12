/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import { PropertyMarker } from '@models/Property';
import { formatPriceRange } from '@utils/format';
import useHover from '@react-hook/hover';
import { getMaxRent, getMinRent } from '@utils/property-helpers';
import MapCard, { Position } from '@components/map/MapCard';
import SmallMapCard, { getMarkerColor } from '@components/map/SmallMapCard';

import './marker.css';
import { getBuildingURL, storeSearchQuery } from '@utils/building-helper';

export interface MarkerProps {
  property: PropertyMarker;
  lat: number;
  lng: number;
  selected?: boolean;
  $hover?: any;
  cardBounds: { ne: { lat: number; lng: number }; sw: { lat: number; lng: number } };
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
  zoom: number;
  onMarkerClick?: (propertyId: string | null) => void;
  isDark: boolean;
  blockNavigation?: boolean;
}

const Marker = ({
  property,
  lat,
  lng,
  selected,
  $hover, // this is passed in by google-map-react. see: https://github.com/google-map-react/old-examples/blob/master/web/flux/components/examples/x_simple_hover/my_great_place_with_hover.jsx
  cardBounds,
  zoom,
  onMarkerClick,
  isDark,
  blockNavigation,
}: MarkerProps) => {
  const router = useRouter();
  const hoverTarget = useRef(null);
  const internalHover = useHover(hoverTarget, { enterDelay: 0, leaveDelay: 0 });
  const highlighted = selected || internalHover;

  const { floorplan, cashback } = property;
  const minRent = useMemo(() => getMinRent(floorplan) || property.minRent, [floorplan, property.minRent]);
  const maxRent = useMemo(() => getMaxRent(floorplan), [floorplan]);
  const price = formatPriceRange(minRent, maxRent);

  const [width, setWidth] = useState(710);
  useEffect(() => {
    setWidth(window.outerWidth);
  }, [width]);

  const markerColor = getMarkerColor(cashback, isDark);

  let position = Position.ABOVE;
  if (cardBounds.ne.lat < lat) position = Position.BELOW;
  // const showLeft = cardBounds.ne.lng < lng;
  // const showRight = cardBounds.sw.lng > lng;

  if ((width >= 768 && zoom > 14) || (width < 768 && zoom > 15)) {
    return (
      <div
        className="absolute flex items-start justify-center cursor-pointer"
        ref={hoverTarget}
        style={{ top: '-4rem', left: '-80px', zIndex: highlighted ? 150 : 100 }}
      >
        {selected ? (
          <MapCard
            property={property}
            price={price}
            highlighted={highlighted}
            style={{ left: '-2.8rem', bottom: '-4.9rem' }}
            position={position}
          />
        ) : (
          <SmallMapCard property={property} price={price} onMarkerClick={onMarkerClick} className="relative" />
        )}
      </div>
    );
  }

  return (
    <div
      className="absolute flex items-start justify-center cursor-pointer"
      style={{ top: '-12.5px', left: '-13.5px' }}
    >
      {highlighted && !selected && (
        <SmallMapCard
          property={property}
          price={price}
          onMarkerClick={onMarkerClick}
          className="absolute"
          style={{ top: '-5rem', zIndex: 100 }}
          isDark={isDark}
        />
      )}
      {renderMarkerDot(hoverTarget, markerColor, selected)}
      {selected &&
        (isMobile ? (
          <SmallMapCard
            property={property}
            price={price}
            isDark={isDark}
            className="absolute"
            style={{ top: '-5rem', zIndex: highlighted ? 300 : 30 }}
            onMarkerClick={() => {
              storeSearchQuery(property.nanoId);
              if (!blockNavigation) router.push(getBuildingURL(property));
            }}
          />
        ) : (
          <MapCard
            blockNavigation={blockNavigation || false}
            property={property}
            price={price}
            highlighted={highlighted}
            position={position}
          />
        ))}
    </div>
  );
};

function renderMarkerDot(hoverTarget: React.Ref<HTMLDivElement>, markerColor: string, selected?: boolean): JSX.Element {
  return (
    <div className="allMarkerContainer" ref={hoverTarget} style={{ zIndex: selected ? -1 : 10 }}>
      <div className="rounded-full markerContainer" style={{ background: markerColor }} />
      <svg
        style={{ position: 'relative', margin: '0px auto' }}
        width="11"
        height="5"
        viewBox="0 0 11 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="5.35547" cy="2.5" rx="5" ry="2.5" fill="#2A343A" fillOpacity="0.15" />
      </svg>
    </div>
  );
}

export default Marker;
