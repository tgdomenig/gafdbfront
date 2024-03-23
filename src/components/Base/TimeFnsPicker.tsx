import { Dayjs } from 'dayjs';
import * as React from 'react';
import DateFnsPicker from './DateFnsPicker';
import { PickerTimeProps } from 'antd/es/time-picker';

export interface TimePickerProps extends Omit<PickerTimeProps<Date>, 'picker'> {}

const TimeFnsPicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
  return <DateFnsPicker {...props} picker="time" mode={undefined} ref={ref} />;
});

TimeFnsPicker.displayName = 'TimePicker';

export default TimeFnsPicker;