import React from 'react';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import 'react-phone-input-2/lib/style.css';
export interface InputPhoneType {
  label?:string
  value?:any
  onChange?:any
  helperText?:string
  error?:string
  placeholder?:string
}
const Phone = React.forwardRef(
  ({ onChange, value, label, helperText, error, ...rest }:InputPhoneType, ref) => (
    <div className="form-control w-full max-w-xs">
      <span className="label-text capitalize-first">{label}</span>
      <PhoneInput
        // forwardRef={ref}
        localization={es}
        onChange={(value: any, _data: any, _event: any) => onChange(value)}
        defaultMask=".. .... .. .."
        alwaysDefaultMask
        {...rest}
        onlyCountries={['mx']}
        country={'mx'}
        value={value}
        inputProps={{
          name: 'phone',
          className: 'input input-bordered  w-full pl-11',
        }}
        dropdownClass="bg-base-300"
      />{' '}
      {helperText && <span className="label-text text-info">{helperText}</span>}
      {error && <span className="label-text text-error">{error}</span>}
    </div>
  )
);

export default Phone;
