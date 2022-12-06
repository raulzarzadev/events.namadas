import { Event as EventType } from '@firebase/Events/event.model'
import { createEvent, updateEvent } from '@firebase/Events/main'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import myFormatDate from 'utils/myFormatDate'
import FormContent from './FormContent'

const FormEvent = ({ event }: { event: any }) => {
  const eventAlreadyExist = event?.id
  const router = useRouter()
  const currentDate = new Date().getTime()
  const defaultValues: Partial<EventType> = {
    date: myFormatDate(currentDate, 'datetime'),
    finishAt: myFormatDate(currentDate, 'datetime'),
    status: 'HIDDEN',
    subscriptionsOptions: {
      finishAt: myFormatDate(currentDate, 'inputDate'),
      startAt: myFormatDate(currentDate, 'inputDate'),
      limit: 0,
      acceptSubscriptions: false,
      acceptTerms: false
    }
  }

  const methods = useForm({
    defaultValues: event ? { ...defaultValues, ...event } : defaultValues
  })

  const { handleSubmit, watch } = methods

  const hardSubmit = () => {
    console.log('hard submit')
    setFormStatus(FORM_LABELS.loading)
    handleSubmit((props: any) => {
      console.log('submit')
      onSubmit(props)
    })()
  }

  const formValues = watch()
  const onSubmit = (data: any): void => {
    // console.log(data);
    setFormStatus(FORM_LABELS.loading)
    event?.id // eventAlreadyExist
      ? updateEvent(event?.id, data)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            setFormStatus(FORM_LABELS.error)
            console.error(err)
          })
          .finally(() => {
            setFormStatus(FORM_LABELS.saved)
          })
      : createEvent(data)
          .then((res) => {
            const id = res?.res?.id
            if (typeof id === 'string') {
              router.push(`/events/${id}/edit`)
            }
            console.log(res)
          })
          .catch((err) => {
            setFormStatus(FORM_LABELS.error)
            console.error(err)
          })
          .finally(() => {
            setFormStatus(FORM_LABELS.saved)
          })
  }

  const FORM_LABELS = {
    error: {
      // error when saving , should be disabled
      title: '',
      button: 'Error',
      disabled: true
    },
    save: {
      // ready to save if event is new, should be active
      title: 'Create new event',
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

  useEffect(() => {
    if (eventAlreadyExist) {
      setFormStatus(FORM_LABELS?.edit)
    } else {
      setFormStatus(FORM_LABELS.save)
    }
  }, [])

  const [formStatus, setFormStatus] = useState(FORM_LABELS.clean)

  //  console.log(formValues)

  return (
    <div className="relative">
      <Head>
        <title>{formStatus.title}</title>
      </Head>
      <h2 className="text-xl font-bold text-center mt-4 whitespace-pre-wrap">
        {formValues?.title}
      </h2>
      <p className="text-center mb-4">
        {formStatus?.title || 'Create new event'}
      </p>
      {/* @ts-expect-error */}
      <FormProvider {...methods} hardSubmit={hardSubmit}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
          data-test-id="event-form"
          data-test-op={eventAlreadyExist ? 'editing-event' : 'new-event'}
          className={'mb-24 max-w-lg mx-auto px-1'}
        >
          <FormContent />
          <div className="flex justify-around fixed w-full bottom-0 bg-base-200 p-2 border-t-4 border-t-base-100 left-0 right-0">
            <button
              className="btn btn-primary"
              data-test-id="submit-event-form"
              disabled={formStatus.disabled}
            >
              {formStatus.button}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default FormEvent
