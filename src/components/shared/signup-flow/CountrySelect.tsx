import Select from 'react-select';
import React, { useMemo } from 'react';

import COUNTRIES from './countries.json';

export type OptionType = { label: JSX.Element | string; value: string };

interface Props {
  value: OptionType;
  onChange: (country: OptionType) => void;
  labels: { [key: string]: string };
}

const CountrySelect: React.FC<Props> = ({ value, onChange, labels, ...rest }: Props) => {
  const countries: OptionType[] = useMemo(
    () =>
      COUNTRIES.map((country) => ({
        value: `${labels[country]} | ${country}`,
        label: (
          <div className="o-country-option">
            <img alt={`flag-${country}`} className="o-flag-icon" src={`https://flag.pk/flags/4x3/${country}.svg`} />
            <span>{labels[country]}</span>
          </div>
        ),
      })),
    [labels],
  );

  return (
    <Select
      {...rest}
      value={value}
      onChange={(country) => {
        if (country) onChange(country);
      }}
      options={countries}
    />
  );
};

export default CountrySelect;
