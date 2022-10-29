import { InputDate, Toggle } from "@comps/inputs";
import myFormatDate from "utils/myFormatDate";
import FormSection from "./FormSection";

const EventDates = ({register, errors, formValues}:any) => {
  return (
    <div>
      <FormSection title="Event dates">
        <Toggle
          label={'Include finish date'}
          {...register('includeFinishDate')}
          name="includeFinishDate"
          errors={errors}
        />
        <InputDate
          {...register('date')}
          type="datetime-local"
          name="date"
          label="Event date and time"
          errors={errors}
        />
        {formValues?.includeFinishDate && (
          <InputDate
            {...register('finishAt')}
            type="datetime-local"
            name="finishAt"
            label="Finish date"
            errors={errors}
            min={myFormatDate(formValues?.date, 'yyyy-MM-dd')}
          />
        )}
      </FormSection>
    </div>
  );
}

export default EventDates;