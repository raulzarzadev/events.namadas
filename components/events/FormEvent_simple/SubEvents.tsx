import Icon from '@comps/Icon'
import { SubEvent as SubEventType } from '@firebase/Events/event.model'
import { useFieldArray, useFormContext } from 'react-hook-form'
import myFormatDate from 'utils/myFormatDate'
import SubEventForm from './SubEventForm'

export type FormFields =
  | 'title'
  | 'description'
  | 'date'
  | 'finishAt'
  | 'comments'
  | 'style'
  | 'price'
  | 'distance'
  | 'location'
  | 'link'

const SubEvents = () => {
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
    const appendNewEvent: Partial<SubEventType> = {
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
      {subEvents.map((field, index) => (
        <div key={field.id} className="my-1">
          <SubEventForm
            index={index}
            handleRemoveSubEvent={() => {
              remove(index)
            }}
          />
        </div>
      ))}
      <div className="flex justify-center w-full">
        <button
          className="btn btn-sm btn-info"
          onClick={(e) => {
            e.preventDefault()
            handleAddSubEvent()
          }}
        >
          Sub Event <Icon name="plus" />
        </button>
      </div>
    </div>
  )
}

export default SubEvents
