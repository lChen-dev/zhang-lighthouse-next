import React, { forwardRef, Ref, useState } from 'react';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { enUS } from 'date-fns/locale';
import classNames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import './css/datepicker.css';

registerLocale('en-US', enUS);
setDefaultLocale('en-US');
interface Props {
  name: string;
  initialValue?: Date;
  min?: Date;
  max?: Date;
  onChange: (date: Date) => void;
  className?: string;
  inline?: boolean;
}

const DatePicker: React.FC<Props> = ({ initialValue, min, max, onChange, name, className, inline }: Props) => {
  const [date, setDate] = useState<Date | null>(initialValue ?? null);
  const CustomInput = forwardRef(({ value, onClick }: { value?: any; onClick?: any }, ref: Ref<HTMLInputElement>) => (
    <input
      ref={ref}
      className={classNames(
        'bg-white rounded border px-4 py-3 font-circular font-normal text-lg w-full border-gray-light focus:border-green focus:outline-none',
        className,
      )}
      onClick={onClick}
      value={value}
      inputMode="none"
      tabIndex={0}
    />
  ));
  return (
    <ReactDatePicker
      calendarClassName={className}
      autoComplete="off"
      name={name}
      inline={inline}
      selected={date}
      onChange={(d) => {
        setDate(d);
        if (d) onChange(d);
      }}
      customInput={<CustomInput />}
      minDate={min}
      maxDate={max}
      tabIndex={0}
      locale={enUS}
      dateFormat="MMMM d, yyyy"
      formatWeekDay={(day) => day.substring(0, 3)}
    />
  );
};

export default DatePicker;
