import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import amenitiesJSON from './amenities.json';
import LocationAutocomplete from '../funnel/LocationAutocomplete';
import { fromGoogleBounds, toGoogleBounds } from '../../models/Boundary';

const FilterPanel = function({ query, boundary, setBoundary, openEmailClientModal }) {
  const router = useRouter();
  const bedroomsFromQueryParams = (query.bedrooms || []).map(bedroom => parseInt(bedroom));

  // Map amenities from query params to amenity state
  const defaultAmenityState = amenitiesJSON.map(amenity => {
    if (query.amenities?.includes(amenity)) {
      return {
        amenity,
        checked: true
      }
    } else {
      return {
        amenity,
        checked: false
      }
    }
  });

  const [locationInput, setLocationInput] = useState(query.location);
  const [selectedBedrooms, setSelectedBedrooms] = useState(bedroomsFromQueryParams);
  const [minPrice, setMinPrice] = useState(query.minPrice);
  const [maxPrice, setMaxPrice] = useState(query.maxPrice);
  const [builtAfter, setBuiltAfter] = useState(query.builtAfter);
  const [minSqFt, setMinSqFt] = useState(query.minSqFt);
  const [petsAllowed, setPetsAllowed] = useState(query.petsAllowed);
  const [washerDryerType, setWasherDryerType] = useState(query.washerDryerType);
  const [secondChance, setSecondChance] = useState(query.secondChance);
  const [creditCheck, setCreditCheck] = useState(query.creditCheck);
  const [promos, setPromos] = useState(query.promos);
  const [amenities, setAmenities] = useState(defaultAmenityState);
  const loading = false;
  function toggleBedroom(numberOfBedrooms) {
    let newBedrooms = selectedBedrooms.slice();
    if (newBedrooms.includes(numberOfBedrooms)) {
      newBedrooms = newBedrooms.filter((e) => e !== numberOfBedrooms);
    } else {
      newBedrooms.push(numberOfBedrooms);
    }
    setSelectedBedrooms(newBedrooms);
  }

  function toggleAmenity(selectedAmenity) {
    let newAmenityState = amenities.map(({ amenity, checked }) => {
      if (amenity === selectedAmenity) {
        return {
          amenity,
          checked: !checked,
        }
      } else {
        return {
          amenity,
          checked
        }
      }
    });
    setAmenities(newAmenityState);
  }

  function togglePetsAllowed(event) {
    const newPetsAllowed = event.target.value === "None" ? [] : [event.target.value];
    setPetsAllowed(newPetsAllowed);
  }

  function toggleWasherDryerType(event) {
    const newWasherDryerType = event.target.value;
    setWasherDryerType(newWasherDryerType);
  }

  function toggleSecondChance(event) {
    const newSecondChance = event.target.value;
    setSecondChance(newSecondChance);
  }

  function toggleCreditCheck(event) {
    const newCreditCheck = event.target.value;
    setCreditCheck(newCreditCheck);
  }

  function togglePromos(event) {
    const newPromos = event.target.value;
    setPromos(newPromos);
  }

  // Update query params after state is changed
  const updateQueryParams = useCallback(() => {
    const amenitiesParams = amenities.filter(amenity => amenity.checked).map(amenityObject => amenityObject.amenity);
    const boundaryParams = fromGoogleBounds(boundary);

    let bedroomsQueryParams = selectedBedrooms.slice();
    // Force query params to acknowledge ?bedrooms is an array
    if (selectedBedrooms.length === 1) {
      bedroomsQueryParams.push("");
    }

    // Add the washer/dryer type to the amenities array
    amenitiesParams.push(washerDryerType);

    const queryParams = {
      location: locationInput,
      bedrooms: bedroomsQueryParams,
      minPrice: minPrice,
      maxPrice: maxPrice,
      builtAfter: builtAfter,
      minSqFt: minSqFt,
      petsAllowed: petsAllowed,
      secondChance: secondChance,
      creditCheck: creditCheck,
      promos: promos,
      amenities: amenitiesParams,
      ne: boundaryParams.NE,
      sw: boundaryParams.SW
    }

    const query = {};
    // Remove falsy values from queryParams object
    Object.keys(queryParams).forEach((parameter) => {
      if (queryParams[parameter] && queryParams[parameter].length > 0) { query[parameter] = queryParams[parameter] }
    });

    router.push({
      pathname: '/slocator',
      query
    })
  }, [
    locationInput,
    selectedBedrooms,
    minPrice,
    maxPrice,
    builtAfter,,
    minSqFt,
    petsAllowed,
    washerDryerType,
    secondChance,
    creditCheck,
    promos,
    amenities,
    boundary
  ]);

  useEffect(() => updateQueryParams(), [updateQueryParams]);

  return (
    <header data-testid="search-header">
      <div className="max-w-7xl mx-auto">
        <form className="flex w-full" onSubmit={() => null}>
          <div className="flex flex-wrap w-4/12 justify-between space-y-2 pr-4">
            <div className="w-full flex justify-between space-x-2">
              <div className="h-12 flex flex-row content-center relative w-6/12">
                <LocationAutocomplete
                  selected={(newLocationInput, newBoundary) => {
                    const newGoogleBoundary = toGoogleBounds(newBoundary);
                    setLocationInput(newLocationInput);
                    setBoundary(newGoogleBoundary);
                  }}
                  initialValue={locationInput}
                  onChange={(loc) => {
                    console.log(loc);
                  }}
                  disabled={loading}
                  inputClassName={`${
                    false ? 'border-red-600' : 'border-gray-300'
                  } appearance-none w-full px-5 py-3 border text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out`}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="h-12 flex pt-2 sm:pt-0 w-6/12">
                <div className="w-full flex flex-row content-center">
                  <button
                    onClick={() => toggleBedroom(0.5)}
                    type="button"
                    disabled={loading}
                    className={`${
                      selectedBedrooms && selectedBedrooms.includes(0.5)
                        ? 'bg-indigo-500 text-white hover:bg-indigo-400 border-l-0 border-r-0'
                        : 'bg-white hover:text-gray-500 border-gray-300 text-gray-700'
                    } w-2/6 items-center px-4 py-2 rounded-l-md border  text-sm leading-5 font-medium   focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                  >
                    Studio
                  </button>
                  <button
                    onClick={() => toggleBedroom(1)}
                    type="button"
                    disabled={loading}
                    className={`${
                      selectedBedrooms && selectedBedrooms.includes(1)
                        ? 'bg-indigo-500 text-white hover:bg-indigo-400 border-l-0 border-r-0'
                        : 'bg-white hover:text-gray-500 border-gray-300 text-gray-700'
                    } w-1/6 items-center px-4 py-2 border   text-sm leading-5 font-medium   focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                  >
                    1
                  </button>
                  <button
                    onClick={() => toggleBedroom(2)}
                    type="button"
                    disabled={loading}
                    className={`${
                      selectedBedrooms && selectedBedrooms.includes(2)
                        ? 'bg-indigo-500 text-white hover:bg-indigo-400 border-l-0 border-r-0'
                        : 'bg-white hover:text-gray-500 border-gray-300 text-gray-700'
                    } w-1/6 items-center px-4 py-2 border   text-sm leading-5 font-medium   focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                  >
                    2
                  </button>
                  <button
                    onClick={() => toggleBedroom(3)}
                    type="button"
                    disabled={loading}
                    className={`${
                      selectedBedrooms && selectedBedrooms.includes(3)
                        ? 'bg-indigo-500 text-white hover:bg-indigo-400 border-l-0 border-r-0'
                        : 'bg-white hover:text-gray-500 border-gray-300 text-gray-700'
                    } w-1/6 items-center px-4 py-2 border   text-sm leading-5 font-medium   focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                  >
                    3
                  </button>
                  <button
                    onClick={() => toggleBedroom(4)}
                    type="button"
                    disabled={loading}
                    className={`${
                      selectedBedrooms && selectedBedrooms.includes(4)
                        ? 'bg-indigo-500 text-white hover:bg-indigo-400 border-l-0 border-r-0 '
                        : 'bg-white hover:text-gray-500 border-gray-300 text-gray-700'
                    } w-1/6 items-center rounded-r-md flex items-center px-4 py-2 border   text-sm leading-5 font-medium   focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                  >
                    4+
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between space-x-2">
              <div className="h-12 flex flex-row content-center relative w-3/12">
                <input value={minPrice} onChange={(event) => { setMinPrice(event.target.value) }} className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 w-full" placeholder="Min Price" type="number" />
              </div>
              <div className="h-12 flex flex-row content-center relative w-3/12">
                <input value={maxPrice} onChange={(event) => { setMaxPrice(event.target.value) }} className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 w-full" placeholder="Max Price" type="number" />
              </div>
              <div className="h-12 flex flex-row content-center relative w-3/12">
                <input value={builtAfter} onChange={(event) => { setBuiltAfter(event.target.value) }} className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 w-full" placeholder="Built After" type="number" />
              </div>
              <div className="h-12 flex flex-row content-center relative w-3/12">
                <input value={minSqFt} onChange={(event) => { setMinSqFt(event.target.value) }} className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 w-full" placeholder="Min Sq. Ft" type="number" />
              </div>
            </div>
            <div className="w-full flex justify-between space-x-2">
              <div className="h-12 flex flex-row content-center relative w-6/12">
                <select onChange={togglePetsAllowed} value={petsAllowed} className="block py-4 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-sm">
                  <option value="All">Pets Allowed</option>
                  <option value="Dogs">Dogs</option>
                  <option value="Cats">Cats</option>
                  <option value="None">None</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="h-12 flex flex-row content-center relative w-6/12">
                <select onChange={toggleWasherDryerType} value={washerDryerType} className="block py-4 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-sm">
                  <option value="">Washer/Dryer Type</option>
                  <option value="W/D in unit">W/D in unit</option>
                  <option value="W/D hookups">W/D hookups</option>
                  <option value="Community W/D">Community W/D</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between space-x-2">
              <div className="h-12 flex flex-row content-center relative w-4/12">
                <select onChange={toggleSecondChance} value={secondChance} className="block py-4 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-sm">
                  <option value="true">2nd Chance</option>
                  <option value="false">2nd Chance Not Specified</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="h-12 flex flex-row content-center relative w-4/12">
                <select onChange={toggleCreditCheck} value={creditCheck} className="block py-4 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-sm">
                  <option value="false">No Credit Checks</option>
                  <option value="true">Credit Checks</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="h-12 flex flex-row content-center relative w-4/12">
                <select onChange={togglePromos} value={promos} className="block py-4 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-sm">
                  <option value="true">Specials</option>
                  <option value="false">Specials Not Specified</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row content-center relative flex-wrap w-7/12 pl-4">
            {amenities.map(({ amenity, checked }) => (
              <label className="flex items-center space-x-2 mb-2 w-2/12 text-xs" key={amenity}>
                <input type="checkbox" name={amenity} onChange={() => toggleAmenity(amenity)} checked={checked} />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
          <div className="w-1/12">
            <button
              data-tip="Please choose a location first"
              type="button"
              className="w-full flex shadow items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out"
              onClick={openEmailClientModal}
            >
              Email Client
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default FilterPanel;
