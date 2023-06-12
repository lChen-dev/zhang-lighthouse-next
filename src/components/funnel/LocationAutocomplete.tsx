/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Downshift from 'downshift';
import React, { useState, useRef } from 'react';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';

import { unAuthed } from '@utils/http';
import { AddressIcon, CheckedIcon, Glob } from '@components/shared/Icons';
import { useWindowWidth } from '@react-hook/window-size';
import { sentryCaptureException } from '@utils/sentry';

import useFuse from '../../hooks/useFuse';
import Location from '../../models/Location';
import { AutocompletePropertySuggestions, PropertySuggestions } from './AutocompletePropertySuggestions';

import primaryLocations from './primary_locations.json';
import allLocations from './locations.json';

export interface Props {
  initialValue?: string;
  value?: string;
  onChange?: (e: string, o: { SW: number[]; NE: number[] }) => void;
  disabled?: boolean;
  inputClassName: string;
  placeholder: string;
  submitForm?: (loc: string) => unknown;
  selected: (v: string, o: { SW: number[]; NE: number[] }) => void;
  noScript?: boolean;
  className?: string;
}

export const LocationAutocomplete = ({
  initialValue,
  value,
  onChange,
  disabled: disable,
  inputClassName,
  placeholder,
  submitForm,
  selected,
  className,
}: Props): React.ReactElement => {
  const width = useWindowWidth();
  const [state, updateState] = useState({
    menuIsOpen: false,
    selectedObj: {},
  });
  const [initialInputValue, setInputValue] = useState(initialValue);

  const inputRef = useRef(null);
  const setState = (st = {}) => {
    updateState({ ...state, ...st });
  };
  const generateBounds = (bounds: any) => {
    const {
      northeast: { lat: nt, lng: nl },
      southwest: { lat: st, lng: sl },
    } = bounds;
    return { SW: [sl, st], NE: [nl, nt] };
  };

  const [activeItem, setActiveItem] = useState<string>('');
  const fuse = useFuse<Location>({
    data: allLocations,
    options: { keys: ['name'] },
  });

  let lastRequest: CancelTokenSource;
  const [propertySuggestions, setPropertySuggestions] = useState<PropertySuggestions[]>([]);
  const updateProperties = (query: string) => {
    if (lastRequest) {
      lastRequest.cancel('Operation canceled due to new request.');
    }

    if (query && query.length >= 3) {
      lastRequest = axios.CancelToken.source();
      unAuthed
        .get(`/properties/autocomplete?query=${query}&limit=4&offset=0`, {
          cancelToken: lastRequest.token,
          timeout: 3 * 1000 * 60,
        })
        .then((response: AxiosResponse) => {
          setPropertySuggestions(response.data);
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            sentryCaptureException({
              info: 'properties autocomplete request failed',
              error,
            });
          }
        });
    } else {
      setPropertySuggestions([]);
    }
  };

  const dropDownItemStyle = 'flex flex-nowrap block px-4 py-2 text-base leading-5 font-circular | focus:outline-none';

  return (
    <div className={className}>
      <Downshift
        onInputValueChange={(inputValue: any) => {
          updateProperties(inputValue);
          setInputValue(inputValue);
        }}
        initialInputValue={initialValue}
        onChange={(e) => {
          const { name: inputValue }: any = e;
          if (!disable && onChange) onChange(inputValue, generateBounds(e.bounds));
        }}
        itemToString={(item) => (item ? item.name : '')}
        onSelect={(st) => {
          if (!st) return;
          const { name: inputValue }: any = st;
          setState({ selectedObj: st });
          if (onChange) onChange(inputValue, generateBounds(st.bounds));
          selected(inputValue, generateBounds(st.bounds));
          if (submitForm) submitForm(inputValue);
        }}>
        {({ getInputProps, isOpen, inputValue, getItemProps, getMenuProps, openMenu, reset }) => (
          <div className={`relative location-input ${isOpen && width < 768 && 'fixed-location'}`}>
            <div style={{ display: 'inline-block' }} className="w-full input-wrapper">
              <input
                {...getInputProps({
                  onFocus: () => {
                    reset({ inputValue: '' });
                    openMenu();
                  },
                })}
                ref={inputRef}
                value={initialInputValue}
                autoComplete="off"
                className={`${inputClassName} text-18px font-medium input ${!isOpen && 'close'}`}
                placeholder={placeholder}
              />
              <div className="input-icon">
                <AddressIcon width={13} height={16} />
              </div>
            </div>
            {isOpen ? (
              <div
                {...getMenuProps()}
                style={{
                  position: 'absolute',
                  top: 50,
                  left: 0,
                  zIndex: 50,
                  width: '100%',
                }}>
                <div
                  className="bg-white relative overflow-scroll dropdown-wrapper"
                  style={{ maxHeight: '16.5rem', height: 'auto' }}>
                  <div className="overflow-scroll dropdown-location">
                    <p className="dropdown-title ">Cities</p>
                    {inputValue
                      ? fuse.search<Location>(`^${inputValue}`).map((result: any, index: any) => {
                          const { item } = result;
                          return (
                            <a
                              onMouseEnter={() => {
                                setActiveItem(item.name);
                              }}
                              onMouseLeave={() => {
                                setActiveItem('');
                              }}
                              data-testid="city-option"
                              href="#"
                              className={`block px-4 text-sm leading-5 font-circular focus:outline-none city-option  ${
                                item.name === initialValue ? 'active' : ''
                              }`}
                              {...getItemProps({
                                key: item.name,
                                index,
                                item,
                              })}>
                              <div className="city-name">
                                <span className="mr-2">
                                  <Glob width={20} height={20} />
                                </span>{' '}
                                {item.name}
                              </div>
                              {item.name === initialValue && (
                                <div className="option-checked">
                                  <CheckedIcon />
                                </div>
                              )}
                            </a>
                          );
                        })
                      : primaryLocations.map((city, index) => (
                          <a
                            onMouseEnter={() => {
                              setActiveItem(city.name);
                            }}
                            onMouseLeave={() => {
                              setActiveItem('');
                            }}
                            role="option"
                            href="#"
                            className={`block px-4 text-sm leading-5 font-circular focus:outline-none city-option  ${city.name ===
                              initialValue && 'active'}`}
                            {...getItemProps({
                              key: city.name,
                              index,
                              item: city,
                            })}>
                            <div className="city-name">
                              <span className="mr-2">
                                <Glob width={19} height={20} />
                              </span>{' '}
                              {city.name}
                            </div>
                            {city.name === initialValue && (
                              <div className="option-checked">
                                <CheckedIcon />
                              </div>
                            )}
                          </a>
                        ))}
                    <AutocompletePropertySuggestions customClass={dropDownItemStyle} properties={propertySuggestions} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default LocationAutocomplete;
