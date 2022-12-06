import PickerLocation from '@comps/GoogleMaps/PickerLocation'
import Icon from '@comps/Icon'
import { Text } from '@comps/inputs'
import InputLocalDate from '@comps/inputs/InputLocalDate'
import Textarea from '@comps/inputs/Textarea'
import ModalDelete from '@comps/modal/ModalDelete_v2'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import myFormatDate from 'utils/myFormatDate'
import InputContainer from './InputContainer'
import SubEventInfo from './SubEventInfo'
// import { UseFormReturnHardSubmit } from '..'
import CurrencyInput from 'react-currency-input-field'

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

const SubEventForm = ({
  handleRemoveSubEvent,
  // defaultFormFields,
  index: subEventIndex
}: {
  handleRemoveSubEvent: () => void
  index: number
}) => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
    /* @ts-expect-error */
    hardSubmit
  } = useFormContext()

  const formValues = watch()
  const subEventValues = formValues?.subEvents[subEventIndex]

  const FIELDS_OPTIONS: FormFields[] = [
    'title',
    'description',
    'date',
    'finishAt',
    // 'comments',
    'style',
    'price',
    'distance',
    'location',
    'link'
  ]

  const _defaultFormFields = Object.keys(subEventValues)
  const [subEventFields, setEventFields] = useState(_defaultFormFields)

  const handleSetFields = ({ target: { name, checked } }: any) => {
    if (!checked) {
      const removeValue = { ...subEventValues }
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete removeValue[name]
      setValue(`subEvents.${subEventIndex}`, removeValue)
    }
    if (subEventFields.includes(name)) {
      const removeFiled = subEventFields.filter((field) => field !== name)
      setEventFields(removeFiled)
    } else {
      setEventFields([...subEventFields, name])
    }
  }

  const [showResume, setShowResume] = useState(true)

  // const handleSave = () => {
  //   setShowResume(true)
  //   hardSubmit?.()
  // }

  const handleChangeEdit = () => {
    setShowResume(!showResume)
  }

  return (
    <div className="bg-base-200 p-1">
      <div className="flex justify-end pr-2">
        <h4 className="w-full text-start text-lg ">
          {subEventIndex + 1}.- {subEventValues.title}
        </h4>
        <ModalDelete
          buttonLabel={null}
          title="Elimina este evento"
          openButtonProps={{
            className: 'btn btn-outline btn-square btn-error mb-0 btn-sm '
          }}
          handleDelete={() => {
            handleRemoveSubEvent()
          }}
        ></ModalDelete>

        {showResume ? (
          <button
            type="button"
            className="btn btn-outline btn-square btn-info  mb-0 btn-sm  mx-2"
            onClick={(e) => {
              e.preventDefault()
              handleChangeEdit()
            }}
          >
            <Icon name="edit" />
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline btn-square btn-success  mb-0 btn-sm  mx-2"
            onClick={(e) => {
              e.preventDefault()
              handleChangeEdit()
              hardSubmit()
            }}
          >
            <Icon name="done" />
          </button>
        )}
      </div>
      {showResume && (
        <SubEventInfo subEvent={subEventValues} index={subEventIndex} />
      )}
      {!showResume && (
        <>
          <div className="flex justify-around flex-wrap">
            {FIELDS_OPTIONS.map((field) => {
              return (
                <div className="form-control " key={field}>
                  <label className="label cursor-pointer flex   ">
                    <span className="label-text-alt mr-0.5 first-letter:uppercase">
                      {field}
                    </span>
                    <input
                      type="checkbox"
                      name={field}
                      checked={subEventFields?.includes(field)}
                      onChange={handleSetFields}
                      className="checkbox checkbox-sm"
                    />
                  </label>
                </div>
              )
            })}
          </div>

          <div className=" ">
            {subEventFields.includes('title') && (
              <Text
                {...register(`subEvents.${subEventIndex}.title`)}
                label={'Title'}
                errors={errors}
              />
            )}

            <div className="flex flex-col sm:flex-row gap-2 ">
              <div className="w-full">
                {subEventFields.includes('style') && (
                  <Text
                    {...register(`subEvents.${subEventIndex}.style`)}
                    label={'Style'}
                    errors={errors}
                  />
                )}
              </div>

              <div className=" ">
                {subEventFields.includes('price') && (
                  <Controller
                    name={`subEvents.${subEventIndex}.price`}
                    control={control}
                    render={({ field: { value, onChange, ...rest } }) => (
                      <InputContainer label={'Price'}>
                        <CurrencyInput
                          className="input  input-bordered input-sm"
                          placeholder="Please enter a number"
                          defaultValue={value}
                          decimalsLimit={2}
                          onValueChange={(value, name) => {
                            console.log(value, name)
                            onChange({ target: { value } })
                          }}
                        />
                      </InputContainer>
                    )}
                  />
                )}
              </div>
            </div>

            <div className="w-full">
              {subEventFields.includes('link') && (
                <div className=" w-full">
                  <Text
                    placeholder="https://example.com"
                    {...register(`subEvents.${subEventIndex}.link`)}
                    label={'More info link'}
                    errors={errors}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 ">
              <div className="w-full">
                {subEventFields.includes('date') && (
                  <Controller
                    control={control}
                    name={`subEvents.${subEventIndex}.date`}
                    defaultValue={myFormatDate(new Date(), 'datetime')}
                    render={({
                      field,
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <InputLocalDate
                        label="Date"
                        {...field}
                        value={myFormatDate(
                          formValues?.subEvents[subEventIndex].date,
                          'datetime'
                        )}
                      />
                    )}
                  />
                )}
              </div>

              <div className="w-full">
                {subEventFields.includes('finishAt') && (
                  <Controller
                    control={control}
                    name={`subEvents.${subEventIndex}.finishAt`}
                    defaultValue={myFormatDate(new Date(), 'datetime')}
                    render={({
                      field,
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <InputLocalDate
                        label="Finish at"
                        {...field}
                        value={myFormatDate(
                          formValues?.subEvents[subEventIndex].finishAt,
                          'datetime'
                        )}
                      />
                    )}
                  />
                )}
              </div>
            </div>
            {subEventFields.includes('distance') && (
              <Text
                type="number"
                {...register(`subEvents.${subEventIndex}.distance`)}
                label={'Distance'}
                errors={errors}
              />
            )}

            {subEventFields.includes('description') && (
              <Textarea
                {...register(`subEvents.${subEventIndex}.description`)}
                label={'Description'}
                errors={errors}
                rows={3}
              />
            )}

            {subEventFields.includes('comments') && (
              <Textarea
                {...register(`subEvents.${subEventIndex}.comments`)}
                label={'Comments '}
                errors
                rows={3}
              />
            )}
            {subEventFields.includes('location') && (
              <PickerLocation
                location={formValues?.subEvents[subEventIndex].location}
                setLocation={(coordinates) =>
                  setValue(`subEvents.${subEventIndex}.location`, coordinates)
                }
                className={'h-[50vh]'}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default SubEventForm
