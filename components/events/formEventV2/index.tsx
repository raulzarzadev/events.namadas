import { InputDate, Text, Toggle } from '@comps/inputs';
import InputFiles from '@comps/inputs/inputFiles_V2';
import InputLocalDate from '@comps/inputs/InputLocalDate';
import PickerSwimmingTests from '@comps/inputs/PickerSwimmingTest';
import RadioInput from '@comps/inputs/Radio';
import { Event, SubEvent } from '@firebase/Events/event.model';
import { createEvent, updateEvent } from '@firebase/Events/main';
import Head from 'next/head';
import { useRouter } from 'next/router';
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

  const formValues = watch();

  const includeFinishDate = formValues?.includeFinishDate;
  // const isSportType = formValues?.eventType === 'sportEvent';
  // const isSwimmingEvent =
  //   formValues?.eventType === 'sportEvent' &&
  //   formValues?.sport === 'swimming';
  const isOpenWater = formValues?.swimmingType === 'openWater';
  const isSwimmingPool =
    formValues.swimmingType === '25m' || formValues.swimmingType === '50m';

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
     handleSubmit((props)=>{
      onSubmit(props)
     })()
  };

  return (
    <div>
      <Head>
        <title>{formLabel}</title>
      </Head>
      <h2 className="text-xl font-bold text-center my-4 whitespace-pre">
        {formLabel}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid mx-auto gap-2 max-w-md  ">
          <EventImages images={formValues.images} setImages={handleSetImages} />
          <Text
            {...register('title')}
            name="title"
            label="Title"
            errors={errors}
            type="text"
          />
          <InputDate
            {...register('date', {
              value: myFormatDate(formValues.date, 'yyyy-MM-dd'),
            })}
            name="date"
            label="Date"
            errors={errors}
          />
          <Toggle
            label={'Include finish date'}
            {...register('includeFinishDate')}
            name="includeFinishDate"
            errors={errors}
          />
          {includeFinishDate && (
            <InputDate
              {...register('finishDate', {
                value: myFormatDate(formValues.date, 'yyyy-MM-dd'),
              })}
              name="finishDate"
              label="Finish date"
              errors={errors}
              type="date"
            />
          )}
          <Text
            {...register('address')}
            name="address"
            label=" Address / Location"
            errors={errors}
          />
          <h4 className="font-bold text-lg">Choose type of event</h4>
          <div className="flex justify-around">
            <RadioInput
              label="Open water"
              {...register('swimmingType')}
              value="openWater"
            />
            <RadioInput
              label="25mts Pool"
              {...register('swimmingType')}
              value="25m"
            />
            <RadioInput
              label="50mts Pool"
              {...register('swimmingType')}
              value="50m"
            />
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
          {/*
          {isOpenWater && (
            <div className='text-center'>
              <div className='flex'>
              <Text 
              label='Label'
              errors={errors}
              {register}
              />

              <Text
                type="number"
                label={'Custom distance (mts)'}
                {...register('distance')}
                errors={errors}
                />
                </div>
              <button className='btn btn-sm btn-outline' >Add distance</button>
            </div>
          )} */}
          <div>
            <button className="btn btn-primary w-full">Guardar </button>
          </div>
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

export default FormEvent;
