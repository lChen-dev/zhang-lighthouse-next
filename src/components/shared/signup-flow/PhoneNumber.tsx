import React, { useState } from 'react';
import { getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/input';
import * as keyCode from 'keycode-js';
import en from 'react-phone-number-input/locale/en.json';

import CountrySelect, { OptionType } from '@components/shared/signup-flow/CountrySelect';
import classNames from 'classnames';

interface Props {
  onChange: (phoneNumber: string) => void;
  initialValue?: string;
  sendSmsCode?: any;
  name?: string;
  disabled?: boolean;
  className?: string;
}

const PhoneNumber: React.FC<Props> = ({ onChange, initialValue, sendSmsCode, name, disabled, className }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(initialValue ?? '');
  const [country, setCountry] = useState<OptionType>({
    value: 'United States | US',
    label: (
      <div className="o-country-option">
        <img alt="flag-us" src="https://flag.pk/flags/1x1/US.svg" className="o-flag-icon" />
        <span>United States</span>
      </div>
    ),
  });

  const selectedCountry = country.value.split(' | ')[1];
  return (
    <div className={classNames('phone-number-text-input w-full border rounded', className)}>
      <CountrySelect labels={en} value={country} onChange={setCountry} />
      <span className="px-2 text-14px text-gray-blue">+{getCountryCallingCode(selectedCountry)}</span>
      <PhoneInput
        defaultCountry="US"
        country={selectedCountry}
        limitMaxLength
        placeholder="(---) --- -- --"
        onKeyUp={(e: any) => {
          const phone = `+${getCountryCallingCode(selectedCountry)} ${e.target.value}`;
          if (e.keyCode === keyCode.KEY_RETURN && isValidPhoneNumber(phone)) {
            setPhoneNumber(phone);
            sendSmsCode();
          }
        }}
        onChange={(phone: string) => {
          setPhoneNumber(phone);
          onChange(phone);
        }}
        value={phoneNumber}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};

export default PhoneNumber;
