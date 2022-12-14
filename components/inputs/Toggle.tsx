import React from 'react'
import { InputType } from '.'

export interface ToggleType extends InputType {
  size?: ToggleSizes
  onChange?: any
  onBlur?: any
  checked?: boolean
}

export type ToggleSizes = 'sm' | 'md' | 'lg'
const Toggle = React.forwardRef<HTMLInputElement, ToggleType>((props, ref) => {
  const { label, errors = {}, name, size = 'md', helpertext, ...rest } = props

  const sizing: Record<ToggleSizes, string> = {
    sm: 'toggle-sm',
    md: 'toggle-md',
    lg: 'toggle-lg'
  }

  return (
    <div className="form-control w-full max-w-xs mx-auto ">
      <label className="label cursor-pointer flex justify-center">
        <span className="label-text text-lg mr-2">{label}</span>
        <input
          name={name}
          type="checkbox"
          className={`toggle toggle-accent ${sizing[size]}`}
          ref={ref}
          {...rest}
          aria-invalid={errors[name] ? 'true' : 'false'}
        />
      </label>
      <label>
        {errors[name] && <span>{errors[name]}</span>}
        {helpertext && <span className="label-text-alt">{helpertext}</span>}
      </label>
    </div>
  )
})

Toggle.displayName = 'Toggle'
export default Toggle
