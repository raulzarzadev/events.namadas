import { Toggle } from '@comps/inputs'
import { Controller, useFormContext } from 'react-hook-form'
import myFormatDate from 'utils/myFormatDate'

const EventDates = () => {
  const {
    register,
    control,
    formState: { errors },
    watch
  } = useFormContext()
  const formValues = watch()

  return (
    <div>
      <div className="flex">
        <Toggle
          label={'Termina otro dia'}
          {...register('includeFinishDate')}
          name="includeFinishDate"
          errors={errors}
          size="sm"
        />
        <Toggle
          label={'Todo el día'}
          {...register('allDay')}
          name="allDay"
          size="sm"
        />
      </div>
      <div className="flex ">
        <Controller
          name="date"
          control={control}
          render={({ field: { value, ...rest } }) => (
            <div className="form-control w-full ">
              <label className="label">{`Start At`}</label>
              <input
                className="input  input-bordered input-sm"
                type={`${formValues.allDay ? 'date' : 'datetime-local'}`}
                {...rest}
                value={myFormatDate(
                  value,
                  formValues.allDay ? 'inputDate' : 'datetime'
                )}
              />
            </div>
          )}
        />

        {formValues?.includeFinishDate && (
          <Controller
            name="finishAt"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <div className="form-control w-full ">
                <label className="label">{`Finish at`}</label>
                <input
                  className="input  input-bordered input-sm"
                  type={`${formValues.allDay ? 'date' : 'datetime-local'}`}
                  {...rest}
                  value={myFormatDate(
                    value,
                    formValues.allDay ? 'inputDate' : 'datetime'
                  )}
                />
              </div>
            )}
          />
        )}
      </div>
    </div>
  )
}

export default EventDates
