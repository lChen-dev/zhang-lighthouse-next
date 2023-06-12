import React from 'react';
import classNames from 'classnames';

import { PropertyMarker } from '@models/Property';
import { getCashback } from '@utils/format';

const MARKER_LOW_LIMIT = 100;
const MARKER_MEDIUM_LIMIT = 500;

interface SmallMapCardProps {
  property: PropertyMarker;
  price: string;
  className?: string;
  style?: React.CSSProperties;
  onMarkerClick?: (propertyId: string | null) => void;
  isDark?: boolean;
}

const SmallMapCard: React.FC<SmallMapCardProps> = ({
  onMarkerClick,
  property,
  price,
  className,
  style,
  isDark = false,
}: SmallMapCardProps) => (
  <div
    className={classNames(`h-16 px-3 py-2 bg-white rounded-sm card-shadow flex`, className)}
    style={style}
    onClick={(e: any) => {
      e.preventDefault();
      e.stopPropagation();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onMarkerClick && onMarkerClick(property.id);
    }}
  >
    <div className="flex flex-grow flex-col justify-around w-full h-full pr-4" style={{ maxWidth: 180 }}>
      <h3 className="text-14px text-gray-600 circular truncate text-color font-medium">{property.name}</h3>
      <p className="text-20px circular text-gray-900 font-medium" style={{ width: 160 }}>
        {price}
      </p>
    </div>
    <div
      className="w-1 h-full flex-grow-0"
      style={{ background: getMarkerColor(property.cashback, isDark), right: '10px', top: '0' }}
    >
      <div
        className="w-1 bg-gray-400"
        style={{
          height: getCashbackBarHeight(property.cashback),
          opacity: 0.5,
          background: '#fff',
        }}
      />
    </div>
    <div className="arrow-down absolute" style={{ bottom: '-11px', right: 'calc(50% - 20px)' }} />
    <div className="arrow-down-shadow absolute" style={{ bottom: '-13px', right: 'calc(50% - 22px)' }} />
  </div>
);

export default SmallMapCard;

export function getMarkerColor(cashback: number, isDark: boolean = false): string {
  let markerColor = isDark ? '#40C374' : '#1B6144';
  if (cashback < MARKER_LOW_LIMIT) {
    markerColor = isDark ? '#4E745B' : '#98ADA4';
  } else if (cashback < MARKER_MEDIUM_LIMIT) {
    markerColor = '#34966D';
  }
  return markerColor;
}

function getCashbackBarHeight(cashback: number): string {
  return `${100 - Math.min(Math.max(30, (getCashback(cashback) / 1000) * 100), 100)}%`;
}
