import PickerSwimmingTests from '@comps/inputs/PickerSwimmingTest_v2';
import RadioInput from '@comps/inputs/Radio';
import { Event } from '@firebase/Events/event.model';
import { ReactNode } from 'react';
import FormSection from '../FormSection';
import SubEventForm from './SubEventForm';

const EVENT_TYPE_OPTIONS = [
  { name: 'swimmingPool', label: 'Swimming Pool' },
  { name: 'openWater', label: 'Open water' },
  { name: 'socialEvent', label: 'Social event' },
  { name: 'triathlon', label: 'Triathlon' },
  { name: 'cycling', label: 'Cycling' },
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
  hideSubEvents,
}: {
  register: any;
  errors: any;
  formValues: any;
  control: any;
  setValue: any;
  hideSubEvents: boolean;
}) => {
  const EVENT_TYPE_COMPONENT: Record<Event['eventType'], ReactNode> = {
    swimmingPool: (
      <PickerSwimmingTests
        setTests={(tests) => setValue('subEvents', tests)}
        tests={formValues?.subEvents}
      />
    ),
    openWater: (
      <SubEventForm
        control={control}
        formValues={formValues}
        register={register}
        errors={errors}
        setValue={setValue}
      />
    ),
    socialEvent: (
      <SubEventForm
        control={control}
        formValues={formValues}
        register={register}
        errors={errors}
        setValue={setValue}
      />
    ),
    triathlon: (
      <SubEventForm
        control={control}
        formValues={formValues}
        register={register}
        errors={errors}
        setValue={setValue}
      />
    ),
  };

  return (
    <div>
      <FormSection title="Event Type">
        <div className="flex justify-around flex-wrap">
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
        {!hideSubEvents && (
          <>
            <h4 className="text-lg font-bold">Sub events</h4>
            {EVENT_TYPE_COMPONENT[formValues?.eventType]}
          </>
        )}
      </FormSection>
    </div>
  );
};

export default SubEventsSection;
