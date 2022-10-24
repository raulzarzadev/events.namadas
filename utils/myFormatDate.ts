import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type FormatType = 'datatime' | 'inputDate' | string

export default function myFormatDate(
  date: string | number | Date | undefined,
  strFormat: FormatType='dd MM yy'
): string {
  if (!date) {
    console.error('No date');
    return '';
  }
  const res = format(validDateAsNumber(date), choosenFormat(strFormat));
  return res;
}

const choosenFormat = (format: FormatType) => {
  if (format === 'datatime') return `yyyy-MM-dd'T'HH:mm`;
  if (format === 'inputDate') return `yyyy-MM-dd`;
  return format;
};

const validDateAsNumber = (date: string | Date | number): number => {
  if (typeof date === 'string') {
    return new Date(date).getTime();
  }
  if (date instanceof Date) {
    return date.getTime();
  }
  if (typeof date === 'number') {
    return date;
  }
  return 0;
};
