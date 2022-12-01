import { FC } from 'react'
import { FormProvider, FormProviderProps } from 'react-hook-form'

interface Props extends FormProviderProps<any, any> {
  hardSubmit: () => void
}

export const MyFormProvider: FC<Props> = ({
  children,
  hardSubmit,
  ...formProps
}) => {
  return (
    <FormProvider {...formProps}>
      {children}
      {/* <button onClick={hardSubmit}>hard submit</button> */}
    </FormProvider>
  )
}
