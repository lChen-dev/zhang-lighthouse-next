/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Downshift from 'downshift';
import React, { useState, useRef } from 'react';
import { AddressIcon, Glob } from '@components/shared/Icons';
import useFuse from '@hooks/useFuse';
import Location from '@models/Location';
import primaryLocations from '@components/funnel/primary_locations.json';
import allLocations from '@components/funnel/locations.json';

import './style.css';

export interface StateProps {}

export interface OwnProps {
  initialValue?: string;
  onChange?: (e: string, o: { SW: number[]; NE: number[] }) => void;
  disabled?: boolean;
  selected: (v: string, o: { SW: number[]; NE: number[] }) => void;
}

export type Props = StateProps & OwnProps;

function query(fuse: any, term: string | null) {
  if (term) {
    const results = fuse.search(`^${term}`);
    return results.map((result: any) => result.item);
  }
  return primaryLocations;
}

const generateBounds = (bounds: any) => {
  const {
    northeast: { lat: nt, lng: nl },
    southwest: { lat: st, lng: sl },
  } = bounds;
  return { SW: [sl, st], NE: [nl, nt] };
};

export const LocationAutocomplete = ({
  initialValue,
  onChange,
  disabled: disable,
  selected,
}: Props): React.ReactElement => {
  const [state, updateState] = useState({
    menuIsOpen: false,
    selectedObj: {},
  });
  const setState = (st = {}) => {
    updateState({ ...state, ...st });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [activeItem, setActiveItem] = useState<string>('');
  const fuse = useFuse<Location>({
    data: allLocations,
    options: { keys: ['name'] },
  });

  return (
    <div className="flex-auto md:w-2/5 font-circular   w-full ">
      <div
        style={{
          position: 'absolute',
          zIndex: 4,
          marginTop: '20px',
          marginLeft: '20px',
        }}>
        <AddressIcon color="#34966D" />
      </div>
      <Downshift
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

          inputRef.current?.blur();
          selected(inputValue, generateBounds(st.bounds));
        }}>
        {({ getInputProps, isOpen, inputValue, getItemProps, getMenuProps, openMenu, reset }) => (
          <div className="relative">
            <div style={{ display: 'inline-block' }} className="w-full">
              <input
                {...getInputProps({
                  onFocus: () => {
                    reset({ inputValue: '' });
                    openMenu();
                  },
                })}
                ref={inputRef}
                value={initialValue}
                autoComplete="no"
                className="grayPlaceholder h-16 py-3 pr-2 appearance-none w-full text-base text-gray-dark font-bold bg-grey-200 placeholder-font-bold"
                style={{
                  borderRadius: '6px',
                  backgroundColor: isOpen ? '#ffffff' : '#eeeeee',
                  paddingLeft: '50px',
                }}
                placeholder="Select city..."
              />
            </div>
            {isOpen ? (
              <div
                className="shadow-xl"
                {...getMenuProps()}
                style={{
                  position: 'absolute',
                  top: 70,
                  left: 0,
                  zIndex: 50,
                  width: '100%',
                }}>
                <div
                  className="rounded-md bg-white shadow-xs relative overflow-scroll"
                  style={{ maxHeight: '16.5rem', height: 'auto' }}>
                  <div className="py-1 overflow-scroll">
                    <p className="px-4 py-2 text-base font-circular color-gray-dark mt-2 ml-3">Cities</p>
                    {query(fuse, inputValue).map((city: any, index: any) => (
                      <a
                        onMouseEnter={() => {
                          setActiveItem(city.name);
                        }}
                        onMouseLeave={() => {
                          setActiveItem('');
                        }}
                        href="#"
                        className="flex flex-nowrap block px-4 py-2 text-base leading-5 font-circular font-bold | focus:outline-none focus:bg-gray-100 focus:text-gray-900 | hover:bg-gray-100 hover:text-brand | ml-3 mr-3"
                        {...getItemProps({ key: city.name, index, item: city })}>
                        <span className="mr-2 text-gray-500">
                          <Glob width={19} height={20} color={activeItem === city.name ? '#34966D' : undefined} />
                        </span>{' '}
                        {city.name}
                      </a>
                    ))}
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
