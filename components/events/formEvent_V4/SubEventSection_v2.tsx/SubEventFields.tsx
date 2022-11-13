import Icon from '@comps/Icon';
import { Text } from '@comps/inputs';
import InputLocalDate from '@comps/inputs/InputLocalDate';
import Textarea from '@comps/inputs/Textarea';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';
import { FormFields } from '../SubEventsSection';

const SubEventFields = ({
  register,
  errors = {},
  control,
  handleRemoveSubEvent,
  // defaultFormFields,
  setValue,
  formValues,
  index: subEventIndex,
}: {
  handleRemoveSubEvent: () => void;
  formValues: any;
  //  defaultFormFields: FormFields[];
  register: any;
  control: any;
  errors: any;
  index: number;
  setValue: any;
}) => {
  const subEventValues = formValues?.subEvents[subEventIndex];
  const _defaultFormFields = Object.keys(subEventValues);
  const [subEventFields, setEventFields] = useState(_defaultFormFields);

  console.log({ subEventValues, _defaultFormFields });

  const FIELDS: Record<FormFields, any> = {
    title: (
      <Text
        {...register(`subEvents.${subEventIndex}.title`)}
        label={'Title'}
        errors={errors}
      />
    ),

    distance: (
      <Text
        {...register(`subEvents.${subEventIndex}.distance`)}
        label={'Distance (m)'}
        type="number"
        errors={errors}
      />
    ),
    style: (
      <Text
        {...register(`subEvents.${subEventIndex}.style`)}
        label={'Style'}
        errors={errors}
      />
    ),
    date: (
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
    ),
    finishAt: (
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
              formValues?.subEvents[subEventIndex].date,
              'datetime'
            )}
          />
        )}
      />
    ),
    description: (
      <Textarea
        {...register(`subEvents.${subEventIndex}.description`)}
        label={'Date time'}
        errors={errors}
      />
    ),
    comments: (
      <Text
        {...register(`subEvents.${subEventIndex}.comments`)}
        label={'Comments'}
        errors={errors}
      />
    ),
  };
  const subEventFieldsOptions = Object.keys(FIELDS);

  const handleSetFields = ({ target: { name, checked } }) => {
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

  return (
    <div className="my-2 bg-base-300 py-2">
      <div className="flex justify-end">
        <h4 className="w-full text-start text-lg ">
          {subEventIndex + 1}.- {subEventValues.title}
        </h4>
        <button
          type="button"
          className="btn btn-outline btn-square btn-error mb-0  "
          onClick={(e) => {
            e.preventDefault();
            handleRemoveSubEvent();
          }}
        >
          <Icon name="delete" />
        </button>
      </div>
      <div className="flex justify-around flex-wrap">
        {subEventFieldsOptions.map((field) => {
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
        {subEventFields?.map((fieldName) => (
          <div key={subEventIndex}>{FIELDS[fieldName]}</div>
        ))}
      </div>
    </div>
  );
};
export default SubEventFields;
