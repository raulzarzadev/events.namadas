import React from "react";
import { InputType } from ".";

interface SelectInput extends Omit<InputType, 'type' >{
  options: SelectOption[]
  placeholder?:string
}
interface SelectOption {
  value:string|number,
  label:string
}

 const Select = React.forwardRef<HTMLSelectElement, SelectInput>((props, ref) => {
   const { label, errors, name, options, placeholder='Select an opiton',...rest } = props;
   return (
     <div className="form-control w-full ">
       <label className="label">{label}</label>
       <select
         // type={type}
         name={name}
         className="input  input-bordered"
         ref={ref}
         aria-invalid={errors[name] ? 'true' : 'false'}
         {...rest}
         defaultValue=''
       >
         {placeholder&& <option value={''}>{placeholder}</option>}
         {options.map((option) => (
           <option key={option.value} value={option.value}>{option.label}</option>
         ))}
       </select>
       <label>{errors[name] && <span>{errors[name]}</span>}</label>
     </div>
   );
 });

export default Select;