/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useWindowWidth } from '@react-hook/window-size';
import { use100vh } from 'react-div-100vh';

import useSearch from '@hooks/search';
import MapContainer from '@components/map/MapContainer';
import { LocationAutocomplete } from '@components/funnel/LocationAutocomplete';

import useHover from '@react-hook/hover';
import { removeUndefinedFields } from '@utils/helpers';
import HowItworks from '@components/map/HowItWorks';

import jsCookie from 'js-cookie';
import AdditionalFilter from '@components/search/AdditionalFilter';
import SelectBedroom from '@components/search/seerch-select/BedroomSelect';
import { LogoIcon, MoonIcon, SunIcon } from '@components/shared/Icons';
import { useAuth } from 'context/auth';
import AuthPopup from '@components/authPopup';
import Menu from './Menu';
import PriceSelect from './seerch-select/PriceSelect';
import DesktopList from './DesktopList';
import MobileVerticalList from './MobileVerticalList';
import MobileHorizontalList from './MobileHorizontalList';
import MobileHorizontalNoResult from './no-result/MobileHorizontalNoResult';
import MapLoader from './MapLoader';

interface Props {
  onBoardingVersion?: boolean;
  stepId?: string;
  setShowInquiry?: (show: boolean) => boolean;
  confirmDrawing?: (e: any) => void;
}
const SuccessResults: React.FC<Props> = ({ onBoardingVersion, stepId, setShowInquiry, confirmDrawing }) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { search, results, isFetching }: any = useSearch();

  const menuIconTarget = useRef(null);
  const menuTarget = useRef(null);
  const menuIconHovered = useHover(menuIconTarget, { enterDelay: 0, leaveDelay: 200 });
  const menuHovered = useHover(menuTarget, { enterDelay: 0, leaveDelay: 200 });
  const [showAdditionalPreferences, setShowAdditionalPreferences] = useState<boolean>(false);
  const [cardHoveredId, setCardHoveredId] = useState<string | null>(null);
  const [markerSelectedId, setMarkerSelectedId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean | null>(null);
  const [mobileListOpen, setMobileListOpen] = useState<boolean | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [mapZoomReset, setMapZoomReset] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { user } = useAuth();
  const [isDark, setIsDark] = useState<boolean>(
    onBoardingVersion ? false : JSON.parse(jsCookie.get('theme') ?? '').darkTheme,
  );

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

  const width = useWindowWidth();
  const height = use100vh();
  const twentyHeight = height ? height * 0.2 : '20vh';

  const showMenu = menuOpen || (width >= 768 && (menuHovered || menuIconHovered));

  const resultsStyle =
    width && Number.isFinite(width)
      ? width < 768
        ? { scrollSnapType: 'x mandatory', height: twentyHeight }
        : { scrollSnapType: 'y proximity' }
      : { scrollSnapType: 'x mandatory' };

  const updateQuery = (newArgs: { [key: string]: any }) => {
    const newQuery = { ...query, ...newArgs };
    removeUndefinedFields(newQuery);
    router.replace({
      pathname,
      query: newQuery,
    });
  };

  const handleTheme = () => {
    setIsDark((prevSate) => !prevSate);
    jsCookie.set('theme', { darkTheme: !JSON.parse(jsCookie.get('theme') ?? '').darkTheme }, { expires: 30 });
    setShowMap(false);
    setTimeout(() => setShowMap(true), 10);
  };
  useEffect(() => {
    setIsDark(JSON.parse(jsCookie.get('theme') ?? '').darkTheme);
  }, []);

  //  @ts-ignore
  return (
    <>
      {showAuth && !user && <AuthPopup onClick={() => {}} show setShowAuth={setShowAuth} />}
      <div className={`w-full mx-auto overflow-hidden h-full ${isDark && 'dark'}`}>
        <div>
          {!((width < 768 && !mobileListOpen && !!markerSelectedId) || (width < 768 && mobileListOpen)) &&
            !onBoardingVersion && <HowItworks />}
          <div className="search-wrapper bg-white">
            <div className="4k:col-span-10 md:col-span-8 col-span-12 relative map-section">
              {!onBoardingVersion && (
                <div
                  className={`absolute w-full md:bg-transparent ${showAdditionalPreferences ? 'flex flex-col' : ''}`}
                  style={{ height: showAdditionalPreferences && height ? height : undefined, zIndex: 1 }}>
                  <div className="pb-4 z-50 w-full md:px-5 md:pt-4">
                    <div className="flex py-2 px-4 bg-white items-center filters">
                      <div className="mr-2 relative flex items-center search-menu" ref={menuTarget}>
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => (width < 768 ? setMenuOpen(!menuOpen) : router.push('/'))}
                          ref={menuIconTarget}>
                          {showMenu ? (
                            <LogoIcon color="#34966D" />
                          ) : (
                            <LogoIcon color={`${isDark ? '#F5F5F5' : '#2A343A'}`} />
                          )}
                        </div>
                        {showMenu && (
                          <Menu ref={menuTarget} closeMenu={() => setMenuOpen(false)} setShowAuth={setShowAuth} />
                        )}
                      </div>
                      <LocationAutocomplete
                        selected={(newLocationInput, newBoundary) => {
                          updateQuery({
                            city: newLocationInput,
                            ne: newBoundary.NE,
                            sw: newBoundary.SW,
                          });
                          setMapZoomReset(true);
                        }}
                        initialValue={query.city as string}
                        className="flex-auto mx-2 font-circular"
                        inputClassName="h-10 appearance-none w-full px-8 py-3 border text-base leading-6 font-book bg-white focus:outline-none"
                        placeholder="Search a city"
                      />
                      <div style={{ width: 200 }} className="mr-2 md:block hidden">
                        <SelectBedroom updateQuery={updateQuery} />
                      </div>

                      <PriceSelect
                        arrowColor="#34966D"
                        className="md:block hidden md:mr-2"
                        locked={showAdditionalPreferences}
                        updateQuery={updateQuery}
                      />
                      <AdditionalFilter
                        showAdditionalPreferences={showAdditionalPreferences}
                        setShowAdditionalPreferences={setShowAdditionalPreferences}
                        query={query}
                        pathname={pathname}
                        router={router}
                        isDark={isDark}
                        updateQuery={updateQuery}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div style={{ position: 'relative', zIndex: 0 }}>
                {!((width < 768 && !mobileListOpen && !!markerSelectedId) || (width < 768 && mobileListOpen)) &&
                  !onBoardingVersion && (
                    <button className="theme-btn" onClick={handleTheme}>
                      {isDark ? <SunIcon /> : <MoonIcon />}
                    </button>
                  )}
                {showMap && (
                  <div className="map-wrapper">
                    <MapLoader
                      showMapLoader={(!results || isFetching) && !mobileListOpen}
                      mobileCardsActive={width < 768 && !!markerSelectedId}
                    />
                    <MapContainer
                      zoom={(query?.zoom as any) || 14}
                      confirmDrawing={confirmDrawing}
                      zoomReset={mapZoomReset}
                      onBoardingVersion={onBoardingVersion || false}
                      setMapZoomReset={setMapZoomReset}
                      isDark={isDark}
                      height={height}
                      width={width}
                      query={query}
                      markers={results}
                      search={search}
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
                      onMarkerMouseEnter={(id: any) => setMarkerSelectedId(id)}
                      onMarkerMouseLeave={() => setMarkerSelectedId(null)}
                      onChange={(change: any) => {
                        const { bounds, size } = change;

                        const args = {
                          ne: [bounds?.ne?.lng, bounds?.ne?.lat],
                          sw: [bounds?.sw?.lng, bounds?.sw?.lat],
                          zoom: change.zoom,
                          width: size.width,
                          height: size.height,
                          lat: undefined,
                          lng: undefined,
                        };

                        updateQuery(args);
                      }}
                      selectedId={cardHoveredId || markerSelectedId}
                      bounds={{
                        ne: {
                          lat: parseFloat(query?.ne ? query?.ne[1] : search?.ne[1]),
                          lng: parseFloat(query?.ne ? query?.ne[0] : search?.ne[0]),
                        },
                        sw: {
                          lat: parseFloat(query?.sw ? query?.sw[1] : search?.sw[1]),
                          lng: parseFloat(query?.sw ? query?.sw[0] : search?.sw[0]),
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            {!onBoardingVersion && (
              <div className="w-full h-screen bg-white results">
                <DesktopList
                  key="desktoplist"
                  results={results}
                  onMouseIn={(result) => handleMouseEnter(result.id)}
                  onMouseOut={() => handleMouseLeave()}
                  markerSelectedId={markerSelectedId}
                  setShowAuth={setShowAuth}
                  show={width > 1270}
                />
              </div>
            )}
            {!onBoardingVersion && (
              <MobileVerticalList
                key="mobilevertical"
                resultsStyle={resultsStyle}
                results={results}
                onMouseIn={(result) => handleMouseEnter(result.id)}
                onMouseOut={() => handleMouseLeave()}
                markerSelectedId={markerSelectedId}
                onToggle={() => setMobileListOpen(!mobileListOpen)}
                show={width < 768 && mobileListOpen}
                showHorizontalList={width < 768 && !mobileListOpen && !!markerSelectedId}
                setShowAuth={setShowAuth}
                HorizontalList={
                  <MobileHorizontalList
                    key="mobilehorizontal"
                    results={results}
                    setShowAuth={setShowAuth}
                    resultsStyle={resultsStyle}
                    onMouseIn={(result) => setCardHoveredId(result.id)}
                    onMouseOut={() => setCardHoveredId(null)}
                    markerSelectedId={markerSelectedId}
                    onToggle={() => setMobileListOpen(!mobileListOpen)}
                    show={width < 768 && !mobileListOpen && !!markerSelectedId}
                    onClose={() => setMarkerSelectedId(null)}
                  />
                }
              />
            )}
            {width >= 768 && width <= 1270 && !onBoardingVersion && (
              <div
                className="tablet-list"
                style={{ position: 'fixed', bottom: 0, height: 270, width: '100%', overflow: 'scroll' }}>
                {results?.length === 0 && <MobileHorizontalNoResult />}
                {results?.length > 0 && (
                  <MobileHorizontalList
                    key="tablethorizontal"
                    results={results}
                    setShowAuth={setShowAuth}
                    resultsStyle={resultsStyle}
                    onMouseIn={(result) => setCardHoveredId(result.id)}
                    onMouseOut={() => setCardHoveredId(null)}
                    markerSelectedId={markerSelectedId}
                    onToggle={() => setMobileListOpen(!mobileListOpen)}
                    show={width >= 768 && width <= 1270}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessResults;
