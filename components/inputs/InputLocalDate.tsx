import React from "react";
import { InputType } from ".";

 const InputLocalDate = React.forwardRef<HTMLInputElement, InputType>(
   (props, ref) => {
     const { label, errors, name, type='date', ...rest } = props;
     return (
       <div className="form-control w-full ">
         <label className="label">{label}</label>
         <input
           type={'datetime-local'}
           name={name}
           className="input  input-bordered"
           ref={ref}
           aria-invalid={errors[name] ? 'true' : 'false'}
           {...rest}
         />
         <label>{errors[name] && <span>{errors[name]}</span>}</label>
       </div>
     );
   }
 );

export default InputLocalDate;