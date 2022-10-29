import { InputDate, Text } from "@comps/inputs";
import myFormatDate from "utils/myFormatDate";
import FormSection from "./FormSection";

const Subscriptions = (
  {register, errors, formValues}:any
) => {
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

        <InputDate
          {...register('subscriptionsOptions.startAt')}
          type="date"
          name="subscriptionsOptions.startAt"
          label="Starts at"
          errors={errors}
        />

        <InputDate
          {...register('subscriptionsOptions.finishAt')}
          type="date"
          name="subscriptionsOptions.finishAt"
          label="Finish at"
          errors={errors}
          max={myFormatDate(formValues.date, 'yyyy-MM-dd')}
        />
      </FormSection>
    </div>
  );
}

export default Subscriptions;