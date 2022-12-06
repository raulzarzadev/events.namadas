import React from 'react'
import { InputType } from '.'
export interface TextType extends Omit<InputType, 'size'> {}
const Text = React.forwardRef<HTMLInputElement, TextType>((props, ref) => {
  const { label, errors = {}, name = '', type, helpertext = '' } = props
  return (
    <div className="form-control w-full ">
      <label className="label-text ">{label}</label>
      <input
        type={type}
        className="input  input-bordered "
        ref={ref}
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...props}
      />

      <label
        className={`label label-text-alt ${
          !(errors[name] || helpertext) ? 'hidden' : ''
        }`}
      >
        {errors[name] && (
          <span className="text-error">{'This field is required'}</span>
        )}
        {helpertext && <span className="text-info">{helpertext}</span>}
      </label>
    </div>
  )
})
Text.displayName = 'Text'

export default Text
