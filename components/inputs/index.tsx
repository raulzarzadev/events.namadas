import Text  from "./Text";
import Toggle from './Toggle'
import InputDate from './InputDate'
import Select from "./Select";
import Chip from "./Chip";
export interface InputType {
  label?: string;
  name: string;
  errors?: any;
  type?: 'date' | 'text' | 'checkbox' | 'toggle' | 'number' ;
  rules?: any;
}

export { Text, Toggle, InputDate , Select , Chip};