/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState, useRef } from 'react';
import GoogleMapReact, { fitBounds } from 'google-map-react';
import dynamic from 'next/dynamic';

import { getPaddedBounds } from '@hooks/search';
import { PropertyMarker } from '@models/Property';
import { DrawIcon, Plus, LeftArrowIcon, CloseIcon, TrashIcon, CheckIconSVG } from '@components/shared/Icons';

import { use100vh } from 'react-div-100vh';
import { useRouter } from 'next/router';
import { useJsApiLoader } from '@react-google-maps/api';
import Marker from './Marker';
import { useWindowWidth } from '@react-hook/window-size';
import CollegeMarker from '@components/schools/components/SpecificSchool/Buildings/CollegeMarker';
import PlaceMarker from '@components/building/PlaceMarker';
import { sendTrack } from '@utils/analytics';

const KonvaWrapper = dynamic(() => import('./KonvaWrapper'), { ssr: false });

const GOOGLE_MAPS_LIBRARIES: ['places', 'geometry', 'drawing'] = ['places', 'geometry', 'drawing']; // useJsApiLoader requires this to be immutable
export const GOOGLE_API_LOADER_OPTIONS: any = {
  id: '__googleMapsScriptId',
  libraries: GOOGLE_MAPS_LIBRARIES,
  version: 'weekly',
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
};

export interface Props {
  zoomReset?: boolean;
  setMapZoomReset?: any;
  markers: PropertyMarker[];
  selectedId?: string | null;
  onChange: any;
  onClick: any;
  onMarkerClick: (propertyId: string | null) => void;
  onMarkerMouseEnter: (id: string) => void;
  onMarkerMouseLeave: (id: string) => void;
  bounds: {
    ne: { lat: number; lng: number };
    sw: { lat: number; lng: number };
  };
  height?: number | null | undefined;
  width?: number | null | undefined;
  query?: any;
  search?: any;
  isDark?: boolean;
  onBoardingVersion?: boolean;
  collegeCoordinates?: number[] | null;
  nearByMarkers?: any[];
  setShowInquiry?: (show: boolean) => boolean;
  stepId?: string;
  polygonPaths?: {}[];
  onGoogleApiLoaded?: (map: any) => void;
  confirmDrawing?: (e: any) => void;
  zoom?:number;
}

let zoomSet = false;
const MapContainer: React.FC<Props> = ({
  zoomReset,
  setMapZoomReset,
  markers,
  selectedId,
  onChange,
  onClick,
  onMarkerClick,
  onMarkerMouseEnter,
  onMarkerMouseLeave,
  bounds,
  isDark = false,
  onBoardingVersion,
  collegeCoordinates,
  setShowInquiry,
  nearByMarkers,
  stepId,
  onGoogleApiLoaded,
  polygonPaths = [],
  confirmDrawing,
  zoom
}: Props) => {
  const {
    query: { lat, lng },
  } = useRouter();

  const { isLoaded } = useJsApiLoader(GOOGLE_API_LOADER_OPTIONS);
  const viewWidth = useWindowWidth();
  const [dimension, setDimension] = useState<any>({ height: null, width: null });
  const [google, setGoogle] = useState<any>({});
  const [drawingEnabled, setDrawingEnabled] = useState<boolean>(false);
  const [line, setLine] = useState<number[]>([]);
  const [latLngs, setLatLngs] = useState<{}[]>(polygonPaths);
  const [polygon, setPolygon] = useState<any>(null);
  const [filteredMarkers, setFilteredMarkers] = useState<PropertyMarker[]>(markers);
  const [shouldUpdateMarkers, setShouldUpdateMarkers] = useState<boolean>(true);

  const isDrawing = useRef<boolean>(false);

  useEffect(() => {
    if (shouldUpdateMarkers) setFilteredMarkers(markers);
  }, [markers]);

  useEffect(() => {
    const width = window.outerWidth;
    const height = window.outerHeight;
    setDimension({ width, height });
    if (polygonPaths?.length) createPolygon(polygonPaths);
  }, []);
  const size = {
    width: 312, // Map width in pixels
    height: dimension.height ?? 716, // Map height in pixels
  };

  const mapProps = {
    d: { width: '100%', height: '100vh' },
  };

  const height = use100vh();
  const handleApiLoaded = (map: any) => {
    setGoogle(map);
  };

  const enableDrawing = () => {
    setDrawingEnabled(true);
  };

  const deleteDrawing = () => {
    polygon.setMap(null);
    setPolygon(null);
    setLatLngs([]);
    setLine([]);
    setFilteredMarkers(markers);
    setShouldUpdateMarkers(true);
    sendTrack('User deleted drawing',polygon)
  };

  const cancelDrawing = () => {
    setDrawingEnabled(false);
  };

  const onMouseDown = (e: any) => {
    isDrawing.current = true;
    let pos = e.target.getStage().getPointerPosition();
    let { lat, lng } = point2LatLng({ x: pos.x, y: pos.y }, google);
    setLatLngs([new google.maps.LatLng(lat, lng)]);
    setLine([pos.x, pos.y]);
  };

  const onMouseMove = (e: any) => {
    if (!isDrawing.current) return;

    let stage = e.target.getStage();
    let point = stage.getPointerPosition();
    setLine(line.concat([point.x, point.y]));

    let { lat, lng } = point2LatLng(point, google);
    setLatLngs(latLngs.concat([new google.maps.LatLng(lat, lng)]));
  };

  const onMouseUp = (e: any) => {
    isDrawing.current = false;
    let paths = latLngs.filter((l, i) => i % 5 === 0);
    createPolygon(paths);
    setDrawingEnabled(false);
  };

  const createPolygon = (paths: {}[]) => {

    let polygon = new google.maps.Polygon({
      paths: paths,
      strokeColor: '#34966D',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#34966D',
      fillOpacity: 0.1,
    });
    polygon.setMap(google.map);

    let filtered = markers.filter((m) => {
      let latLng = new google.maps.LatLng(m.coordinates.coordinates[1], m.coordinates.coordinates[0]);
      return google.maps.geometry.poly.containsLocation(latLng, polygon);
    });

    setLatLngs(paths);
    setPolygon(polygon);
    setFilteredMarkers(filtered);
    setShouldUpdateMarkers(false);
    sendTrack('User drew on map',polygon)
  };

  const paddedBounds = useMemo(() => {
    if (!bounds || !dimension.height) {
      return {
        ne: bounds.ne,
        sw: bounds.sw,
      };
    }

    return getPaddedBounds({
      ne: bounds.ne,
      sw: bounds.sw,
      width: dimension.width,
      height: dimension.height,
      topPadding: 550,
      leftPadding: 175,
      rightPadding: 175,
      bottomPadding: 50,
    });
  }, [bounds, dimension]);

  if (!isLoaded || !height) return <div className="h-screen z-50" style={mapProps.d} />;
  let center: any;
  if (bounds && bounds.ne.lng && bounds.ne.lat && bounds.sw.lng && bounds.ne.lat) {
    try {
      if (zoomReset) {
        google.map.setZoom(14);
        setTimeout(() => {
          setMapZoomReset(false);
        }, 1000);
      }
      const tempBound = fitBounds(bounds, size);
      center = tempBound.center;

      if (!zoomReset) {
        zoom = tempBound.zoom + 2;
        if (!document.referrer && !zoomSet) {
          zoomSet = true;
        }
      }
    } catch (e) {
      //
    }
  }

  return (
    <div style={{ ...mapProps.d, height }}>
      <GoogleMapReact
        options={() => ({
          mapTypeControl: false,
          disableDefaultUI: true,
          zoomControl: false,
          scaleControl: false,
          rotateControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoom,
          clickableIcons: false,
          mapId: isDark ? 'ecef9dad9512211e' : 'f1eef99afc945d6',
          clickableLabels: false,
        })}
        yesIWantToUseGoogleMapApiInternals
        defaultZoom={zoom || 14}
        center={lat && lng ? { lat: parseFloat(lat as string), lng: parseFloat(lng as string) } : center}
        onChange={onChange}
        onClick={onClick}
        onChildClick={(hover, marker) => {
          if (hover) onMarkerClick(marker.property.id);
        }}
        
        hoverDistance={zoom && zoom > 13 ? 80 : 20}
        onGoogleApiLoaded={(google: any) => handleApiLoaded(google)}
        googleMapLoader={() => Promise.resolve(window?.google?.maps)}
        resetBoundsOnResize
      >
        {(filteredMarkers || []).map((marker, k) => (
          <Marker
            {...(onBoardingVersion ? { blockNavigation: true } : {})}
            key={k}
            isDark={isDark}
            onMarkerClick={onMarkerClick}
            lat={marker.coordinates.coordinates[1]}
            lng={marker.coordinates.coordinates[0]}
            zoom={zoom as any}
            selected={!!selectedId && marker.id === selectedId}
            cardBounds={paddedBounds}
            onMouseEnter={onMarkerMouseEnter}
            onMouseLeave={onMarkerMouseLeave}
            property={marker}
          />
        ))}
        {nearByMarkers?.map((marker: any) => (
          <PlaceMarker
            marker={marker}
            type={marker.type}
            lat={marker.geometry?.location.lat()}
            lng={marker.geometry?.location.lng()}
            name={marker.name}
            formatted_address={marker.formatted_address}
          />
        ))}
        {collegeCoordinates && collegeCoordinates.length > 0 && (
          <CollegeMarker lat={collegeCoordinates[1]} lng={collegeCoordinates[0]} />
        )}
      </GoogleMapReact>
      {onBoardingVersion && (
        <>
          {drawingEnabled && (
            <div className="absolute w-full top-0 left-0" style={{ cursor: 'crosshair' }}>
              <KonvaWrapper
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                line={line}
              />
            </div>
          )}
          <div
            className="flex justify-center "
            style={{
              width: '100%',
              height: 125,
              position: 'absolute',
              bottom: 0,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: viewWidth > 639 ? 459 : 20,
              paddingTop: 20,
              margin: 'auto',
            }}
          >
            {viewWidth > 639 ? (
              <div
                className="bg-white h-full w-full rounded py-4 px-6 flex items-center justify-between"
                style={{ maxWidth: 665, boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="w-full flex items-center">
                  <DrawIcon />
                  <div className="ml-5">
                    <div className="text-base md:text-xl font-bold">
                      {drawingEnabled ? "You're in drawing mode" : 'Draw your location'}
                    </div>
                    {viewWidth > 1150 && (
                      <div>
                        {drawingEnabled
                          ? 'You can continue setup or delete your region'
                          : 'Give some specifications for searching process.'}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-auto flex justify-end">
                  {drawingEnabled ? (
                    isDrawing.current ? (
                      <div className="w-40 h-15 flex justify-center items-center text-clay font-bold">Drawing...</div>
                    ) : (
                      <button
                        onClick={cancelDrawing}
                        type="button"
                        className="w-40 h-15 flex outline-none focus:outline-none rounded justify-center items-center bg-red text-white border-white"
                      >
                        <span className="font-bold text-lg text-white" style={{ marginTop: 4 }}>
                          Cancel
                        </span>
                      </button>
                    )
                  ) : polygon ? (
                    <button
                      onClick={deleteDrawing}
                      type="button"
                      className="w-40 h-15 flex outline-none focus:outline-none rounded justify-center items-center bg-red text-white border-white"
                    >
                      <span className="font-bold text-lg text-white" style={{ marginTop: 4 }}>
                        {' '}
                        Delete region
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={enableDrawing}
                      type="button"
                      className="w-40 h-15 flex outline-none focus:outline-none rounded justify-center items-center bg-brand text-white border-white"
                    >
                      <Plus opacity={1} width={14} height={14} />
                      <span className="font-bold text-lg text-white" style={{ marginTop: 4, marginLeft: 10 }}>
                        {' '}
                        New region
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ) : viewWidth <= 639 && (drawingEnabled || polygon) ? (
              <div
                className="bg-white h-full w-full rounded py-4 px-6 flex items-center justify-between"
                style={{ maxWidth: 665, boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="w-full flex items-center">
                  <DrawIcon />
                  <div className="ml-5 text-base md:text-xl font-bold">You're in drawing mode</div>
                </div>
                <div className="w-auto flex justify-end">
                  {polygon ? (
                    <>
                      <div className="p-1" onClick={deleteDrawing}>
                        <TrashIcon />
                      </div>
                      <div
                        className="pl-2 pt-1"
                        onClick={(e) => {
                          confirmDrawing?.(e);

                          cancelDrawing();
                        }}
                      >
                        <CheckIconSVG />
                      </div>
                    </>
                  ) : (
                    <div className="p-1" onClick={cancelDrawing}>
                      <CloseIcon />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div onClick={enableDrawing} className="relative" style={{ width: 100, height: 100, bottom: 60 }}>
                <div
                  className="absolute bg-brand"
                  style={{ width: 100, height: 100, borderRadius: '50%', opacity: 0.2 }}
                />
                <div
                  className="absolute top-0 bottom-0 left-0 right-0 m-auto flex justify-center items-center bg-brand text-white"
                  style={{ width: 70, height: 70, borderRadius: '50%' }}
                >
                  <DrawIcon />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default MapContainer;

function point2LatLng(point: { x: number; y: number }, google: any) {
  var topRight = google.map.getProjection().fromLatLngToPoint(google.map.getBounds().getNorthEast());
  var bottomLeft = google.map.getProjection().fromLatLngToPoint(google.map.getBounds().getSouthWest());
  var scale = Math.pow(2, google.map.getZoom());
  var worldPoint = new google.maps.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y);
  let coords = google.map.getProjection().fromPointToLatLng(worldPoint);
  return { lat: coords.lat(), lng: coords.lng() };
}
