import React, { useState, useEffect } from 'react';
import { H2 } from '@components/shared/Typography';
import { useWindowWidth } from '@react-hook/window-size';
import MapContainer, { GOOGLE_API_LOADER_OPTIONS } from '@components/map/MapContainer';
import { use100vh } from 'react-div-100vh';
import { useRouter } from 'next/router';
import ButtonCta from '@components/shared/ButtonCta';
import { MoonIcon, RightArrowIcon, SunIcon } from '@components/shared/Icons';
import { unAuthed } from '@utils/http';
import { getBedroomRange, getMaxRent, getMinRent } from '@utils/property-helpers';
import { useWishlists } from '@hooks/account';
import useNearby from '@hooks/nearby';
import { useJsApiLoader } from '@react-google-maps/api';
import jsCookie from 'js-cookie';
import MapLoader from '@components/search/MapLoader';
import { cityToBounds } from '@hooks/search';
import BuildingsListMobile from './BuildingsListMobile';
import BuildingsListDesktop from './BuildingsListDesktop';
import Filters from './Filters';
import NearbyFilters from './NearbyFilters';

interface Props {
  school: any;
}

class CityToBoundsError extends Error {}
type CityBounds = { ne: number[]; sw: number[] };

type BuildingFilter = {
  mostCashBack: boolean;
  newBuildings: boolean;
  luxury: boolean;
  closeToCampus: boolean;
  furnished: boolean;
  specials: boolean;
};

const Buildings: React.FC<Props> = ({ school }: Props) => {
  const { data: wishlist } = useWishlists({ hideErrorPopup: true });
  const width = useWindowWidth();
  const height = use100vh();
  const [results, setResults] = useState<any | null>(null);
  const [map, setMap] = useState<any>();
  const [cardHoveredId, setCardHoveredId] = useState<string | null>(null);
  const [markerSelectedId, setMarkerSelectedId] = useState<string | null>(null);
  const { isLoaded } = useJsApiLoader(GOOGLE_API_LOADER_OPTIONS);
  const [nearbyMarkers, setNearbyMarkers] = useState<any>({
    restaurants: [],
    groceries: [],
  });
  const [cityBounds, setCityBounds] = useState<CityBounds>({
    ne: [],
    sw: [],
  });
  const [filters, setFilters] = useState<BuildingFilter>({
    mostCashBack: false,
    newBuildings: false,
    luxury: false,
    closeToCampus: false,
    furnished: false,
    specials: false,
  });
  const [nearbyFilters, setNearbyFilters] = useState({
    groceries: false,
    restaurants: false,
  });
  const [mapZoomReset, setMapZoomReset] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showMap, setShowMap] = useState(true);

  let mouseInTimer: any;
  let mouseOutTimer: any;
  const handleMouseEnter = (id: string) => {
    clearTimeout(mouseInTimer);
    mouseInTimer = setTimeout(() => {
      setCardHoveredId(id);
    }, 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(mouseOutTimer);
    mouseOutTimer = setTimeout(() => {
      setCardHoveredId(null);
    }, 100);
  };

  useEffect(() => {
    fetchBuildings();
  }, [filters]);

  async function fetchBuildings() {
    const filter = `closeToCampus=${filters.closeToCampus}&luxury=${filters.luxury}&special=${filters.specials}&furnished=${filters.furnished}&newBuilding=${filters.newBuildings}&mostCashBack=${filters.mostCashBack}`;
    const request = await unAuthed.get(
      `/schools/fetchPropertiesBySchool/${school?.schoolId}?${new URLSearchParams(filter).toString()}`,
    );
    const wishlistIds = new Set((wishlist ?? []).map((property) => property.id));
    const response = request.data?.Mapping;
    const buildings = response.map((result: any) => {
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
    setResults(buildings);
  }

  class CityToBoundsError extends Error {}

  async function cityToBounds(city: string) {
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

  useEffect(() => {
    if (isLoaded) {
      getBounds();
    }
  }, [isLoaded]);

  async function getBounds() {
    if (isLoaded) {
      const bounds = await cityToBounds(school?.city);
      setCityBounds({
        ne: bounds.ne,
        sw: bounds.sw,
      });
    }
  }

  useEffect(() => {
    if (isLoaded) {
      getNearby();
    }
  }, [isLoaded, nearbyFilters]);

  async function getNearby() {
    const coordinates = school?.coordinates?.coordinates;
    if (coordinates && coordinates.length > 0) {
      if (nearbyFilters.restaurants && !nearbyFilters.groceries) {
        const restaurants = await useNearby('restaurant', map, coordinates[1], coordinates[0], isLoaded);
        setNearbyMarkers({
          groceries: [],
          restaurants: restaurants,
        });
      } else if (nearbyFilters.groceries && !nearbyFilters.restaurants) {
        const groceries = await useNearby('supermarket', map, coordinates[1], coordinates[0], isLoaded);
        setNearbyMarkers({
          restaurants: [],
          groceries: groceries,
        });
      } else if (nearbyFilters.groceries && nearbyFilters.restaurants) {
        const groceries = await useNearby('supermarket', map, coordinates[1], coordinates[0], isLoaded);
        const restaurants = await useNearby('restaurant', map, coordinates[1], coordinates[0], isLoaded);
        setNearbyMarkers({
          restaurants: restaurants,
          groceries: groceries,
        });
      } else if (!nearbyFilters.restaurants && !nearbyFilters.groceries) {
        setNearbyMarkers({
          groceries: [],
          restaurants: [],
        });
      }
    }
  }

  return (
    <div className="w-full relative flex flex-col items-center justify-center content-center py-10 md:mb-10 mb-0">
      <div className="z-20 pl-18 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4 overflow-hidden">
        <H2 className="pb-5 md:py-10 md:pb-4 text-left">View Buildings</H2>
      </div>
      <Filters filters={filters} setFilters={(filters) => setFilters(filters)} />
      <NearbyFilters nearbyFilters={nearbyFilters} setNearbyFilters={(filters) => setNearbyFilters(filters)} />
      <div className="md:hidden block">
        <BuildingsListMobile key="mobilevertical" results={results} markerSelectedId={markerSelectedId} />
        <div className="flex w-full md:content-start content-center md:justify-start justify-center pt-4 px-6">
          <ButtonCta
            href="/start"
            icon={RightArrowIcon}
            style={{ background: '#2A343A' }}
            variant="primary"
            className="w-full justify-center md:w-auto"
          >
            Browse all units
          </ButtonCta>
        </div>
      </div>
      <div className="w-full mt-6 z-20 pl-18 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4">
        <div className="w-full flex flex-col m-auto">
          <div className="w-full">
            <div className="w-full mx-auto overflow-hidden h-full">
              <div className="grid grid-cols-12">
                <div className="4k:col-span-3 md:col-span-5 col-span-12 w-full h-screen md:block hidden">
                  <BuildingsListDesktop
                    key="desktoplist"
                    results={results}
                    onMouseIn={(result) => handleMouseEnter(result.id)}
                    onMouseOut={() => handleMouseLeave()}
                    markerSelectedId={markerSelectedId}
                    show={width >= 768}
                  />
                </div>
                {isLoaded && (
                  <div className="4k:col-span-9 md:col-span-7 col-span-12 relative md:block hidden">
                    <div style={{ position: 'relative' }}>
                      {showMap && (
                        <div className="map-wrapper">
                          <MapLoader showMapLoader={!results} mobileCardsActive={width < 768 && !!markerSelectedId} />
                          <MapContainer
                            zoomReset={mapZoomReset}
                            setMapZoomReset={setMapZoomReset}
                            isDark={isDark}
                            height={height}
                            width={width}
                            query={null}
                            markers={results}
                            search={null}
                            onClick={(e: any) => {
                              e.event.preventDefault();
                              e.event.stopPropagation();
                              setCardHoveredId(null);
                              setMarkerSelectedId(null);
                            }}
                            onMarkerClick={(propertyId: string | null) => {
                              setCardHoveredId(propertyId);
                              setMarkerSelectedId(propertyId);
                            }}
                            onChange={() => {
                              return null
                            }}
                            collegeCoordinates={school?.coordinates?.coordinates || null}
                            onMarkerMouseEnter={(id: any) => setMarkerSelectedId(id)}
                            onMarkerMouseLeave={() => setMarkerSelectedId(null)}
                            selectedId={cardHoveredId || markerSelectedId}
                            bounds={{
                              ne: {
                                lat: parseFloat(cityBounds?.ne[1] as any),
                                lng: parseFloat(cityBounds?.ne[0] as any),
                              },
                              sw: {
                                lat: parseFloat(cityBounds?.sw[1] as any),
                                lng: parseFloat(cityBounds?.sw[0] as any),
                              },
                            }}
                            nearByMarkers={[...nearbyMarkers.restaurants, ...nearbyMarkers.groceries]}
                            onGoogleApiLoaded={(theMap: any) => setMap(theMap)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buildings;
