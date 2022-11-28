/* eslint-disable @typescript-eslint/no-misused-promises */
import { Text, Toggle } from '@comps/inputs'
import InputFiles, { SetImagesOps } from '@comps/inputs/inputFiles_V2'
import Phone from '@comps/inputs/Phone'
import Textarea from '@comps/inputs/Textarea'
import { updateCompany } from '@firebase/Users/main'
import { User } from '@firebase/Users/user.model'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const FORM_LABELS = {
  error: {
    // error when saving , should be disabled
    title: '',
    button: 'Error',
    disabled: true
  },
  save: {
    // ready to save if event is new, should be active
    title: 'Create new user',
    button: 'Save',
    disabled: false
  },
  loading: {
    //  should be disabled
    title: '',
    button: 'Loading',
    disabled: true
  },
  saved: {
    // successfully saved , should be active
    title: '',
    button: 'Saved',
    disabled: false
  },
  edit: {
    // event exist form labels should change, should be active
    title: 'Edit event',
    button: 'Edit',
    disabled: false
  },
  clean: {
    // no modifications and button should be disabled
    title: '',
    button: 'Saved',
    disabled: true
  }
}

export default function CompanyForm({
  company
}: {
  company: User['companyInfo']
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    setValue,
    reset
  } = useForm({
    defaultValues: {
      ...company
    }
  })

  const [formStatus, setFormStatus] = useState(FORM_LABELS.clean)

  useEffect(() => {
    setFormStatus(FORM_LABELS.save)
  }, [isDirty])

  const onSubmit = async (form: any) => {
    setFormStatus(FORM_LABELS.loading)
    console.log(form)
    try {
      form?.id &&
        (await updateCompany(form?.id, form).then((res) => console.log(res)))
      setFormStatus(FORM_LABELS.saved)
      reset(formValues, { keepValues: true })
    } catch (error) {
      setFormStatus(FORM_LABELS.error)
    }
  }

  const formValues = watch()

  const handleSetImages = (images: any[], setImagesOps?: SetImagesOps) => {
    // if (setImagesOps?.uploading) setFormStatus(FORM_LABELS.loading);
    if (images.length) {
      setValue('images', images)
      handleSubmit((props: any) => {
        onSubmit(props)
      })()
    }
  }

  return (
    <div className="relative my-2 mb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex justify-end sticky top-0 p-2 bg-base-100 z-10">
          <button className="btn btn-primary " disabled={formStatus.disabled}>
            {formStatus.button}
          </button>
        </div>
        <InputFiles
          fieldName={`company/${formValues.name ?? ''}`}
          label="Add some  images about your agency "
          images={formValues?.images}
          setImages={handleSetImages}
        />
        <Toggle
          errors={errors}
          label="Is visible"
          {...register('isVisible')}
          helpertext={
            formValues?.isVisible
              ? 'Any can find your company and visit the company profile'
              : null
          }
        />
        <Text
          label={'Company name'}
          placeholder="Company/Agency name"
          {...register('name', {
            value: formValues?.name ?? ''
          })}
          errors={errors}
        />
        <Textarea
          label={'Presentation'}
          placeholder="A small description of your company, there goals and the values can be a good presentation"
          {...register('resume', {
            value: formValues?.resume ?? null
          })}
          rows={2}
          errors={errors}
        />
        <h2 className="font-bold my-4">Company contacts</h2>
        <Phone
          label={' Phone Number '}
          placeholder="Phone (optional)"
          //  error={errors.name.message}
          onChange={(value: any) => {
            setValue('phone', value)
          }}
          value={formValues?.phone}
        />
        <Text
          label={'Email'}
          placeholder="Company Email (recommended)"
          {...register('email', {
            value: formValues?.email ?? null
          })}
          errors={errors}
        />
      </form>
    </div>
  )
}
