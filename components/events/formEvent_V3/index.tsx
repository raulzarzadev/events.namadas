import AddLinksSection from '@comps/forms/AddLinksSection';
import InputFiles, { SetImagesOps } from '@comps/inputs/inputFiles_V2';
import { Event } from '@firebase/Events/event.model';
import { createEvent, deleteEvent, updateEvent } from '@firebase/Events/main';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';
import BasicInformation from './BasicInformation';
import EventDates from './EventDates';
import PricesSection from './PricesSection';
import SubEventsSection from './SubEventsSection';
import Subscriptions from './Subscriptions';

const FormEvent = ({ event }: { event?: Partial<Event> }) => {
  const eventAlreadyExist = event?.id;
  const router = useRouter();
  const currentDate = new Date().getTime();
  const defaultValues: Partial<Event> = {
    date: myFormatDate(currentDate, 'datetime'),
    finishAt: myFormatDate(currentDate, 'datetime'),
    status: 'PLANING',
    subscriptionsOptions: {
      finishAt: myFormatDate(currentDate, 'inputDate'),
      startAt: myFormatDate(currentDate, 'inputDate'),
      limit: 0,
    },
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: event ? { ...defaultValues, ...event } : defaultValues,
  });

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
      handleSubmit((props: any) => {
        onSubmit(props);
      })();
    }
  };

  // console.log(formValues)

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
      <form
        onSubmit={handleSubmit((data: any) => onSubmit(data))}
        data-test-id="event-form"
        data-test-op={eventAlreadyExist ? 'editing-event' : 'new-event'}
      >
        <div className="grid mx-auto gap-2 max-w-md  mb-20">
          {eventAlreadyExist && (
            <InputFiles
              fieldName="eventImage"
              label="Add more images "
              images={formValues?.images}
              setImages={handleSetImages}
              // disabled={disabled}
            />
          )}

          <BasicInformation
            register={register}
            errors={errors}
            formValues={formValues}
            control={control}
          />

          <EventDates
            register={register}
            errors={errors}
            formValues={formValues}
            control={control}
          />

          <AddLinksSection
            control={control}
            errors={errors}
            register={register}
            formValues={formValues}
          />

          <Subscriptions
            register={register}
            errors={errors}
            formValues={formValues}
            control={control}
          />

          {eventAlreadyExist && (
            <SubEventsSection
              register={register}
              errors={errors}
              formValues={formValues}
              control={control}
              setValue={setValue}
            />
          )}
          {eventAlreadyExist && (
            <PricesSection
              register={register}
              errors={errors}
              formValues={formValues}
              control={control}
            />
          )}

          <div className="flex justify-around fixed w-full bottom-0 bg-base-200 p-2 border-t-4 border-t-base-100 left-0 right-0">
            <button
              className="btn btn-primary"
              data-test-id="submit-event-form"
              disabled={formStatus.disabled}
            >
              {formStatus.button}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormEvent;
