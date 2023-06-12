import Select from 'react-select';

const getCountries = () => {
  return [
    'AU',
    'AT',
    'BE',
    'CA',
    'CL',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'HK',
    'HU',
    'IL',
    'IT',
    'LT',
    'MX',
    'NL',
    'PH',
    'PL',
    'PT',
    'PR',
    'SG',
    'SK',
    'SE',
    'CH',
    'ZA',
    'GB',
    'US',
  ];
};
const customStyles = {
  // For the select it self, not the options of the select
  control: (styles, { isDisabled }) => {
    return {
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'default',
      // This is an example: backgroundColor: isDisabled ? 'rgba(206, 217, 224, 0.5)' : 'white'
      color: isDisabled ? '#aaa' : 'white',
    };
  },
  // For the options
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? '#f1f2f7' : '#A5c3ce',
      color: '#000',
      display: isDisabled ? 'none' : 'block',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  dropdownIndicator: (base) => ({
    ...base,
    color: '#34966D', // Custom colour
  }),
};
const ACCEPTED_COUNTRIES = ['US'];
const CountrySelect = ({ value, onChange, labels, ...rest }) => {
  const countries = getCountries().map((country) => {
    return {
      value: `${labels[country]} | ${country}`,
      label: (
        <div className="o-country-option bg-bl md:text-16px text-10px">
          <img className="o-flag-icon" src={`https://flag.pk/flags/4x3/${country}.svg`} alt={labels[country]} />
          <span className="text-black">{labels[country]}</span>
        </div>
      ),
      isDisabled: !ACCEPTED_COUNTRIES.includes(country),
    };
  });

  return (
    <Select
      {...rest}
      value={value}
      onChange={(country) => {
        onChange(country);
      }}
      styles={customStyles}
      options={countries}
    />
  );
};

export default CountrySelect;
