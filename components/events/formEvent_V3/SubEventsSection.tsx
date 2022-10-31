import { Text } from '@comps/inputs';
import InputLocalDate from '@comps/inputs/InputLocalDate';
import PickerSwimmingTests from '@comps/inputs/PickerSwimmingTest';
import RadioInput from '@comps/inputs/Radio';
import { SubEvent } from '@firebase/Events/event.model';
import { useFieldArray } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';
import FormSection from './FormSection';

const EVENT_TYPE_OPTIONS = [
  { name: 'swimmingPool', label: 'Swimming Pool' },
  { name: 'openWater', label: 'Open water' },
  { name: 'socialEvent', label: 'Social event' },
  // { name: '50m', label: '50m swimming pool' },
  // { name: '250m', label: '25m swimming pool' },
  // '50m':'50m swimming pool'
  // '25m':'25m swimming pool'
];

const SubEventsSection = ({
  register,
  errors,
  formValues,
  control,
  setValue,
}: any) => {
  

  const isOpenWater = formValues?.swimmingType === 'openWater';
  const isSwimmingPool = formValues?.swimmingType === 'swimmingPool';
  const EVENT_TYPE_COMPONENT = {
    swimmingPool: (
      <PickerSwimmingTests
        setTests={(tests) => setValue('subEvents', tests)}
        tests={formValues?.subEvents}
      />
    ),
    openWater: (
      <OpenWaterSubEvents
        control={control}
        formValues={formValues}
        register={register}
        errors={errors}
      />
    ),
    socialEvent: (
      <SocialSubEvent
        control={control}
        formValues={formValues}
        register={register}
        errors={errors}
      />
    ),
  };
  return (
    <div>
      <FormSection title="Sub events">
        <div className="flex justify-around">
          {EVENT_TYPE_OPTIONS.map(
            ({ name, label }: { name: string; label: string }) => {
              return (
                <RadioInput
                  key={name}
                  label={label}
                  {...register('eventType')}
                  value={name}
                />
              );
            }
          )}
        </div>
        {EVENT_TYPE_COMPONENT[formValues?.eventType]}
      </FormSection>
    </div>
  );
};
const OpenWaterSubEvents = ({control, formValues , register, errors}:any) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'subEvents', // unique name for your Field Array,
  });
  const handleAddSubEvent = () => {
    const appendNewEvent: SubEvent = {
      title: `event ${formValues?.subEvents?.length + 1}`,
      distance: '',
      comments: '',
      date: myFormatDate(formValues.date, 'datetime'),
      style: '',
    };
    append(appendNewEvent);
  };
  return (
    <div>
      <div>
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
                label={'Comments'}
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
    </div>
  );
};
const SocialSubEvent = ({ control, formValues, register, errors }: any) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'subEvents', // unique name for your Field Array,
  });
  const handleAddSubEvent = () => {
    const appendNewEvent: SubEvent = {
      title: `event ${formValues?.subEvents?.length + 1}`,
      distance: '',
      comments: '',
      date: myFormatDate(formValues.date, 'datetime'),
      style: '',
    };
    append(appendNewEvent);
  };
  return (
    <div>
      <div>
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

              <InputLocalDate
                {...register(`subEvents.${index}.date`)}
                label={'Date time'}
                // name={`subEvents.${index}.title`}
                errors={errors}
              />

              <Text
                {...register(`subEvents.${index}.comments`)}
                label={'Comments'}
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
    </div>
  );
};
export default SubEventsSection;
