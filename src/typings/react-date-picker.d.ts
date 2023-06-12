import * as ReactDatePicker from 'react-date-picker';

declare module 'react-date-picker' {
  export default function DatePicker(props: DatePickerProps): JSX.Element;

  export interface DatePickerProps extends ReactDatePicker.DatePickerProps {
    onChange?: any;
  }
}
