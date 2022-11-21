import { Text } from '@comps/inputs';
import Textarea from '@comps/inputs/Textarea';
import EventStatus from './EventStatus';
import FormSection from './FormSection';

const BasicInformation = ({ register, errors, formValues, control }: any) => {
  return (
    <div>
      <FormSection title="Basic information">
        <EventStatus register={register} formValues={formValues} />
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
        <Textarea
          {...register('announcement')}
          name="announcement"
          label="Full event announcement"
          errors={errors}
          type="text"
          rows={10}
        />
      </FormSection>
    </div>
  );
};

export default BasicInformation;
