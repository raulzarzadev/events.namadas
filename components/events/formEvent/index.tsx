import { Date, Text, Toggle } from '@comps/inputs';
import { useForm } from 'react-hook-form';

const FormEvent = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
console.log(watch())
  return (
    <div>
      <h2>Crea un evento aquí </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid mx-auto place-content-center gap-2">
          <Text
            {...register('title')}
            name="title"
            label="Title"
            errors={errors}
            type="text"
          />
          <Date
            {...register('date')}
            name="date"
            label="Date"
            errors={errors}
            type="date"
          />
          <Toggle label={'Include finish date'} {...register('includeFinishDate')} name="includeFinishDate" errors={errors} />

          {watch('includeFinishDate') && (
            <Date
              {...register('finishDate')}
              name="finishDate"
              label="Finish date"
              errors={errors}
              type="date"
            />
          )}

          <Text
            {...register('address')}
            name="address"
            label=" Address / Location"
            errors={errors}
          />
          <div>
            <button className="btn btn-primary">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormEvent;
