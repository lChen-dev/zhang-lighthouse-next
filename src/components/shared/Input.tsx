import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { DebounceInput } from 'react-debounce-input';
import InputMask from 'react-input-mask';

interface Props {
  initialValue?: string | number;
  value?: string | number;
  onChange?: (val?: string | number) => void;
  onBlur?: (val?: string | number) => void;
  name: string;
  type?: string;
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  prefix?: string | React.ReactNode;
  mask?: string;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
  autoComplete?: string;
  className?: string;
  debounce?: boolean;
  reinitialize?: boolean;
  hasError?: boolean;
}

const Input: React.FC<Props> = ({
  initialValue,
  value,
  onChange,
  onBlur,
  placeholder,
  name,
  type,
  mask,
  prefix,
  inputMode,
  autoComplete,
  className,
  reinitialize,
  debounce,
  hasError,
  ...props
}: Props) => {
  const [initValue, setInitValue] = useState(initialValue ?? '');
  const [internalValue, setInternalValue] = useState(initialValue ?? '');
  const [focus, setFocus] = useState(false);
  const InputComponent = debounce ? DebounceInput : 'input';

  useEffect(() => {
    if (reinitialize && initValue !== initialValue) {
      setInternalValue(initialValue ?? '');
      setInitValue(initialValue ?? '');
    }
  }, [initialValue, reinitialize, initValue]);

  return (
    <div
      className={classNames(
        'bg-white rounded border flex flex-row items-center',
        {
          'border-red-500': hasError,
          'border-brand': focus && !hasError,
          'border-gray-lighter': !hasError && !focus && (!value || value === ''),
          'border-gray-soft': !hasError && !focus && value && value !== '',
        },
        className,
      )}>
      {prefix && <span className="pl-4">{prefix}</span>}
      {mask ? (
        <InputMask
          autoComplete={autoComplete}
          className="px-4 py-3 rounded font-circular font-normal text-lg align-baseline focus:outline-none appearance-none w-full"
          name={name}
          type={type}
          tabIndex={0}
          value={value || internalValue}
          placeholder={placeholder}
          inputMode={inputMode}
          mask={mask}
          onFocus={() => setFocus(true)}
          onChange={({ target: { value: val } }): void => {
            if (typeof onChange === 'function') onChange(val);
            setInternalValue(val);
          }}
          onBlur={(): void => {
            if (typeof onBlur === 'function') onBlur(value || internalValue);
            setFocus(false);
          }}
        />
      ) : (
        <InputComponent
          {...props}
          onFocus={() => setFocus(true)}
          className="px-4 py-3 rounded font-circular font-normal text-lg align-baseline focus:outline-none appearance-none w-full"
          name={name}
          type={type}
          value={value || internalValue}
          tabIndex={0}
          inputMode={inputMode}
          placeholder={placeholder}
          minLength={2}
          debounceTimeout={300}
          onChange={({ target: { value: val } }: any): void => {
            onChange && onChange(val);
            setInternalValue(val);
          }}
          onBlur={(): void => {
            onBlur && onBlur(value || internalValue);
            setFocus(false);
          }}
        />
      )}
    </div>
  );
};

Input.defaultProps = {
  initialValue: undefined,
  type: 'text',
};

export default Input;
