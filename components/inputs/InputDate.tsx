import React from "react";
import { InputType } from ".";

 const InputDate = React.forwardRef<HTMLInputElement, InputType>(
   (props, ref) => {
     const { label, errors, name, type, ...rest } = props;
     return (
       <div className="form-control w-full ">
         <label className="label">{label}</label>
         <input
           type="date"
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

export default InputDate;