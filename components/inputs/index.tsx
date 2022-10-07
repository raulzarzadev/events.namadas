import Text  from "./Text";
import Toggle from './Toggle'
import Date from './Date'
export interface InputType {
  label: string;
  name: string;
  errors?: any;
  type?: 'date' | 'text' | 'checkbox' | 'toggle' | 'number';
  rules?: any;
}

export { Text , Toggle , Date }