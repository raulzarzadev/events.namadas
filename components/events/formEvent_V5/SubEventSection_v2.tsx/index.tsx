import PickerSwimmingTests from '@comps/inputs/PickerSwimmingTest_v2';
import FormSection from '../FormSection';
import EventTypeForm from './EventTypeForm';
import SubEventForm from './SubEventForm';

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
  return (
    <div>
      <FormSection title="Classify event">
        <div className="flex justify-around flex-wrap">
          <EventTypeForm
            formValues={formValues}
            register={register}
            setValue={setValue}
          />
        </div>
        {!hideSubEvents && (
          <>
            <h4 className=" font-bold">Sub events</h4>
            {formValues.labels?.includes('pool') ? (
              <PickerSwimmingTests
                setTests={(tests) => setValue('subEvents', tests)}
                tests={formValues?.subEvents}
              />
            ) : (
              <SubEventForm
                control={control}
                formValues={formValues}
                register={register}
                errors={errors}
                setValue={setValue}
              />
            )}
          </>
        )}
      </FormSection>
    </div>
  );
};

export default SubEventsSection;
