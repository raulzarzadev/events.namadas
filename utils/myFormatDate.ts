import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function myFormatDate(
  date: string | number | Date | undefined,
  strFormat: string = 'dd MMM yy'
): string {
  if (!date) {
    console.error('No date');
    return '';
  }
  return format(validDateAsNumber(date), strFormat);
}


const validDateAsNumber=(date:string|Date|number):number=>{
  if(typeof date==='string'){
    return new Date(date).getTime()
  }
  if(date instanceof Date){
    return date.getTime()
  }
  if(typeof date ==='number'){
    return date
  }
  return 0
}