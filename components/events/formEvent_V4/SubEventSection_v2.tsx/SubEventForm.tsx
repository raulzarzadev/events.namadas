import { SubEvent } from '@firebase/Events/event.model';
import { useFieldArray } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';
import SubEventFields from './SubEventFields_v2';

const SubEventForm = ({
  control,
  formValues,
  register,
  errors,
  // defaultFormFields = ['title'],
  setValue,
}: {
  control: any;
  formValues: any;
  register: any;
  errors: any;
  // defaultFormFields: FormFields[];
  setValue: any;
}) => {
  const {
    fields: subEvents,
    append,
    remove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'subEvents', // unique name for your Field Array,
  });

  const handleAddSubEvent = () => {
    const appendNewEvent: Partial<SubEvent> = {
      title: `event ${formValues?.subEvents?.length + 1}`,
      // distance: '',
      // comments: '',
      date: myFormatDate(formValues.date, 'datetime'),
      // finishAt: null,
      // style: '',
    };
    append(appendNewEvent);
  };

  return (
    <div>
      <div>
        <div className="grid gap-4">
          {subEvents.map((field, index) => (
            <SubEventFields
              key={field.id}
              formValues={formValues}
              control={control}
              register={register}
              handleRemoveSubEvent={() => {
                remove(index);
              }}
              //  defaultFormFields={defaultFormFields}
              errors={errors}
              index={index}
              setValue={setValue}
            />
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
export default SubEventForm;
