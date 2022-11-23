import PickerLocation from '@comps/GoogleMaps/PickerLocation';
import { Text } from '@comps/inputs';
import Textarea from '@comps/inputs/Textarea';
import EventStatus from './EventStatus';
import FormSection from './FormSection';

const BasicInformation = ({
  register,
  errors,
  formValues,
  control,
  setValue,
}: any) => {
  return (
    <div>
      <FormSection title="Basic information ">
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
          label="Place Name / Address"
          errors={errors}
        />
        <div className="form-control">
          <label className="">
            <span className="label-text">Location</span>
          </label>
          <PickerLocation
            className="mx-auto h-56 aspect-square"
            setLocation={(location) => setValue('location', location)}
            location={formValues?.location}
          />
        </div>
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
