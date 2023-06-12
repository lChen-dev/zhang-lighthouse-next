import useNearby from '@hooks/nearby';
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_API_LOADER_OPTIONS } from '@components/map/MapContainer';
import { swapCoordinates } from '@utils/helpers';
import PlaceMarker from './PlaceMarker';

const PropertyMarker = (props: any) => (
  <div style={{ width: '30px', height: '40px', transform: 'translate(-50%, -50%)' }}>
    <div style={{ position: 'relative', top: '-20px' }}>
      <svg width="30" height="41" viewBox="0 0 30 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="15" cy="36.9998" rx="6.66667" ry="3.33333" fill="#2A343A" fillOpacity="0.15" />
        <path d="M15 23V35" stroke="#828E95" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 23V35" stroke="#828E95" strokeWidth="1.5" strokeLinecap="round" />
        <g filter="url(#filter0_d)">
          <circle cx="15" cy="15" r="12" fill="white" />
        </g>
        <circle cx="15" cy="14.9999" r="9.6" fill="#34966D" />
        <defs>
          <filter
            id="filter0_d"
            x="0"
            y="0"
            width="30"
            height="30"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1.5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.164706 0 0 0 0 0.203922 0 0 0 0 0.227451 0 0 0 0.9 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  </div>
);

const createMapOptions = () => ({
  mapTypeControl: false,
  disableDefaultUI: true,
  zoomControl: false,
  scaleControl: false,
  rotateControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  zoom: 10,
  clickableIcons: false,
  mapId: 'f1eef99afc945d6',
  clickableLabels: false,
});
type NearbyMapProps = {
  filters: { [key: string]: boolean };
  lat: number;
  lng: number;
};

export default function NearbyMap({ filters, lat: _lat, lng: _lng }: NearbyMapProps) {
  const [map, setMap] = useState<any>();
  const { isLoaded } = useJsApiLoader(GOOGLE_API_LOADER_OPTIONS);
  const { lat, lng } = swapCoordinates(_lat, _lng);

  const [markers, setMarkers] = useState<any[]>([]);
  const [firstCall, setFirstCall] = useState(true);
  const [calledFilters, setCalledFilters] = useState<string[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [coffee, setCoffee] = useState<any[]>([]);
  const [groceries, setGroceries] = useState<any[]>([]);
  const [banks, setBanks] = useState<any[]>([]);
  const [gyms, setGyms] = useState<any[]>([]);
  useEffect(() => {
    const tempMarkers = (filters.school ? schools : [])
      ?.concat(filters.restaurant ? restaurants : [])
      .concat(filters.supermarket ? groceries : [])
      .concat(filters.cafe ? coffee : [])
      .concat(filters.bank ? banks : [])
      .concat(filters.gym ? gyms : []);
    setMarkers(tempMarkers as any);
  }, [schools, restaurants, groceries, coffee, banks, gyms, filters]);
  useEffect(() => {
    (async () => {
      if (!firstCall && isLoaded) {
        if (!calledFilters.includes('school') && filters.school) {
          setCalledFilters([...calledFilters, 'school']);
          await setSchools(await useNearby('school', map, lat, lng, isLoaded));
        }
        if (!calledFilters.includes('restaurant') && filters.restaurant) {
          setCalledFilters([...calledFilters, 'restaurant']);
          await setRestaurants(await useNearby('restaurant', map, lat, lng, isLoaded));
        }
        if (!calledFilters.includes('supermarket') && filters.supermarket) {
          setCalledFilters([...calledFilters, 'supermarket']);
          await setGroceries(await useNearby('supermarket', map, lat, lng, isLoaded));
        }
        if (!calledFilters.includes('cafe') && filters.cafe) {
          setCalledFilters([...calledFilters, 'cafe']);
          await setCoffee(await useNearby('cafe', map, lat, lng, isLoaded));
        }
        if (!calledFilters.includes('bank') && filters.bank) {
          setCalledFilters([...calledFilters, 'bank']);
          await setBanks(await useNearby('bank', map, lat, lng, isLoaded));
        }
        if (!calledFilters.includes('gym') && filters.gym) {
          setCalledFilters([...calledFilters, 'gym']);
          await setGyms(await useNearby('gym', map, lat, lng, isLoaded));
        }
      } else {
        setFirstCall(false);
      }
    })();
  }, [filters]);

  if (!isLoaded) return <div className="h-screen z-50" />;

  return (
    <div className="h-full">
      <GoogleMapReact
        options={createMapOptions}
        yesIWantToUseGoogleMapApiInternals={false}
        defaultZoom={17}
        defaultCenter={{ lat, lng }}
        hoverDistance={25}
        googleMapLoader={() => Promise.resolve(window?.google?.maps)}
        onGoogleApiLoaded={({ map: theMap }) => setMap(theMap)}
        resetBoundsOnResize>
        <PropertyMarker lat={lat} lng={lng} />
        {markers?.map((marker) => (
          <PlaceMarker
            marker={marker}
            type={marker.type}
            lat={marker.geometry?.location.lat()}
            lng={marker.geometry?.location.lng()}
            name={marker.name}
            formatted_address={marker.formatted_address}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
