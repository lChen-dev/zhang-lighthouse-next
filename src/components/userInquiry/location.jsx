import { LocationPinSVG, NoteSVG, PinSVG, ToTheRightArrowSVG } from '@components/shared/Icons';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import allLocations from '@components/funnel/locations.json';
import Select from 'react-select';
import { removeUndefinedFields } from '@utils/helpers';
import { throttle } from 'lodash';

const customStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: 'none',
    border: 'none',

    paddingLeft: '20px',
    // You can also use state.isFocused to conditionally style based on the focus state
  }),
};

function Location({
  getData,
  saveData,
  nextStep,
  prevStep,
  sendTrack,
  toast,
  setNextStep,
  updateCompletedSteps,
  stepId,
}) {
  const router = useRouter();
  const { query, pathname } = router;
  const [city, setCity] = useState(query.city || '');
  const [changeCity, setChangeCity] = useState(false);
  const [boundary, setBoundary] = useState({});
  const [place, setPlace] = useState({ formatted_address: '' });
  const [notes, setNotes] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const updateQuery = ({ ...newArgs }) => {
    const newQuery = { ...query, ...newArgs };
    removeUndefinedFields(newQuery);
    router.replace({
      pathname,
      query: newQuery,
    });
  };
  const [addressComponents, setAddressComponents] = useState({});
  const autoCompleteRef = useRef(null);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // eslint-disable-next-line no-shadow
  function handleScriptLoad(autoCompleteRef) {
    if (window.google) {
      const autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
        componentRestrictions: { country: 'us' },
      });
      autoComplete.setFields(['adr_address', 'address_components', 'formatted_address', 'geometry']);
      autoComplete.addListener('place_changed', () => {
        const addressObject = autoComplete.getPlace();
        const componentsArray = addressObject.address_components;
        const newAddressComponents = {};
        componentsArray.forEach((component) => {
          newAddressComponents[component.types[0]] = {
            longName: component.long_name,
            shortName: component.short_name,
          };
        });

        updateQuery({
          lat: addressObject.geometry.viewport.getCenter().toJSON().lat,
          lng: addressObject.geometry.viewport.getCenter().toJSON().lng,
        });
        setTimeout(() => {
          setPlace(addressObject);
          saveData({ location: addressObject });
        }, 10);
      });
    } else {
      setIsScriptLoaded(!isScriptLoaded);
    }
  }

  useEffect(() => {
    sendTrack('Guided Visit form step loaded', { Step: 'Location' });
    handleScriptLoad(autoCompleteRef);
  }, [isScriptLoaded, autoCompleteRef.current]);
  return (
    <div className=" w-full mbp:w-368px">
      {(router.pathname.includes('guidedstart') || changeCity) && (
        <>
          <div className="font-circular text-gray-soft font-normal text-18px">Tell the map where to go.</div>
          <div className="w-full relative font-circular font-bold text-gray-soft focus-within:text-brand border-b border-gray-lighter">
            <Select
              styles={customStyles}
              onChange={(e) => {
                setChangeCity(false);
                setCity(e.value.name);
                saveData({ city: e.value.name, boundary: e.value.bounds });
                updateQuery({
                  ne: Object.values(e.value.bounds.northeast),
                  sw: Object.values(e.value.bounds.southwest),
                  city: e.value.name,
                });
                setBoundary(e.value.bounds);
              }}
              options={allLocations.map((loc) => {
                return { label: loc.name, value: loc };
              })}
              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            />
            <div className="absolute top-0 mt-2">
              <LocationPinSVG height={20} width={20} />
            </div>
          </div>
        </>
      )}
      {(!router.pathname.includes('guidedstart') || city) && (
        <>
          {router.pathname.includes('guidedstart') && (
            <div className="font-circular text-gray-soft font-normal mt-1 mb-px text-18px">
              Any preferred locations? (Optional)
            </div>
          )}
          {!router.pathname.includes('guidedstart') ? (
            <div className="font-circular text-gray-soft font-normal text-18px " style={{ marginTop: '-29px' }}>
              More tailored insights in {city}.
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setChangeCity(true);
                }}
                className="text-brand font-bold outline-none font-circular focus:outline-none">
                Change city
              </button>
            </div>
          ) : (
            <div className="font-circular text-gray-soft font-normal text-14px mt-px">
              It will allow for more tailored insights.
            </div>
          )}

          <div className="relative w-full" style={{ height: '35px', marginTop: '25px' }}>
            <div className="absolute top-0 z-10" style={{ marginTop: '6px' }}>
              <PinSVG />
            </div>
            <input
              ref={autoCompleteRef}
              className="w-full pl-8 font-circular absolute top-0 mt-1 outline-none focus:outline-none"
              style={{ marginTop: '10px' }}
              onChange={(event) => {
                setPlace({ ...place, formatted_address: event.target.value });
              }}
              placeholder="Location: ex. by Dallas Zoo..."
              value={place.formatted_address}
              type="text"
              data-addressobject={JSON.stringify(addressComponents)}
              required
            />
          </div>

          <div className="w-full bg-gray-lighter " style={{ height: '1px', marginTop: '11px' }} />
          <div className="relative w-full" style={{ height: '35px', marginTop: '25px' }}>
            <input
              value={notes}
              onChange={(e) => {
                saveData({ notes: e.target.value });
                setNotes(e.target.value);
              }}
              placeholder="Notes (if any): ex. 30 mins to D2..."
              className="w-full font-circular pl-8 absolute top-0 mt-1 outline-none focus:outline-none"
              style={{ marginTop: '10px' }}
            />
            <div className="absolute top-0 " style={{ marginTop: '6px' }}>
              <NoteSVG />
            </div>
          </div>
          <div className="w-full bg-gray-lighter " style={{ height: '1px', marginTop: '11px', marginBottom: '10px' }} />
          <button
            type="button"
            disabled={!place}
            className={`w-full h-15 mt-6  flex outline-none focus:outline-none flex-row flex-no-wrap rounded font-circular justify-center items-center ${
              !place ? 'bg-gray-400' : 'bg-brand'
            }`}
            onClick={() => {
              if (place) {
                sendTrack('Guided Visit form step', { Step: 'Location', data: { location: place, notes, city } });
                saveData({ location: place, notes, city });
                setNextStep('bedrooms');
                updateCompletedSteps(stepId);
              }
            }}>
            <span className="w-32 font-bold font-circular text-lg text-white">Next step</span>
            <div className=" my-auto font-bold text-lg">
              <ToTheRightArrowSVG />
            </div>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              sendTrack('Skipped Guided Visit form step', { skippedStep: 'Location' });
              saveData({ location: 'skipped' });
              setNextStep('bedrooms');
              updateCompletedSteps(stepId);
            }}
            style={{ marginTop: '14px' }}
            className="w-full font-circular bg-white h-14 text-16px font-bold outline-none focus:outline-none text-gray-soft rounded">
            Skip this step
          </button>
        </>
      )}
    </div>
  );
}

export default Location;
