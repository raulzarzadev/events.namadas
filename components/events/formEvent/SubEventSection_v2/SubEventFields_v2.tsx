import PickerLocation from '@comps/GoogleMaps/PickerLocation';
import Icon from '@comps/Icon';
import { Text } from '@comps/inputs';
import InputLocalDate from '@comps/inputs/InputLocalDate';
import Textarea from '@comps/inputs/Textarea';
import { SubEvent } from '@firebase/Events/event.model';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';
import { UseFormReturnHardSubmit } from '..';
import SubEventInfo from './SubEventInfo';

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
  | 'link';

const SubEventFields = ({
  handleRemoveSubEvent,
  // defaultFormFields,
  index: subEventIndex,
}: {
  handleRemoveSubEvent: () => void;
  index: number;
}) => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
    hardSubmit,
  }: UseFormReturnHardSubmit = useFormContext();
  const formValues = watch();
  const subEventValues = formValues?.subEvents[subEventIndex];

  const FIELDS_OPTIONS: FormFields[] = [
    'title',
    'description',
    'date',
    'finishAt',
    'comments',
    'style',
    'price',
    'distance',
    'location',
    'link',
  ];

  const _defaultFormFields = Object.keys(subEventValues);
  const [subEventFields, setEventFields] = useState(_defaultFormFields);

  const handleSetFields = ({ target: { name, checked } }: any) => {
    if (!checked) {
      const removeValue = { ...subEventValues };
      delete removeValue[name];
      setValue(`subEvents.${subEventIndex}`, removeValue);
    }
    if (subEventFields.includes(name)) {
      const removeFiled = subEventFields.filter((field) => field !== name);
      setEventFields(removeFiled);
    } else {
      setEventFields([...subEventFields, name]);
    }
  };

  const [showResume, setShowResume] = useState(true);

  const handleSave = () => {
    setShowResume(true);
    hardSubmit && hardSubmit();
  };

  return (
    <div className="my-2 bg-base-300 py-2">
      {showResume && (
        <SubEventInfo
          subEvent={subEventValues}
          index={subEventIndex}
          handleEdit={() => {
            setShowResume(false);
          }}
        />
      )}
      {!showResume && (
        <>
          <div className="flex justify-end pr-2">
            <h4 className="w-full text-start text-lg ">
              {subEventIndex + 1}.- {subEventValues.title}
            </h4>

            <button
              type="button"
              className="btn btn-outline btn-square btn-error mb-0 btn-sm  "
              onClick={(e) => {
                e.preventDefault();
                handleRemoveSubEvent();
              }}
            >
              <Icon name="delete" />
            </button>
            <button
              type="button"
              className="btn btn-outline btn-square btn-success mb-0 btn-sm  mx-2"
              onClick={(e) => {
                e.preventDefault();

                handleSave();
              }}
            >
              <Icon name="done" />
            </button>
          </div>
          <div className="flex justify-around flex-wrap">
            {FIELDS_OPTIONS.map((field) => {
              return (
                <div className="form-control " key={field}>
                  <label className="label cursor-pointer flex flex-col  ">
                    <span className="label-text">{field}</span>
                    <input
                      type="checkbox"
                      name={field}
                      checked={subEventFields?.includes(field)}
                      onChange={handleSetFields}
                      className="checkbox"
                    />
                  </label>
                </div>
              );
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

              <div className="w-full mx-auto ">
                {subEventFields.includes('price') && (
                  <Text
                    type="number"
                    {...register(`subEvents.${subEventIndex}.price`)}
                    label={'Price'}
                    errors={errors}
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
                      formState,
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
                      formState,
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
                className={'h-32'}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SubEventFields;
