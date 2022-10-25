import React from "react";
import { InputType } from ".";

 const Text =React.forwardRef<HTMLInputElement, InputType>((props, ref) => {

  const { label, errors, name='', type } = props;
  return (
    <div className="form-control w-full ">
      <label className="label ">{label}</label>
      <input
        type={type}
        className="input  input-bordered "
        ref={ref}
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...props}
      />
      <label className="label label-text-alt text-error">{errors[name] && <span>{'This field is required'}</span>}</label>
    </div>
  );
});

export default Text