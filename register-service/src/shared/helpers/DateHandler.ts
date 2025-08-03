import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as dayjs from 'dayjs';

type Formats = 'YYYY-MM-DD' | 'YYYY-MM' | 'DD/MM/YYYY' | 'date' | 'dayJs' | undefined;
export type DatesTypes = string | Date | number | dayjs.Dayjs | undefined | null;
export type PeriodDate = {
  year: number;
  month: string;
};

class DateHandler {
  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(isSameOrAfter);
    dayjs.extend(customParseFormat);
  }

  TIME_ZONE: string = 'America/Sao_Paulo';

  public formatDateWithTZ<Type>(date: DatesTypes, format: Formats = 'YYYY-MM-DD'): Type {
    const dayjsDate = dayjs.isDayjs(date)
      ? date
      : typeof date === 'string' && date.match(/([-+]\d{2}:\d{2})$/)
        ? dayjs(date)
        : dayjs.tz(date, this.TIME_ZONE);

    return this.formatReturn(dayjsDate.tz(this.TIME_ZONE), format) as Type;
  }

  private formatReturn(date: dayjs.Dayjs, format: Formats) {
    if (format === 'date') return date.toDate();
    if (format === 'dayJs') return date;
    return date.format(format);
  }

  public isSameOrAfter(start: DatesTypes, end: DatesTypes) {
    return dayjs(end).isSameOrAfter(dayjs(start));
  }

  public isValid(date: DatesTypes) {
    return dayjs(date).isValid();
  }
}

export default new DateHandler();
