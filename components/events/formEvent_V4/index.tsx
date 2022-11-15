import AddLinksSection from '@comps/forms/AddLinksSection';
import InputFiles, { SetImagesOps } from '@comps/inputs/inputFiles_V2';
import StepperForm from '@comps/events/formEvent_V4/StepperForm';
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
import SubscriptionsSection from './SubscriptionsSection';
import SubEventsSection from './SubEventSection_v2.tsx';
import { Toggle } from '@comps/inputs';

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
  // console.log({ errors });

  // console.log(formValues)

  const isAnOutsideEvent = formValues.status === 'OUTSIDE'; // this is when te event is organized by others and this event is just republished in nadamas.
  const acceptSubscriptions =
    formValues.subscriptionsOptions?.acceptSubscriptions;
  const acceptTerms = formValues.subscriptionsOptions?.acceptTerms;
  const STEPS = [
    {
      label: 'Information',
      Component: (
        <BasicInformation
          register={register}
          errors={errors}
          formValues={formValues}
          control={control}
        />
      ),
    },
    {
      label: 'Dates',
      Component: (
        <EventDates
          register={register}
          errors={errors}
          formValues={formValues}
          control={control}
        />
      ),
    },
    {
      label: 'Classify',
      Component: (
        <SubEventsSection
          register={register}
          errors={errors}
          formValues={formValues}
          control={control}
          setValue={setValue}
          hideSubEvents={isAnOutsideEvent}
        />
      ),
    },
    {
      label: 'Participants',
      helperText: 'Esta seccion esta deshabilitada por ahora',
      Component: (
        <>
          <div>
            <Toggle
              disabled={!acceptTerms}
              label="Organizar evento"
              {...register('subscriptionsOptions.acceptSubscriptions')}
            />
          </div>
          {acceptSubscriptions ? (
            <>
              <SubscriptionsSection
                register={register}
                errors={errors}
                formValues={formValues}
                control={control}
              />
              <PricesSection
                disabled={isAnOutsideEvent}
                register={register}
                errors={errors}
                formValues={formValues}
                control={control}
                event={event}
              />
            </>
          ) : (
            <>
              <div className="flex items-center">
                <input
                  disabled
                  type={'checkbox'}
                  className="checkbox m-2"
                  {...register('subscriptionsOptions.acceptTerms')}
                />
                <p>
                  Aceptar terminos y condiciones para organizar un evento en
                  nadamas
                </p>
              </div>
            </>
          )}
        </>
      ),
    },
    // {
    //   label: 'Prices',
    //   Component: (
    //     <>
    //       {isAnOutsideEvent ? (
    //         <div className="max-w-sm mx-auto text-center my-4">
    //           This option is disabled since the event is organized outside of
    //           nadamas
    //         </div>
    //       ) : (
    //         <PricesSection
    //           disabled={isAnOutsideEvent}
    //           register={register}
    //           errors={errors}
    //           formValues={formValues}
    //           control={control}
    //           event={event}
    //         />
    //       )}
    //     </>
    //   ),
    // },
    // {
    //   label: 'Registry',
    //   Component: (
    //     <>
    //       {isAnOutsideEvent ? (
    //         <div className="max-w-sm mx-auto text-center my-4">
    //           This option is disabled since the event is organized outside of
    //           nadamas
    //         </div>
    //       ) : (
    //         <SubscriptionsSection
    //           register={register}
    //           errors={errors}
    //           formValues={formValues}
    //           control={control}
    //         />
    //       )}
    //     </>
    //   ),
    // },
    {
      label: 'Related ',
      helperText: `Add some links to help users find more information about others
        events, sponsors and social media`,
      Component: (
        <>
          <AddLinksSection
            register={register}
            errors={errors}
            formValues={formValues}
            control={control}
            setValue={setValue}
          />
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
          displayAs="grid"
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
    </div>
  );
};

export default FormEvent;
