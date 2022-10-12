import { Date, Text, Toggle } from '@comps/inputs';
import Chip from '@comps/inputs/Chip';
import PickerSwimmingTests from '@comps/inputs/PickerSwimmingTest';
import RadioInput from '@comps/inputs/Radio';
import Select from '@comps/inputs/Select';
import { createEvent } from '@firebase/Events/main';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FormEvent = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createEvent(data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    console.log(data);
  };

  const formResults = watch();

  const includeFinishDate = formResults?.includeFinishDate;
  const isSportType = formResults?.eventType === 'sportEvent';
  const isSwimmingEvent =
    formResults?.eventType === 'sportEvent' &&
    formResults?.sport === 'swimming';
  const isOpenWater =
    isSwimmingEvent && formResults?.swimmingType === 'openWater';
  const isSwimmingPool =
    isSwimmingEvent &&
    (formResults.swimmingType === '25m' || formResults.swimmingType === '50m');

  return (
    <div>
      <h2>Crea un evento aquí </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid mx-auto place-content-center gap-2">
          <Text
            {...register('title')}
            name="title"
            label="Title"
            errors={errors}
            type="text"
          />
          <Date
            {...register('date')}
            name="date"
            label="Date"
            errors={errors}
            type="date"
          />
          <Toggle
            label={'Include finish date'}
            {...register('includeFinishDate')}
            name="includeFinishDate"
            errors={errors}
          />
          {includeFinishDate && (
            <Date
              {...register('finishDate')}
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
          <Select
            label="Kind of event"
            {...register('eventType')}
            name="eventType"
            errors={errors}
            options={[
              { label: 'Sports', value: 'sportEvent' },
              { label: 'Social', value: 'socialEvent' },
            ]}
          />
          {isSportType && (
            <Select
              label="Sport"
              {...register('sport')}
              name="sport"
              errors={errors}
              options={[
                { label: 'Swimming', value: 'swimming' },
                { label: 'Running', value: 'running' },
                { label: 'Cycling', value: 'cycling' },
                { label: 'Triathlon', value: 'triathlon' },
                { label: 'Duathlon', value: 'duathlon' },
              ]}
            />
          )}
          {isSwimmingEvent && (
            <div className="flex ">
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
          )}
          {/* {isSwimmingPool && <PickerSwimmingTests />}
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

export default FormEvent;
