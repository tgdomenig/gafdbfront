import { DatePicker } from 'antd';

import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

const DateFnsPicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export default DateFnsPicker;
