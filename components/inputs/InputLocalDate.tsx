import React from 'react'
import { InputType } from '.'

export interface InputLocalDateType extends Omit<InputType, 'size'> {
  value: string
}

const InputLocalDate = React.forwardRef<HTMLInputElement, InputLocalDateType>(
  (props, ref) => {
    const { label, errors = {}, name, ...rest } = props
    return (
      <div className="form-control  mx-auto w-full">
        <label className="label">{label}</label>
        <input
          type={'datetime-local'}
          name={name}
          className="input  input-bordered "
          ref={ref}
          aria-invalid={errors[name] ? 'true' : 'false'}
          {...rest}
        />
        <label>{errors[name] && <span>{errors[name]}</span>}</label>
      </div>
    )
  }
)

InputLocalDate.displayName = 'InputLocalDate'

export default InputLocalDate
