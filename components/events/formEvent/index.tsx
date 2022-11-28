// import InputFiles, { SetImagesOps } from '@comps/inputs/inputFiles_V2'
import { Event } from '@firebase/Events/event.model'
import { createEvent, updateEvent } from '@firebase/Events/main'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import myFormatDate from 'utils/myFormatDate'

// import SubEventsSection from './SubEventSection_v2'
// import EventDates from './EventDates'
// import StepperForm from './StepperForm'
// import BasicInformation from './BasicInformation'
// import ParticipantsSection from './ParticipantsSection'
// import AddLinksSection from './AddLinksSection'

const FormEvent = ({ event }: { event?: Partial<Event> }) => {
  // const eventAlreadyExist = event?.id
  // const router = useRouter()
  // const currentDate = new Date().getTime()
  // const defaultValues: Partial<Event> = {
  //   date: myFormatDate(currentDate, 'datetime'),
  //   finishAt: myFormatDate(currentDate, 'datetime'),
  //   status: 'HIDDEN',
  //   subscriptionsOptions: {
  //     finishAt: myFormatDate(currentDate, 'inputDate'),
  //     startAt: myFormatDate(currentDate, 'inputDate'),
  //     limit: 0,
  //     acceptSubscriptions: false,
  //     acceptTerms: false
  //   }
  // }

  // const methods = useForm({
  //   defaultValues: event ? { ...defaultValues, ...event } : defaultValues
  // })

  // const { handleSubmit, watch } = methods

  // const hardSubmit = () => {
  //   console.log('hard submit')
  //   setFormStatus(FORM_LABELS.loading)
  //   handleSubmit((props: any) => {
  //     console.log('submit')
  //     onSubmit(props)
  //   })()
  // }

  // const formValues = watch()
  // const onSubmit = (data: any): void => {
  //   // console.log(data);
  //   setFormStatus(FORM_LABELS.loading)
  //   event?.id // eventAlreadyExist
  //     ? updateEvent(event?.id, data)
  //         .then((res) => {
  //           console.log(res)
  //         })
  //         .catch((err) => {
  //           setFormStatus(FORM_LABELS.error)
  //           console.error(err)
  //         })
  //         .finally(() => {
  //           setFormStatus(FORM_LABELS.saved)
  //         })
  //     : createEvent(data)
  //         .then((res) => {
  //           const id = res?.res?.id
  //           if (typeof id === 'string') {
  //             router.push(`/events/${id}/edit`)
  //           }
  //           console.log(res)
  //         })
  //         .catch((err) => {
  //           setFormStatus(FORM_LABELS.error)
  //           console.error(err)
  //         })
  //         .finally(() => {
  //           setFormStatus(FORM_LABELS.saved)
  //         })
  // }

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

  // useEffect(() => {
  //   if (eventAlreadyExist) {
  //     setFormStatus(FORM_LABELS?.edit)
  //   } else {
  //     setFormStatus(FORM_LABELS.save)
  //   }
  // }, [])

  // const [formStatus, setFormStatus] = useState(FORM_LABELS.clean)

  // const handleSetImages = (images: any[], setImagesOps?: SetImagesOps) => {
  //   if (setImagesOps?.uploading) setFormStatus(FORM_LABELS.loading)
  //   if (images.length) {
  //     setValue('images', images)
  //     hardSubmit()
  //   }
  // }
  // console.log({ errors });

  // console.log(formValues);

  // const STEPS = [
  //   {
  //     label: 'Information',
  //     Component: <BasicInformation />
  //   },
  //   {
  //     label: 'Dates',
  //     Component: <EventDates />
  //   },
  //   {
  //     label: 'Sub Events',
  //     Component: <SubEventsSection />
  //   },
  //   {
  //     label: 'Participants',
  //     helperText: 'Esta seccion esta deshabilitada por ahora',
  //     Component: <ParticipantsSection />
  //   },
  //   {
  //     label: 'Related ',
  //     helperText: `Add some links to help users find more information about others
  //       events, sponsors and social media`,
  //     Component: (
  //       <>
  //         <AddLinksSection />
  //       </>
  //     )
  //   },
  //   {
  //     label: 'Media',
  //     Component: (
  //       <InputFiles
  //         fieldName="eventImage"
  //         label="Add some images "
  //         images={formValues?.images}
  //         setImages={handleSetImages}
  //         displayAs="row"
  //         // disabled={disabled}
  //       />
  //     )
  //   }
  // ]

  return <div className="relative"></div>
}

export default FormEvent
