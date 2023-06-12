import React, { useState } from 'react';

export type SelectOption = {
  label: string | number;
  value?: string | number | string[];
  disabled?: boolean;
};

interface Props {
  initialValue?: string | number;
  onChange: (val: string | number) => void;
  options: SelectOption[];
  name: string;
  arrowColor?: string;
  className?: string;
  inputClassName?: string;
}

const Select: React.FC<Props> = ({
  initialValue,
  onChange,
  options,
  name,
  arrowColor = '#FA8946',
  className,
  inputClassName,
}: Props) => {
  const [value, setValue] = useState(initialValue ?? '');
  return (
    <div className={`select-wrapper bg-white ${className}`}>
      <select
        tabIndex={0}
        className={
          inputClassName ||
          'px-4 py-3 rounded border border-gray-medium font-circular font-normal text-lg align-baseline focus:border-green focus:outline-none appearance-none w-full box-border'
        }
        onChange={({ target: { value: val } }) => {
          setValue(val);
          onChange(val);
        }}
        value={value}
        name={name}
      >
        {options?.map(({ label, value: val, disabled }) => (
          <option disabled={disabled} value={val ?? label} key={`${name}-${label}`}>
            {label}
          </option>
        ))}
      </select>
      <div className="arrow-wrapper">
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 12L-6.44168e-08 1.47368L1.54 -8.94335e-07L11 9.05263L20.46 -6.73155e-08L22 1.47368L11 12Z"
            fill={arrowColor}
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
