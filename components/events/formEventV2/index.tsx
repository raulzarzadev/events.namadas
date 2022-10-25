import { InputDate, Text, Toggle } from '@comps/inputs';
import InputFiles from '@comps/inputs/inputFiles_V2';
import InputLocalDate from '@comps/inputs/InputLocalDate';
import PickerSwimmingTests from '@comps/inputs/PickerSwimmingTest';
import RadioInput from '@comps/inputs/Radio';
import Textarea from '@comps/inputs/Textarea';
import { Event, SubEvent } from '@firebase/Events/event.model';
import { createEvent, updateEvent } from '@firebase/Events/main';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';

const FormEvent = ({ event }: { event?: Event }) => {
  const eventAllreadyExist = event?.id;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: event || undefined,
  });

  const onSubmit = (data: Event) => {
    event?.id // eventAllreadyExist
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

  const EVENT_TYPE_OPTIONS = [
    { name: 'swimmingPool', label: 'Swimming Pool' },
    { name: 'openWater', label: 'Open water' },
    // { name: '50m', label: '50m swimming pool' },
    // { name: '250m', label: '25m swimming pool' },
    // '50m':'50m swimming pool'
    // '25m':'25m swimming pool'
  ];
  const EVENT_STATUS_OPTIONS = [
    { name: 'PLANING', label: 'Planing' },
    { name: 'ACTIVE', label: 'Active' },
    // { name: 'PAUSED', label: 'Paused' },
    // { name: 'CANCELED', label: 'Canceled' },
    { name: 'IN_PROGRESS', label: 'In progress' },
    { name: 'FINISHED', label: 'Finished' },
  ];
  const formValues = watch();

  const includeFinishDate = formValues?.includeFinishDate;

  const isOpenWater = formValues?.swimmingType === 'openWater';
  const isSwimmingPool = formValues?.swimmingType === 'swimmingPool';

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'subEvents', // unique name for your Field Array,
  });

  const handleAddSubEvent = () => {
    const appendNewEvent: SubEvent = {
      title: '',
      distance: '',
      comments: '',
      date: '',
      style: '',
    };
    append(appendNewEvent);
  };

  const formLabel = eventAllreadyExist
    ? `Edit event \n ${event.title}`
    : 'Create event';
  const handleSetImages = (images: any[]) => {
    setValue('images', images);
    handleSubmit((props) => {
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
      <form onSubmit={handleSubmit(onSubmit)} data-test-id="event-form">
        <div className="grid mx-auto gap-2 max-w-md  ">
          <EventImages images={formValues.images} setImages={handleSetImages} />
          <FormSection title="Basic information">
            <h4 className="font-bold text-lg">Current event status</h4>
            <div className="flex justify-around flex-grow">
              {EVENT_STATUS_OPTIONS.map(
                ({ name, label }: { name: string; label: string }) => {
                  return (
                    <RadioInput
                      key={name}
                      label={label}
                      {...register('status')}
                      value={name}
                    />
                  );
                }
              )}
            </div>

            <Text
              {...register('address')}
              name="address"
              label=" Address / Location"
              errors={errors}
            />

            <Text
              {...register('title')}
              name="title"
              label="Title"
              errors={errors}
              type="text"
            />

            <Textarea
              {...register('resume')}
              name="resume"
              label="A small resume"
              errors={errors}
              type="text"
            />
          </FormSection>

          <FormSection title="Event dates">
            <Toggle
              label={'Include finish date'}
              {...register('includeFinishDate')}
              name="includeFinishDate"
              errors={errors}
            />

            <InputDate
              {...register('date', {
                value: myFormatDate(formValues.date, 'datatime'),
              })}
              type="datetime-local"
              name="date"
              label="Event date"
              errors={errors}
            />
            {includeFinishDate && (
              <InputDate
                {...register('finishAt', {
                  value: myFormatDate(formValues.finishAt, 'datatime'),
                })}
                type="datetime-local"
                name="finishAt"
                label="Finish date"
                errors={errors}
              />
            )}
          </FormSection>
          <FormSection title="Suscriptions options">
            <Text
              {...register('suscriptionsOptions.limit', {
                valueAsNumber: true,
              })}
              name="suscriptionsOptions.limit"
              label="Limited to:"
              errors={errors}
              type="number"
            />

            <InputDate
              {...register('suscriptionsOptions.startAt')}
              type="date"
              name="suscriptionsOptions.startAt"
              label="Starts at"
              errors={errors}
            />
            <InputDate
              {...register('suscriptionsOptions.finishAt')}
              type="date"
              name="suscriptionsOptions.finishAt"
              label="Finish at"
              errors={errors}
            />
          </FormSection>

          <FormSection title="Sub events">
            <div className="flex justify-around">
              {EVENT_TYPE_OPTIONS.map(
                ({ name, label }: { name: string; label: string }) => {
                  return (
                    <RadioInput
                      key={name}
                      label={label}
                      {...register('swimmingType')}
                      value={name}
                    />
                  );
                }
              )}
            </div>
            {isSwimmingPool && (
              <PickerSwimmingTests
                setTests={(tests) => setValue('subEvents', tests)}
                tests={formValues?.subEvents}
              />
            )}
            {isOpenWater && (
              <div>
                <h4 className="font-bold text-lg">Set sub-events!</h4>

                <div className="grid gap-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-end flex-col bg-base-200 py-4 "
                    >
                      <button
                        type="button"
                        className="btn btn-outline btn-error btn-xs"
                        onClick={() => remove(index)}
                      >
                        Delete
                      </button>
                      <Text
                        {...register(`subEvents.${index}.title`)}
                        label={'Title'}
                        // name={`subEvents.${index}.title`}
                        errors={errors}
                      />

                      <Text
                        {...register(`subEvents.${index}.distance`)}
                        label={'Distance (m)'}
                        type="number"
                        // name={`subEvents.${index}.distance`}
                        errors={errors}
                      />
                      <InputLocalDate
                        {...register(`subEvents.${index}.date`)}
                        label={'Date time'}
                        // name={`subEvents.${index}.title`}
                        errors={errors}
                      />
                      <Text
                        {...register(`subEvents.${index}.comments`)}
                        label={'Coments'}
                        // name={`subEvents.${index}.title`}
                        errors={errors}
                      />
                    </div>
                  ))}
                  <div className="w-full flex justify-center my-2">
                    <button
                      className="btn btn-md "
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddSubEvent();
                      }}
                    >
                      Add a event
                    </button>
                  </div>
                </div>
              </div>
            )}
          </FormSection>
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
export interface EventImages {
  images: any[];
  disabled?: boolean;
  setImages: (images: any[]) => void;
}

const EventImages = ({ images, disabled = false, setImages }: EventImages) => {
  return (
    <div>
      <InputFiles
        label="Add more images "
        images={images}
        setImages={setImages}
        disabled={disabled}
      />
    </div>
  );
};
const FormSection = ({children, title}:{children:ReactNode, title:string})=>{
  return (
  <div className='p-1 py-2 my-2 mx-1 bg-base-200 rounded-md'>
    <h3 className='font-bold' >{title}</h3>
    <div>
      {children}
    </div>
  </div>)
}
export default FormEvent;
