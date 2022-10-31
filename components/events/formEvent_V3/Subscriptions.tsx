import { InputDate, Text } from "@comps/inputs";
import { Controller } from "react-hook-form";
import myFormatDate from "utils/myFormatDate";
import FormSection from "./FormSection";

const Subscriptions = ({ register, errors, formValues, control }: any) => {

  return (
    <div>
      <FormSection title="Subscriptions options">
        <Text
          {...register('subscriptionsOptions.limit', {
            valueAsNumber: true,
          })}
          name="subscriptionsOptions.limit"
          label="Limited to:"
          errors={errors}
          type="number"
          min={0}
          max={99999}
        />
        <div className="grid gap-4 place-content-center">
          <Controller
            name="subscriptionsOptions.startAt"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <div className="form-control w-full ">
                <label className="label">{`Subscriptions starts`}</label>
                <input
                  className="input  input-bordered"
                  type={'date'}
                  {...rest}
                  value={myFormatDate(
                    formValues?.subscriptionsOptions?.startAt,
                    'inputDate'
                  )}
                />
              </div>
            )}
          />
          <Controller
            name="subscriptionsOptions.finishAt"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <div className="form-control w-full ">
                <label className="label">{`Subscriptions finish`}</label>
                <input
                  className="input  input-bordered"
                  type={'date'}
                  {...rest}
                  value={myFormatDate(
                    formValues?.subscriptionsOptions?.finishAt,
                    'inputDate'
                  )}
                />
              </div>
            )}
          />
        </div>
      </FormSection>
    </div>
  );
};

export default Subscriptions;