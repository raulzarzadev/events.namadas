import { InputDate, Toggle } from '@comps/inputs';
import { Controller, UseFormRegister } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';
import FormSection from './FormSection';

const EventDates = ({ register, errors, formValues, control }:any) => {
 
  return (
    <div>
      <FormSection title="Event dates">
        <Toggle
          label={'Include finish date'}
          {...register('includeFinishDate')}
          name="includeFinishDate"
          errors={errors}
        />
        <div className="grid gap-4 place-content-center">
          <Controller
            name="date"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <div className="form-control w-full ">
                <label className="label">{`Event Date`}</label>
                <input
                  className="input  input-bordered"
                  type={'datetime-local'}
                  {...rest}
                 value={myFormatDate(value,'datetime')}
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
                  <label className="label">{`Event finish at`}</label>
                  <input
                    className="input  input-bordered"
                    type={'datetime-local'}
                    {...rest}
                    value={myFormatDate(value,'datetime')}
                  />
                </div>
              )}
            />
          )}
        </div>
      </FormSection>
    </div>
  );
};

export default EventDates;
