import { format, formatDistanceStrict } from 'date-fns';
import { es } from 'date-fns/locale';

type FormatType = 'datatime' | 'inputDate' | string

export default function myFormatDate(
  date: string | number | Date | undefined,
  strFormat: 'datatime' | 'inputDate' | string
): string {
  if (!date) {
    console.error('No date');
    return '';
  }
  const res = format(validDateAsNumber(date), choosenFormat(strFormat));
  return res;
}

export const fromNow=(date: string | number | Date,options: { addSuffix?: boolean | undefined; unit?: "second" | "minute" | "hour" | "day" | "month" | "year" | undefined; roundingMethod?: "floor" | "ceil" | "round" | undefined; locale?: Locale | undefined; } | undefined) =>{
  return formatDistanceStrict(new Date(date), new Date(),options)
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

export const sortFromNow = (a: any, b: any) => {
  const currentTime = new Date().getTime();
  const aDiference = Math.abs(a?.date - currentTime);
  const baDiference = Math.abs(b?.date - currentTime);
  if (aDiference < baDiference) return -1;
  if (aDiference > baDiference) return 1;
  return 0;
};