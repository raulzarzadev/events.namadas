import React from "react";
import { InputType } from ".";

 const Toggle = React.forwardRef<HTMLInputElement, InputType>(
  (props, ref) => {
    const { label, errors, name, ...rest } = props;
    return (
      <div className="form-control w-full max-w-xs">
        <label className="label cursor-pointer">
          <span className="label-text">{label}</span>
          <input
            name={name}
            type="checkbox"
            className="toggle toggle-sm toggle-accent"
            ref={ref}
            {...rest}
            aria-invalid={errors[name] ? 'true' : 'false'}
          />
        </label>
        <label>{errors[name] && <span>{errors[name]}</span>}</label>
      </div>
    );
  }
);
export default Toggle