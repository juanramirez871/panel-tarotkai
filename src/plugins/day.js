import dayjs from 'dayjs';
import 'dayjs/locale/es';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function setDayjs(app) {
    app.config.globalProperties.$dayjs = dayjs;
}


