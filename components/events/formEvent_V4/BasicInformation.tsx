import { Text } from "@comps/inputs";
import RadioInput from "@comps/inputs/Radio";
import Textarea from "@comps/inputs/Textarea";
import FormSection from "./FormSection";

  const EVENT_STATUS_OPTIONS = [
    { name: 'PLANING', label: 'Planing' },
    { name: 'ACTIVE', label: 'Active' },
    // { name: 'PAUSED', label: 'Paused' },
    // { name: 'CANCELED', label: 'Canceled' },
    { name: 'IN_PROGRESS', label: 'In progress' },
    { name: 'FINISHED', label: 'Finished' },
  ];

const BasicInformation = (
  {register, errors, formValues, control}:any
) => {
  
  return (
    <div>
      <FormSection title="Basic information">
        <h4 className="font-bold text-lg">Current event status</h4>
        <div className="flex justify-around flex-grow">
          {EVENT_STATUS_OPTIONS.map(
            ({ name, label }: { name: string; label: string }) => {
              return (
                <RadioInput
                  key={name}
                  label={label}
                  {...register('status')}
                  value={name}
                />
              );
            }
          )}
        </div>

        <Text
          {...register('title', { required: true })}
          name="title"
          label="Title"
          errors={errors}
          type="text"
        />
        <Text
          {...register('address')}
          name="address"
          label=" Address / Location"
          errors={errors}
        />
        <Textarea
          {...register('resume')}
          name="resume"
          label="A small resume"
          errors={errors}
          type="text"
        />
      </FormSection>
    </div>
  );
}

export default BasicInformation;