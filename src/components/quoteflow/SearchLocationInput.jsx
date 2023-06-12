import React, { useState, useEffect, useRef } from 'react';

function SearchLocationInput({ defaultValue, id, className }) {
  const [addressOne, setAddressOne] = useState(defaultValue?.addressOne || '');
  const [addressTwo, setAddressTwo] = useState(defaultValue?.addressTwo || '');
  const [city, setCity] = useState(defaultValue?.city || '');
  const [state, setState] = useState(defaultValue?.state || '');
  const [zip, setZip] = useState(defaultValue?.zip || '');

  const [addressComponents, setAddressComponents] = useState({});
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const autoCompleteRef = useRef(null);

  function handleScriptLoad(autoCompleteRef) {
    const autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
      componentRestrictions: { country: 'us' },
    });
    autoComplete.setFields(['adr_address', 'address_components', 'formatted_address']);
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

      if (newAddressComponents.street_number) {
        setAddressOne(`${newAddressComponents.street_number.longName} ${newAddressComponents.route.longName}`);
      }

      if (newAddressComponents.locality) {
        setCity(newAddressComponents.locality.longName);
      }

      if (newAddressComponents.administrative_area_level_1) {
        setState(newAddressComponents.administrative_area_level_1.shortName);
      }

      if (newAddressComponents.postal_code) {
        setZip(newAddressComponents.postal_code.longName);
      }
    });
  }

  const loadScript = (url, callback) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
          setIsScriptLoaded(true);
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  useEffect(() => {
    if (isScriptLoaded === false) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`,
        () => handleScriptLoad(autoCompleteRef)
      );
    }
  }, [isScriptLoaded]);

  return (
    <div id={id} className={className}>
      <fieldset className="o-fieldset">
        <label className="o-text-input__label">Address</label>
        <div className="o-search-location-input" style={{ position: 'relative' }}>
          <img className="o-map-marker" src="/static/assets/Icons/map_marker.svg" />
          <input
            id="o-search-location__address-one"
            className="o-text-input"
            ref={autoCompleteRef}
            autoFocus
            onChange={(event) => setAddressOne(event.target.value)}
            placeholder="Enter address line 1"
            value={addressOne}
            type="text"
            data-addressobject={JSON.stringify(addressComponents)}
            required
          />
        </div>
      </fieldset>
      <fieldset className="o-fieldset">
        <label className="o-text-input__label">Address 2</label>
        <input
          id="o-search-location__address-two"
          placeholder="Enter address line 2"
          onChange={(event) => setAddressTwo(event.target.value)}
          value={addressTwo}
          className="o-text-input"
          type="text"
        />
      </fieldset>
      <div className="o-search-location__city-state-zip">
        <fieldset className="o-fieldset">
          <label className="o-text-input__label">City</label>
          <input
            id="o-search-location__city"
            placeholder="Enter city"
            onChange={(event) => setCity(event.target.value)}
            className="o-text-input"
            type="text"
            value={city}
            required
          />
        </fieldset>
        <fieldset className="o-fieldset">
          <label className="o-text-input__label">State</label>
          <input
            id="o-search-location__state"
            placeholder="State"
            onChange={(event) => setState(event.target.value)}
            className="o-text-input"
            type="text"
            value={state}
            required
          />
        </fieldset>
        <fieldset className="o-fieldset">
          <label className="o-text-input__label">ZIP</label>
          <input
            id="o-search-location__zip"
            placeholder="Enter ZIP"
            onChange={(event) => setZip(event.target.value)}
            className="o-text-input"
            type="text"
            value={zip}
            required
          />
        </fieldset>
      </div>
    </div>
  );
}

export default SearchLocationInput;
