import { ReactNode } from 'react'

const FormSection = ({
  children,
  title,
  className = 'bg-base-200'
}: {
  children: ReactNode
  title: string
  className?: string
}) => {
  return (
    <div className={`${className} py-2 my-2  rounded-md `}>
      <h3 className="font-bold sticky -top-1  bg-inherit py-1 ">{title}</h3>
      <div className="p-1">{children}</div>
    </div>
  )
}

export default FormSection
