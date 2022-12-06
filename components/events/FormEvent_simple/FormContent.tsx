import PickerLocation from '@comps/GoogleMaps/PickerLocation'
import InputFiles from '@comps/inputs/inputFiles_V2'
import { Coordinates } from '@firebase/Events/event.model'
import { useFormContext } from 'react-hook-form'
import EventDates from './EventDates'
import InputContainer from './InputContainer'
import SubEvents from './SubEvents'

const FormContent = () => {
  const { register, setValue, watch } = useFormContext()
  const formValues = watch()

  return (
    <div className="">
      <div>
        <h3 className="font-bold text-lg text-center mt-5">Detalles</h3>
        <InputContainer label="Título" helperText={''}>
          <input
            {...register('title')}
            className="input input-bordered input-sm"
          />
        </InputContainer>

        <InputContainer label="Resumen" helperText={''}>
          <textarea
            rows={3}
            {...register('resume')}
            className="textarea input-bordered resize-none"
          />
        </InputContainer>
      </div>
      <div>
        <h3 className="font-bold text-lg text-center mt-5">Fechas</h3>
        <EventDates />
      </div>
      <div>
        <h3 className="font-bold text-lg text-center mt-5">Sub Eventos</h3>
        <SubEvents />
      </div>
      <div>
        <h3 className="font-bold text-lg text-center mt-5">Location</h3>
        <PickerLocation
          className="mx-auto h-80 w-full"
          setLocation={(location: Coordinates) =>
            setValue('location', location)
          }
          location={formValues?.location}
        />
      </div>
      <div>
        <h3 className="font-bold text-lg text-center mt-5">Location</h3>
        <InputFiles
          fieldName="eventImage"
          label="Add some images "
          images={formValues?.images}
          // setImages={handleSetImages}
          displayAs="row"
          setImages={(images) => {
            setValue('images', images)
          }} // disabled={disabled}
        />
      </div>
    </div>
  )
}

export default FormContent
