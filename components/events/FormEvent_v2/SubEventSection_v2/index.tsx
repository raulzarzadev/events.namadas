import PickerSwimmingTests from '@comps/inputs/PickerSwimmingTest_v2'
import { useFormContext } from 'react-hook-form'
import FormSection from '../FormSection'
import SubEventForm from './SubEventForm'
const SubEventsSection = ({ hideSubEvents }: { hideSubEvents?: boolean }) => {
  const { setValue, watch } = useFormContext()
  const formValues = watch()

  return (
    <div>
      <FormSection title="Classify event" className="bg-base-100">
        {!hideSubEvents && (
          <>
            <h4 className=" font-bold">Sub events</h4>
            {formValues.labels?.includes('pool') ? (
              <PickerSwimmingTests
                setTests={(tests) => setValue('subEvents', tests)}
                tests={formValues?.subEvents}
              />
            ) : (
              <SubEventForm />
            )}
          </>
        )}
      </FormSection>
    </div>
  )
}

export default SubEventsSection
