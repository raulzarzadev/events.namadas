import { InputDate, Toggle } from '@comps/inputs';
import { Controller, UseFormRegister } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';
import FormSection from './FormSection';

const EventDates = ({ register, errors, formValues, control }) => {
  //  const setEventOptionalDatesBasedInEventDate = () => {
  //    setValue(
  //      'subscriptionsOptions.finishAt',
  //      myFormatDate(formValues.date, 'yyyy-MM-dd')
  //    );
  //    setValue(
  //      'subscriptionsOptions.startAt',
  //      myFormatDate(new Date().getTime(), 'yyyy-MM-dd')
  //    );
  //    if (formValues.includeFinishDate) {
  //      setValue(
  //        'finishAt',
  //        myFormatDate(formValues?.finishAt, `yyyy-MM-dd'T'HH:mm`)
  //      );
  //    }
  //  };

  //  useEffect(() => {
  //    if (formValues.date) setEventOptionalDatesBasedInEventDate();
  //  }, [formValues.date]);

  //  useEffect(() => {
  //    setValue('date', myFormatDate(formValues.date, `yyyy-MM-dd'T'HH:mm`));
  //    setValue(
  //      'finishAt',
  //      myFormatDate(formValues.finishAt, `yyyy-MM-dd'T'HH:mm`)
  //    );
  //  }, []);
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
                  value={myFormatDate(formValues.date, 'datetime')}
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
                    value={myFormatDate(formValues.finishAt, 'datetime')}
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
