import React, { ReactNode, useEffect, useState } from 'react';
import './style.css';
import { CrossSVG } from '@components/shared/Icons';
import shortid from 'shortid';
import classNames from 'classnames';
import { isInlineAuth } from '@components/auth/functions';

interface Props {
  Label?: string;
  validation?: Function;
  onChange?: Function;
  Icon?: React.ReactNode;
  value?: string;
  onClickCancel?: (e: any) => any;
  inputClassName?: string;
  className?: string;
}
const FloatingInput = ({
  Label,
  validation,
  value,
  onChange,
  onClickCancel,
  inputClassName,
  className,
  Icon,
}: Props): React.ReactElement => {
  const [error, setError] = useState('');
  const [btnId, setBtnId] = useState('');
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setBtnId(shortid());
  }, []);
  return (
    <div className={classNames('label-float w-full  font-circular', className)}>
      <input
        placeholder="label"
        type="text"
        onFocus={() => setFocus(true)}
        onBlurCapture={() => setFocus(false)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(error.length > 0 ? { valid: false } : {})}
        value={value}
        onChange={(e): void => {
          setError('');
          if (onChange) onChange(e);
        }}
        className={
          inputClassName
            ? `font-circular ${Icon && isInlineAuth() ? 'pl-8 mbp:pl-3 ' : 'pl-3'} ${inputClassName}`
            : `mbp:rounded-lg font-circular ${Icon && isInlineAuth() ? 'pl-8 mbp:pl-3 ' : ' pl-3'}`
        }
        onBlur={(): void => {
          if (validation && value) {
            if (value.length > 0) {
              // ? validation is a callback that return error string
              const validationResult = validation(value);
              setError(validationResult);
            }
          }
        }}
      />
      <label htmlFor={`btn_${btnId}`} className={`${Icon && isInlineAuth() ? 'pl-8' : 'ml-3'}`}>
        {Label}
      </label>
      {Icon && isInlineAuth() && (
        <div style={{ marginTop: '29px' }} className={`absolute top-0 ${focus ? 'text-gray-blue' : ' text-gray-soft'}`}>
          {Icon}
        </div>
      )}
      {onClickCancel && (
        <button
          id={`btn_${btnId}`}
          type="button"
          onClick={onClickCancel}
          className="absolute  right-0 mt-5 mr-4 text-gray-medium font-medium text-xl">
          <CrossSVG />{' '}
        </button>
      )}
      {error && <div className="text-red-500 text-xs font-circular font-bold pl-3">{error}</div>}
    </div>
  );
};

export default FloatingInput;
