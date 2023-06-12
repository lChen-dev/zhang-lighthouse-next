import useSWR from 'swr';
import { useRouter } from 'next/router';
import qs from 'qs';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useMemo, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import axios, { CancelTokenSource } from 'axios';

import { authed, unAuthed } from '@utils/http';
import { getBedroomRange, getMaxRent, getMinRent } from '@utils/property-helpers';
import { GOOGLE_API_LOADER_OPTIONS } from '@components/map/MapContainer';
import { useWishlists } from '@hooks/account';
import { sentryCaptureException } from '@utils/sentry';
import { sendTrack } from '@utils/analytics';

export function getPaddedBounds({
  ne,
  sw,
  width,
  height,
  topPadding,
  leftPadding,
  rightPadding,
  bottomPadding,
}: {
  ne: { lat: number; lng: number };
  sw: { lat: number; lng: number };
  width: number;
  height: number;
  topPadding: number;
  leftPadding: number;
  rightPadding: number;
  bottomPadding: number;
}): { ne: { lat: number; lng: number }; sw: { lat: number; lng: number } } {
  if (typeof window === 'undefined' || !window?.hasOwnProperty('google')) {
    return { ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } };
  }
  let geometry = null;
  let LatLng = null;
  if (window && window?.hasOwnProperty('google')) {
    const map = (window as any)?.google.maps;
    geometry = map.geometry;
    LatLng = map.LatLng;
  }

  const diagonalDistance = geometry.spherical.computeDistanceBetween(
    new LatLng(ne.lat, ne.lng),
    new LatLng(sw.lat, sw.lng)
  );

  const pixelDiagonalDistance = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  const meterPerPixel = diagonalDistance / pixelDiagonalDistance;

  const topPaddingMeters = topPadding * meterPerPixel;
  const leftPaddingMeters = leftPadding * meterPerPixel;
  const rightPaddingMeters = rightPadding * meterPerPixel;
  const bottomPaddingMeters = bottomPadding * meterPerPixel;

  const neOffset = Math.sqrt(Math.pow(topPaddingMeters, 2) + Math.pow(rightPaddingMeters, 2));
  const neOffsetAngle = 90 - (Math.atan2(-topPaddingMeters, -rightPaddingMeters) * 180) / Math.PI;
  const swOffset = Math.sqrt(Math.pow(bottomPaddingMeters, 2) + Math.pow(leftPaddingMeters, 2));
  const swOffsetAngle = 90 - (Math.atan2(bottomPaddingMeters, leftPaddingMeters) * 180) / Math.PI;

  const newNE = geometry.spherical.computeOffset(new LatLng(ne.lat, ne.lng), neOffset, neOffsetAngle);
  const newSW = geometry.spherical.computeOffset(new LatLng(sw.lat, sw.lng), swOffset, swOffsetAngle);

  return {
    ne: {
      lng: newNE.lng(),
      lat: newNE.lat(),
    },
    sw: {
      lng: newSW.lng(),
      lat: newSW.lat(),
    },
  };
}

export function usePaddedBounds({
  ne,
  sw,
  width,
  height,
  topPadding,
  leftPadding,
  rightPadding,
  bottomPadding,
}: {
  ne: { lat: number; lng: number };
  sw: { lat: number; lng: number };
  width: number;
  height: number;
  topPadding: number;
  leftPadding: number;
  rightPadding: number;
  bottomPadding: number;
}): { ne: { lat: number; lng: number }; sw: { lat: number; lng: number } } {
  const { geometry, LatLng } = (window as any)?.google.maps;

  const diagonalDistance = useMemo(
    () => geometry.spherical.computeDistanceBetween(new LatLng(ne.lat, ne.lng), new LatLng(sw.lat, sw.lng)),
    [LatLng, geometry.spherical, ne.lat, ne.lng, sw.lat, sw.lng]
  );

  const pixelDiagonalDistance = useMemo(() => Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)), [width, height]);

  const meterPerPixel = diagonalDistance / pixelDiagonalDistance;

  const topPaddingMeters = topPadding * meterPerPixel;
  const leftPaddingMeters = leftPadding * meterPerPixel;
  const rightPaddingMeters = rightPadding * meterPerPixel;
  const bottomPaddingMeters = bottomPadding * meterPerPixel;

  const neOffset = useMemo(() => Math.sqrt(Math.pow(topPaddingMeters, 2) + Math.pow(rightPaddingMeters, 2)), [
    topPaddingMeters,
    rightPaddingMeters,
  ]);
  const neOffsetAngle = useMemo(() => 90 - (Math.atan2(-topPaddingMeters, -rightPaddingMeters) * 180) / Math.PI, [
    topPaddingMeters,
    rightPaddingMeters,
  ]);
  const swOffset = useMemo(() => Math.sqrt(Math.pow(bottomPaddingMeters, 2) + Math.pow(leftPaddingMeters, 2)), [
    bottomPaddingMeters,
    leftPaddingMeters,
  ]);
  const swOffsetAngle = useMemo(
    () => (360 + (Math.atan2(bottomPaddingMeters, leftPaddingMeters) * 180) / Math.PI) % 360,
    [bottomPaddingMeters, leftPaddingMeters]
  );

  const newNE = useMemo(() => geometry.spherical.computeOffset(new LatLng(ne.lat, ne.lng), neOffset, neOffsetAngle), [
    LatLng,
    geometry.spherical,
    ne.lat,
    ne.lng,
    neOffset,
    neOffsetAngle,
  ]);
  const newSW = useMemo(() => geometry.spherical.computeOffset(new LatLng(sw.lat, sw.lng), swOffset, swOffsetAngle), [
    LatLng,
    geometry.spherical,
    sw.lat,
    sw.lng,
    swOffset,
    swOffsetAngle,
  ]);

  return {
    ne: {
      lng: newNE.lng(),
      lat: newNE.lat(),
    },
    sw: {
      lng: newSW.lat(),
      lat: newSW.lng(),
    },
  };
}

class CityToBoundsError extends Error {}

export async function cityToBounds(city: string) {
  const geocoder = new (window as any).google.maps.Geocoder();
  return new Promise<{ ne: [number, number]; sw: [number, number] }>((resolve, reject) => {
    geocoder.geocode({ address: city, componentRestrictions: { country: 'US' } }, (results: any, status: any) => {
      if (status === 'OK') {
        const { viewport } = results[0].geometry;
        resolve({
          ne: [viewport.getNorthEast().lng(), viewport.getNorthEast().lat()],
          sw: [viewport.getSouthWest().lng(), viewport.getSouthWest().lat()],
        });
      } else {
        reject(new CityToBoundsError(`Geocode was not successful for the following reason: ${status}`));
      }
    });
  });
}

async function typeformSearch(responseId: string) {
  if (!responseId)
    return {
      ne: [-96.639439212418, 32.89818588665143],
      sw: [-96.969029056168, 32.71090353284747],
    };

  const { data: responses } = await authed.get(`/typeform/${responseId}`, { timeout: 3 * 1000 * 60 });

  if (!responses || responses.total_items === 0)
    return {
      ne: [-96.639439212418, 32.89818588665143],
      sw: [-96.969029056168, 32.71090353284747],
    };

  const answers = responses.items[0]?.answers;
  const cityAnswer = answers.find((a: any) => a.field.id === 'pDuNbmE9ovYM');
  const bedroomsAnswer = answers.find((a: any) => a.field.id === 'WNLIpj4MijEr');
  const maxPriceAnswer = answers.find((a: any) => a.field.id === 'WbFVlu17MgVm');

  const city = cityAnswer?.text?.match(/[- ]*(?<city>.+)/)?.groups?.city;
  const bedrooms = bedroomsAnswer?.choice?.label;
  const maxPrice = maxPriceAnswer?.choice?.label
    ? Number(maxPriceAnswer?.choice?.label.replace(/[^0-9\.]+/g, ''))
    : undefined;

  if (!city)
    return {
      ne: [-96.639439212418, 32.89818588665143],
      sw: [-96.969029056168, 32.71090353284747],
      bedrooms: bedrooms === 'Studio' ? 0 : bedrooms,
      maxPrice,
    };

  const bounds = await cityToBounds(city);

  return {
    ne: bounds.ne,
    sw: bounds.sw,
    bedrooms: bedrooms === 'Studio' ? 0 : bedrooms,
    maxPrice,
  };
}

async function searchProperties(search: any) {
  let { ne, sw } = search;

  const { width, height } = search;
  ne = ne && [parseFloat(ne[0] as string), parseFloat(ne[1] as string)];
  sw = sw && [parseFloat(sw[0] as string), parseFloat(sw[1] as string)];

  if (ne && sw && width && height && (window as any).google.maps) {
    const { geometry, LatLng } = (window as any).google.maps;

    const diagonalDistance = geometry.spherical.computeDistanceBetween(
      new LatLng(ne[1], ne[0]),
      new LatLng(sw[1], sw[0])
    );

    const pixelDiagonalDistance = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

    const meterPerPixel = diagonalDistance / pixelDiagonalDistance;

    const topPadding = 200 * meterPerPixel;
    const leftPadding = 50 * meterPerPixel;
    const rightPadding = 50 * meterPerPixel;
    const bottomPadding = 50 * meterPerPixel;

    const neOffset = Math.sqrt(Math.pow(topPadding, 2) + Math.pow(rightPadding, 2));
    const neOffsetAngle = 90 - (Math.atan2(-topPadding, -rightPadding) * 180) / Math.PI;
    const swOffset = Math.sqrt(Math.pow(bottomPadding, 2) + Math.pow(leftPadding, 2));
    const swOffsetAngle = (360 + (Math.atan2(bottomPadding, leftPadding) * 180) / Math.PI) % 360;

    const newNE = geometry.spherical.computeOffset(new LatLng(ne[1], ne[0]), neOffset, neOffsetAngle);
    const newSW = geometry.spherical.computeOffset(new LatLng(sw[1], sw[0]), swOffset, swOffsetAngle);

    ne = [newNE.lng(), newNE.lat()];
    sw = [newSW.lng(), newSW.lat()];
  }

  const { data } = await unAuthed('/properties/search', {
    timeout: 60 * 1000 * 3,
    params: {
      ...search,
      ne,
      sw,
      height: undefined,
      width: undefined,
      lat: undefined,
      lng: undefined,
      fields: 'id,name,propertyPhotos,floorplan,city,zip,state,cashback,address,website,coordinates,minRent,nanoId',
    },
    paramsSerializer: (parameters) => decodeURI(qs.stringify(parameters, { arrayFormat: 'indices' })),
  });

  return data;
}

async function queryToSearchParams(query: ParsedUrlQuery) {
  const {
    city,
    limit,
    bedrooms,
    offset,
    sort,
    promos,
    creditCheck,
    secondChance,
    pets,
    builtAfter,
    minPrice,
    maxPrice,
    minSqft,
    maxSqft,
    amenities,
    fields,
    name,
    address,
    width,
    height,
    lat,
    lng,
  } = query;

  let { ne, sw } = query;

  const bounds = city && !Array.isArray(city) && (await cityToBounds(city));

  return {
    limit,
    ne: ne ?? (bounds ? bounds.ne : [-96.639439212418, 32.89818588665143]),
    sw: sw ?? (bounds ? bounds.sw : [-96.969029056168, 32.71090353284747]),
    bedrooms,
    offset,
    sort,
    promos,
    creditCheck,
    secondChance,
    pets,
    builtAfter,
    minPrice,
    maxPrice,
    minSqft,
    maxSqft,
    amenities,
    fields,
    name,
    address,
    width,
    height,
  };
}

let lastData: any = [];
let cancelToken: any;
let timeOutToken: any;
export default function useSearch() {
  const { query } = useRouter();
  const { isLoaded } = useJsApiLoader(GOOGLE_API_LOADER_OPTIONS);
  const { data: wishlist } = useWishlists({ hideErrorPopup: true });
  const wishlistIds = new Set((wishlist ?? []).map((property) => property.id));
  const [state, setState]: any = useState({});

  useEffect(() => {
    (async () => {
      // prevent running for similar query
      // run only when map is loaded
      if (!isLoaded) {
        setState({ isFetching: true, results: [], search: [] });
        return;
      }
      // add debounce for too frequent request
      clearTimeout(timeOutToken);
      // abort last request which is no longer required favoring new request
      cancelToken && cancelToken.hasOwnProperty('cancel') && cancelToken.cancel();
      cancelToken = axios.CancelToken.source();
      // debounce
      // timeOutToken = setTimeout(async () => {
      const { data }: any = await axios.get(`/search?${qs.stringify(query)}`, {
        cancelToken: cancelToken.token,
        timeout: 60 * 1000 * 3,
      });
      let results: any = [];
      let search: any = [];

      if (Object.keys(query).length === 1 && query.response_id) {
        search = await typeformSearch(query.response_id as string);
      } else {
        search = await queryToSearchParams(query);
      }
      if (!search) {
        setState({ search, results, isFetching: false });
        return;
      }
      sendTrack('NewSearch', {
        category: 'map',
        label: 'NewSearch',
        action: 'NewSearch',
        ...search,
      });
      results = (await searchProperties(search)).properties;
      lastData = { search, results, isFetching: !data };
      results = lastData.results.map((result: any) => {
        const [minBeds, maxBeds] = result.floorplan ? getBedroomRange(result.floorplan) : [];
        return {
          ...result,
          minRent: getMinRent(result.floorplan),
          maxRent: getMaxRent(result.floorplan),
          minBeds,
          maxBeds,
          isFavorite: wishlistIds.has(result.id),
        };
      });
      if (query.sort === '1') {
        // sort by minRent
        results.sort((a: any, b: any) => a.minRent - b.minRent);
      } else if (query.sort === '2') {
        // sort by maxRent
        results.sort((a: any, b: any) => b.maxRent - a.maxRent);
      }
      setState({ search: lastData.search, results, isFetching: !data });
    })();
  }, [query]);
  return state;
}
