import { MapLoaderIcon } from '@components/shared/Icons';
import { useWindowWidth } from '@react-hook/window-size';
import React, { FC } from 'react';

const MapLoader: FC<{ showMapLoader: boolean; mobileCardsActive: boolean }> = ({
  showMapLoader,
  mobileCardsActive,
}) => {
  const width = useWindowWidth();

  return (
    <div
      className={`map-loader ${mobileCardsActive && 'replaced'}`}
      style={{ display: showMapLoader ? 'flex' : 'none' }}
    >
      <MapLoaderIcon size={width < 1270 ? 24 : 32} />
    </div>
  );
};

export default MapLoader;
