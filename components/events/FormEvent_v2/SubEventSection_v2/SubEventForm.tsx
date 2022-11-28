import { SubEvent } from '@firebase/Events/event.model'
import { useFieldArray, useFormContext } from 'react-hook-form'
import myFormatDate from 'utils/myFormatDate'
import SubEventFields from './SubEventFields_v2'

const SubEventForm = () => {
  const { control, watch } = useFormContext()
  const formValues = watch()
  const {
    fields: subEvents,
    append,
    remove
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'subEvents' // unique name for your Field Array,
  })

  const handleAddSubEvent = () => {
    const subEventsLength = parseInt(formValues?.subEvents?.length)
    const appendNewEvent: Partial<SubEvent> = {
      title: `event ${subEventsLength + 1}`,
      // distance: '',
      // comments: '',
      date: myFormatDate(formValues.date, 'datetime')
      // finishAt: null,
      // style: '',
    }
    append(appendNewEvent)
  }

  return (
    <div>
      <div>
        <div className="grid gap-4">
          {subEvents.map((field, index) => (
            <SubEventFields
              key={field.id}
              handleRemoveSubEvent={() => {
                remove(index)
              }}
              //  defaultFormFields={defaultFormFields}
              index={index}
            />
          ))}
          <div className="w-full flex justify-center my-2">
            <button
              className="btn btn-md "
              onClick={(e) => {
                e.preventDefault()
                handleAddSubEvent()
              }}
            >
              Add a event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SubEventForm
