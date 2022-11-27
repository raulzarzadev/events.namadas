import PickerLocation from '@comps/GoogleMaps/PickerLocation';
import { Text } from '@comps/inputs';
import InputFile from '@comps/inputs/InputFile';
import Textarea from '@comps/inputs/Textarea';
import { Coordinates } from '@firebase/Events/event.model';
import { useFormContext } from 'react-hook-form';
import { UseFormReturnHardSubmit } from '.';
import EventStatusForm from './EventStatusForm';
import FormSection from './FormSection';
import EventTypeForm from './SubEventSection_v2.tsx/EventTypeForm';

const BasicInformation = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    hardSubmit,
  }: UseFormReturnHardSubmit = useFormContext();
  const formValues = watch();
  return (
    <div>
      <FormSection title="Basic information ">
        <div className="flex justify-around flex-wrap">
          <EventTypeForm
            formValues={formValues}
            register={register}
            setValue={setValue}
          />
        </div>
        <EventStatusForm register={register} formValues={formValues} />
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
        <PickerLocation
          className="mx-auto h-80 w-full"
          setLocation={(location: Coordinates) =>
            setValue('location', location)
          }
          location={formValues?.location}
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
        <InputFile
          file={formValues.announcementPDF}
          setFile={(file) => {
            console.log({ file });
            setValue('announcementPDF', file);
            hardSubmit && hardSubmit();
          }}
          label={'Upload a PDF'}
          // name={'announcementPDF'}
        />
      </FormSection>
    </div>
  );
};

export default BasicInformation;
