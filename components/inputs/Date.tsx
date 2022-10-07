import React from "react";
import { InputType } from ".";

 const Date =React.forwardRef<HTMLInputElement, InputType>((props, ref) => {

  const { label, errors, name, type, ...rest } = props;
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">{label}</label>
      <input
        type='date'
        name={name}
        className="input  input-bordered"
        ref={ref}
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...rest}
      />
      <label>{errors[name] && <span>{errors[name]}</span>}</label>
    </div>
  );
});

export default Date