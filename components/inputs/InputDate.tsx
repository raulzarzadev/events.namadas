import React from 'react'
import { InputType } from '.'

interface InputDateType extends Omit<InputType, 'type' | 'size'> {
  type: 'date' | 'datetime-local'
}

const InputDate = React.forwardRef<any, InputDateType>((props, ref) => {
  const { label, errors, name, type, ...rest } = props
  return (
    <div className="form-control w-full ">
      <label className="label">{label}</label>
      <input
        ref={ref}
        type={type}
        name={name}
        className="input  input-bordered"
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...rest}
      />
      <label>{errors[name] && <span>{errors[name]}</span>}</label>
    </div>
  )
})

InputDate.displayName = 'InputDate'

export default InputDate
