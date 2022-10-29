import InputFiles from '@comps/inputs/inputFiles_V2';
import { Event } from '@firebase/Events/event.model';
import { createEvent, updateEvent } from '@firebase/Events/main';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';
import BasicInformation from './BasicInformation';
import EventDates from './EventDates';
import FormSection from './FormSection';
import PricesSection from './PricesSection';
import Subscriptions from './Subscriptions';

const FormEvent = ({ event }: { event?: Partial<Event> }) => {
  
  const eventAlreadyExist = event?.id;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { ...event } || undefined,
  });
  const formValues = watch();
 
  const setEventOptionalDatesBasedInEventDate = () => {
    setValue(
      'subscriptionsOptions.finishAt',
      myFormatDate(formValues.date, 'yyyy-MM-dd')
    );
    setValue(
      'subscriptionsOptions.startAt',
      myFormatDate(new Date().getTime(), 'yyyy-MM-dd')
    );
    if (formValues.includeFinishDate) {
      setValue(
        'finishAt',
        myFormatDate(formValues?.finishAt, `yyyy-MM-dd'T'HH:mm`)
      );
    }
  };

  useEffect(() => {
    if (formValues.date) setEventOptionalDatesBasedInEventDate();
  }, [formValues.date]);

  useEffect(() => {
    setValue('date', myFormatDate(formValues.date, `yyyy-MM-dd'T'HH:mm`));
    setValue(
      'finishAt',
      myFormatDate(formValues.finishAt, `yyyy-MM-dd'T'HH:mm`)
    );
  }, []);

  const onSubmit = (data:Event) => {
    event?.id // eventAlreadyExist
      ? updateEvent(event?.id, data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.error(err))
      : createEvent(data)
          .then((res) => {
            if (res?.ok) {
              router.push(`/events/${res.res.id}/edit`);
            }
            console.log(res);
          })
          .catch((err) => console.error(err));
  };








  const formLabel = eventAlreadyExist
    ? `Edit event \n ${event.title}`
    : 'Create event';
  const handleSetImages = (images: any[]) => {
    setValue('images', images);
    handleSubmit((props:any) => {
      onSubmit(props);
    })();
  };

  return (
    <div>
      <Head>
        <title>{formLabel}</title>
      </Head>
      <h2 className="text-xl font-bold text-center my-4 whitespace-pre">
        {formLabel}
      </h2>
      <form
        onSubmit={handleSubmit((data: any) => onSubmit(data))}
        data-test-id="event-form"
      >
        <div className="grid mx-auto gap-2 max-w-md  ">
         
          <InputFiles
            label="Add more images "
            images={formValues?.images}
            setImages={handleSetImages}
            // disabled={disabled}
          />

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

          <Subscriptions
            register={register}
            errors={errors}
            formValues={formValues}
            control={control}
          />

          <PricesSection
            register={register}
            errors={errors}
            formValues={formValues}
            control={control}
          />

          <FormSection title="">
            <div className="flex justify-around">
              <button className="btn btn-error" disabled>
                Delete{' '}
              </button>
              <button className="btn btn-primary">Save </button>
            </div>
          </FormSection>
          
        </div>
      </form>
    </div>
  );
};

export default FormEvent;
