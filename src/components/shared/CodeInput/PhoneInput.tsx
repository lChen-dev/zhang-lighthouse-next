import React, { useState } from 'react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input/input';

import CountrySelect from '@components/shared/CodeInput/CountrySelect';

import en from 'react-phone-number-input/locale/en.json';
import { ArrowLeft, SelectIndicatorSVG } from '../Icons';

const Phone = ({ formPhoneNumber, onChange }: { formPhoneNumber?: string | null | ''; onChange?: any }) => {
  const [country, setCountry] = useState({
    value: 'United States | US',
    label: (
      <div className="o-country-option">
        <img src="https://flag.pk/flags/1x1/US.svg" className="o-flag-icon" alt="United States flag" />
        <span>United States</span>
      </div>
    ),
  });
  return (
    <fieldset className="relative pt-4">
      <label
        className="absolute text-gray-soft bg-white w-32 ml-4 top-0 z-10 o-text-input__label"
        style={{ whiteSpace: 'nowrap', left: '-2px', top: '1px', fontSize: '14px' }}
      >
        Your phone number
      </label>
      <div
        className="flex authpopup:rounded-lg p-4 o-phone-number-text-input md:text-left text-center border-b border-r-gray-lighter font-circular w-full authpopup:border authpopup:border-gray-lighter  justify-items-start"
        style={{
          lineHeight: '150%',
          fontSize: '16px' /* 
          borderRadius: '8px', */,
          padding: '12px 15px',
          color: '#2A343A',
          fontFamily: 'Circular',
        }}
      >
        <div /* className="mobile-md:block hidden" */>
          <CountrySelect
            labels={en}
            value={country}
            onChange={setCountry}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => <SelectIndicatorSVG />,
            }}
          />
        </div>
        <div className="block mx-auto">
          <span className="text-14px text-gray-medium px-2">
            +{getCountryCallingCode(country.value.split(' | ')[1])}
          </span>
          <PhoneInput
            defaultCountry="US"
            useNationalFormatForDefaultCountryValue={false}
            country={country.value.split(' | ')[1].trim()}
            placeholder="(---) --- ----"
            maxLength={14}
            value={formPhoneNumber}
            onChange={onChange}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default Phone;
