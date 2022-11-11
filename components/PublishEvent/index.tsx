import AddLinksSection from '@comps/forms/AddLinksSection';
import { Text } from '@comps/inputs';
import InputFiles, { SetImagesOps } from '@comps/inputs/inputFiles_V2';
import { Event, EventLink } from '@firebase/Events/event.model';
import { createEvent } from '@firebase/Events/main';
import { useRouter } from 'next/router';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';

const PublishEvent = () => {
  const defaultValues: Pick<Event, 'title' | 'date' | 'status' | 'images' | 'links'> = {
    date: new Date().getTime(),
    status: 'ACTIVE',
    images: [],
    links: [
      { label: '', url: '' }
    ],
    title: ''
  }
  const router = useRouter()
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
    control
  } = useForm({
    defaultValues
  });
  const formValues = watch()
  const onSubmit = (data: any) => {
    createEvent(data).then(({ res }: any) => {
      router.push(`/events/${res.id}/edit`)
    })
  };



  const handleSetImages = (images: any[], setImagesOps?: SetImagesOps) => {
    // if (setImagesOps?.uploading) setFormStatus(FORM_LABELS.loading);
    if (images.length) {
      setValue('images', images);
      handleSubmit((props: any) => {
        onSubmit(props);
      })();
    }
  };


  return (
    <div>
      <h1 className="text-xl font-bold text-center ">
        Publish a event out side of nadamas.app
      </h1>
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFiles
            fieldName="eventImage"
            images={formValues?.images}
            label={'Ad'}
            setImages={handleSetImages}
          />
          <Controller
            name="date"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <div className="form-control w-full ">
                <label className="label ">{`Event date`}</label>
                <input
                  className="input  input-bordered w-min mx-auto"
                  type={'datetime-local'}
                  {...rest}
                  value={myFormatDate(value, 'datetime')}
                />
              </div>
            )}
          />
          <Text label="Event title" errors={errors} {...register('title')} />
          {/* <Text label="Link" errors={errors} {...register('link')} /> */}
          <AddLinksSection control={control} errors={errors} register={register} formValues={formValues} setValue={setValue} />
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
};

export default PublishEvent;
