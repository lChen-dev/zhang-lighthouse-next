import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

interface Props {
  initialValue?: string;
  onChange?: (val?: string) => void;
  name: string;
  placeholder?: string;
  className?: string;
  reinitialize?: boolean;
  rows?: number;
  hasError?: boolean;
}

const Textarea: React.FC<Props> = ({
  initialValue,
  onChange,
  name,
  placeholder,
  className,
  reinitialize,
  rows,
  hasError,
}: Props) => {
  const [text, setText] = useState(initialValue ?? '');
  const [initVal, setInitVal] = useState(initialValue ?? '');
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (reinitialize && initVal !== initialValue) {
      setText(initialValue ?? '');
      setInitVal(initialValue ?? '');
    }
  }, [initialValue, reinitialize, initVal]);

  return (
    <div
      className={classNames(
        'bg-white rounded border flex flex-row items-center',
        {
          'border-red-500': hasError,
          'border-brand': !hasError && focus,
          'border-gray-lighter': !hasError && !focus && (!text || text === ''),
          'border-gray-soft': !hasError && !focus && text && text !== '',
        },
        className,
      )}>
      <textarea
        onFocus={() => setFocus(true)}
        className="px-4 py-3 rounded font-circular font-normal text-lg align-baseline focus:outline-none appearance-none w-full"
        name={name}
        value={text}
        tabIndex={0}
        rows={rows ?? 3}
        placeholder={placeholder}
        onChange={(e) => {
          const val = e.target.value;
          if (typeof onChange === 'function') onChange(val);
          setText(val);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      />
    </div>
  );
};

export default Textarea;
