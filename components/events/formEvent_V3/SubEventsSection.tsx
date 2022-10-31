import { Text } from "@comps/inputs";
import InputLocalDate from "@comps/inputs/InputLocalDate";
import PickerSwimmingTests from "@comps/inputs/PickerSwimmingTest";
import RadioInput from "@comps/inputs/Radio";
import { SubEvent } from "@firebase/Events/event.model";
import { useFieldArray } from "react-hook-form";
import FormSection from "./FormSection";

  const EVENT_TYPE_OPTIONS = [
    { name: 'swimmingPool', label: 'Swimming Pool' },
    { name: 'openWater', label: 'Open water' },
    // { name: '50m', label: '50m swimming pool' },
    // { name: '250m', label: '25m swimming pool' },
    // '50m':'50m swimming pool'
    // '25m':'25m swimming pool'
  ];

const SubEventsSection = ({ register, errors, formValues, control , setValue}:any) => {
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

      const isOpenWater = formValues?.swimmingType === 'openWater';
      const isSwimmingPool = formValues?.swimmingType === 'swimmingPool';

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
        )}
      </FormSection>
    </div>
  );
};

export default SubEventsSection;