import { useJsApiLoader } from '@react-google-maps/api';
import { unAuthed } from '@utils/http';
import axios from 'axios';
import { result } from 'lodash';
import qs from 'qs';
import useSWR from 'swr';

const GOOGLE_MAPS_LIBRARIES: ['places', 'geometry'] = ['places', 'geometry']; // useJsApiLoader requires this to be immutable

export type NearbyResult = google.maps.places.PlaceResult & { type: string };

export interface NearbyResults {
  html_attributions: any[];
  results: NearbyResult[];
  status: string;
}

export default function useNearby(
  type: any,
  mapRef: HTMLDivElement | undefined,
  lat: any,
  lng: any,
  isLoaded: boolean
) {
  const data = (async (): Promise<NearbyResult[]> => {
    if (!mapRef) return [];
    const placesService = new google.maps.places.PlacesService(mapRef);
    const placeResults = await new Promise<NearbyResult[]>((resolve, reject) => {
      placesService.nearbySearch({ location: { lat, lng }, radius: 5000, type }, (results, status, pagination) => {
        resolve(results?.map((res) => ({ ...res, type })) || []);
      });
    });

    return placeResults;
  })();

  return data || [];
}
