import React from 'react'
import { InputType } from '.'
interface RadioInputType extends Omit<InputType, 'size'> {
  value: string
  onChange: any
}
const RadioInput = React.forwardRef<HTMLInputElement, RadioInputType>(
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
    )
  }
)

RadioInput.displayName = 'RadioInput'

export default RadioInput
