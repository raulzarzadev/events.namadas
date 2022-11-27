import InputFiles, { SetImagesOps } from '@comps/inputs/inputFiles_V2';
import { Event } from '@firebase/Events/event.model';
import { createEvent, updateEvent } from '@firebase/Events/main';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';

import { Toggle } from '@comps/inputs';
import SubEventsSection from './SubEventSection_v2.tsx';
import EventDates from './EventDates';
import SubscriptionsSection from './SubscriptionsSection';
import PricesSection from './PricesSection';
import StepperForm from './StepperForm';
import BasicInformation from './BasicInformation';
import ParticipantsSection from './ParticipantsSection';
import AddLinksSection from './AddLinksSection';

const FormEvent = ({ event }: { event?: Partial<Event> }) => {
  const eventAlreadyExist = event?.id;
  const router = useRouter();
  const currentDate = new Date().getTime();
  const defaultValues: Partial<Event> = {
    date: myFormatDate(currentDate, 'datetime'),
    finishAt: myFormatDate(currentDate, 'datetime'),
    status: 'HIDDEN',
    subscriptionsOptions: {
      finishAt: myFormatDate(currentDate, 'inputDate'),
      startAt: myFormatDate(currentDate, 'inputDate'),
      limit: 0,
      acceptSubscriptions: false,
      acceptTerms: false,
    },
  };

  const methods = useForm({
    defaultValues: event ? { ...defaultValues, ...event } : defaultValues,
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const hardSubmit = () => {
    console.log('hard submit');
    setFormStatus(FORM_LABELS.loading);
    handleSubmit((props: any) => {
      console.log('submit');
      onSubmit(props);
    })();
  };

  const formValues = watch();
  const onSubmit = (data: Event) => {
    // console.log(data);
    setFormStatus(FORM_LABELS.loading);
    event?.id // eventAlreadyExist
      ? updateEvent(event?.id, data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setFormStatus(FORM_LABELS.error);
            console.error(err);
          })
          .finally(() => {
            setFormStatus(FORM_LABELS.saved);
          })
      : createEvent(data)
          .then((res) => {
            if (res?.ok) {
              router.push(`/events/${res.res.id}/edit`);
            }
            console.log(res);
          })
          .catch((err) => {
            setFormStatus(FORM_LABELS.error);
            console.error(err);
          })
          .finally(() => {
            setFormStatus(FORM_LABELS.saved);
          });
  };

  const FORM_LABELS = {
    error: {
      // error when saving , should be disabled
      title: '',
      button: 'Error',
      disabled: true,
    },
    save: {
      // ready to save if event is new, should be active
      title: 'Create new event',
      button: 'Save',
      disabled: false,
    },
    loading: {
      //  should be disabled
      title: '',
      button: 'Loading',
      disabled: true,
    },
    saved: {
      // successfully saved , should be active
      title: '',
      button: 'Saved',
      disabled: false,
    },
    edit: {
      // event exist form labels should change, should be active
      title: 'Edit event',
      button: 'Edit',
      disabled: false,
    },
    clean: {
      // no modifications and button should be disabled
      title: '',
      button: 'Saved',
      disabled: true,
    },
  };

  useEffect(() => {
    if (eventAlreadyExist) {
      setFormStatus(FORM_LABELS?.edit);
    } else {
      setFormStatus(FORM_LABELS.save);
    }
  }, []);

  const [formStatus, setFormStatus] = useState(FORM_LABELS.clean);
  const handleSetImages = (images: any[], setImagesOps?: SetImagesOps) => {
    if (setImagesOps?.uploading) setFormStatus(FORM_LABELS.loading);
    if (images.length) {
      setValue('images', images);
      hardSubmit();
    }
  };
  // console.log({ errors });

  // console.log(formValues);

  const STEPS = [
    {
      label: 'Information',
      Component: <BasicInformation hardSubmit={hardSubmit} />,
    },
    {
      label: 'Dates',
      Component: <EventDates />,
    },
    {
      label: 'Classify',
      Component: <SubEventsSection />,
    },
    {
      label: 'Participants',
      helperText: 'Esta seccion esta deshabilitada por ahora',
      Component: <ParticipantsSection />,
    },
    {
      label: 'Related ',
      helperText: `Add some links to help users find more information about others
        events, sponsors and social media`,
      Component: (
        <>
          <AddLinksSection />
        </>
      ),
    },
    {
      label: 'Media',
      Component: (
        <InputFiles
          fieldName="eventImage"
          label="Add some images "
          images={formValues?.images}
          setImages={handleSetImages}
          displayAs="row"
          // disabled={disabled}
        />
      ),
    },
  ];

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
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit((data: any) => onSubmit(data))}
          data-test-id="event-form"
          data-test-op={eventAlreadyExist ? 'editing-event' : 'new-event'}
          className={'mb-24 max-w-lg mx-auto px-1'}
        >
          <StepperForm steps={STEPS} />
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
  );
};

export default FormEvent;
