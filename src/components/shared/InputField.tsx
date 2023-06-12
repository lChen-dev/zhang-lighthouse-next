import React from 'react';
import { B2 } from '@components/shared/Typography';

type Props = {
  label: string;
  onChange: (val: string) => void;
  value?: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
};

const InputField: React.FC<Props> = ({
  label,
  name,
  onChange,
  value,
  type,
  placeholder,
  disabled,
}: Props) => (
  <label htmlFor={name}>
    <B2 className="mb-1">{label}</B2>
    <input
      defaultValue={value}
      type={type}
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      onChange={({ target: { value: val } }) => onChange(val)}
      className="px-6 border disabled:bg-gray-100 text-gray-dark opacity-75 hover:opacity-100 py-4 rounded flex-1 font-circular w-full focus:outline-none"
    />
  </label>
);

InputField.defaultProps = {
  disabled: false,
};

export default InputField;
