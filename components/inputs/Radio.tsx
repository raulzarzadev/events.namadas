import React from 'react';
import { InputType } from '.';
interface RadioInput extends Omit<InputType, 'size'> {
  value: string;
  onChange: any;
}
const RadioInput = React.forwardRef<HTMLInputElement, RadioInput>(
  ({ label, onChange, ...props }, ref) => {
    return (
      <div className="form-control">
        <label className="label cursor-pointer flex flex-col">
          {label && (
            <span className="label-text whitespace-nowrap">{label}</span>
          )}
          <input
            ref={ref}
            type="radio"
            className="radio checked:bg-info"
            onChange={onChange}
            {...props}
          />
        </label>
      </div>
    );
  }
);

export default RadioInput;
