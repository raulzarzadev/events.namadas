import React from 'react'
interface InputContentType {
  children: React.ReactNode
  label: string
  helperText?: string
}
const InputContainer = ({
  children,
  label = '',
  helperText = ''
}: InputContentType) => (
  <div className="form-control w-full ">
    <label className="label-text ">{label}</label>
    {children}
    <label className={`label label-text-alt `}>{helperText}</label>
  </div>
)

export default InputContainer
