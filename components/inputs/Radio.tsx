import React from 'react';
import { InputType } from '.';
interface RadioInput extends InputType{
  value:string
}
const RadioInput = React.forwardRef<HTMLInputElement, RadioInput>(
  ({ label, ...props }, ref) => {
    return (
      <div className="form-control">
        <label className="label cursor-pointer flex flex-col">
          {label && <span className="label-text">{label}</span>}
          <input
            ref={ref}
            type="radio"
            className="radio checked:bg-info"
            {...props}
          />
        </label>
      </div>
    );
  }
);

export default RadioInput;
