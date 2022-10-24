import React from "react";
import { InputType } from ".";

interface InputDateType extends Omit<InputType, 'type'> {
  type: 'date' | 'datetime-local';
}

 const InputDate = React.forwardRef<HTMLInputElement, InputDateType>(
   (props, ref) => {
     const { label, errors, name, type, ...rest } = props;
     return (
       <div className="form-control w-full ">
         <label className="label">{label}</label>
         <input
           {...rest}
           ref={ref}
           type={type}
           name={name}
           className="input  input-bordered"
           aria-invalid={errors[name] ? 'true' : 'false'}
         />
         <label>{errors[name] && <span>{errors[name]}</span>}</label>
       </div>
     );
   }
 );

export default InputDate;