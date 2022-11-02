
import { Text, Toggle } from '@comps/inputs';
import InputFiles, { SetImagesOps } from '@comps/inputs/inputFiles_V2';
import Phone from '@comps/inputs/Phone';
import RadioInput from '@comps/inputs/Radio';
import Textarea from '@comps/inputs/Textarea';
import Section from '@comps/Section';
import { updateUser } from '@firebase/Users/main';
import { User } from '@firebase/Users/user.model';
import { useForm } from 'react-hook-form';
import myFormatDate from 'utils/myFormatDate';

interface ProfileType {
  label: string;
  name: 'isAthlete' | 'isCompany';
}
const PROFILE_TYPES:ProfileType[] = [
  { name: 'isAthlete', label: 'Athlete' },
  //{ name: 'isCoach', label: 'Coach' },
  //{ name: 'isTutor', label: 'Father or tutor' },
  { name: 'isCompany', label: 'Events Agency' },
];

export default function UserForm({ user }:{user:User}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      ...user,
      name: user.displayName,
      birth: myFormatDate(user.birth, 'yyyy-MM-dd'),
    },
  });

  const onSubmit = (form: any) => {
    form?.id ? updateUser(form?.id, form).then((res) => console.log(`User updated`, res)):console.error('no user id')
  };

  const formValues = watch()

  console.log(formValues)
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
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex justify-end sticky top-8 p-2 bg-base-100">
          <button className="btn btn-primary ">Save</button>
        </div>
        <InputFiles
        fieldName='userImages'
          label="Add more images "
          images={formValues?.images}
          setImages={handleSetImages}
          // disabled={disabled}
        />
        <Section title="Personal information " open indent={false}>
          <Text
            label={'Name'}
            placeholder="Name"
            errors={errors}
            //  error={errors.name.message}
            {...register('name', { value: formValues?.name || '' })}
          />
          <Text
            label={'Alias (optional)'}
            placeholder="Alias (optional)"
            //  error={errors.name.message}
            {...register('alias', { value: formValues.alias|| null })}
            errors={errors}
          />
          <Text
            label={'Birth date'}
            type="date"
            //  error={errors.name.message}
            {...register('birth', {
              value: myFormatDate(formValues.birth, 'yyyy-MM-dd') || '',
            })}
            errors={errors}
          />
          <div>
            <span className="text-xl font-bold">Type of profile </span>
            <div className="flex w-full justify-evenly">
              {PROFILE_TYPES.map(
                ({ name, label }: ProfileType) => {
                  return (
                    <label
                      key={name}
                      className="flex flex-col justify-center items-center"
                    >
                      {label}
                      <input
                        className="checkbox"
                        type={'checkbox'}
                        // label={label}
                        {...register(`profileType.${name}`, {
                          setValueAs: (value) => !!value,
                        })}
                        // value={`${true}`}
                        //  checked={true}
                        // value={true}
                      />
                    </label>
                  );
                }
              )}
            </div>
          </div>
        </Section>

        <Section title="Personal Contact " open indent={false}>
          <Phone
            label={'Whatsapp'}
            placeholder="Phone (optional)"
            //  error={errors.name.message}
            onChange={(value: any) => {
              setValue('contact.phone', value);
            }}
            value={watch('contact.phone')}
            /* {...register('contact.whatsapp', {
            value: watch('contact.whatsapp') || null
          })} */
          />
          <Text
            disabled
            label={'Email'}
            placeholder="Email (recommended)"
            // onChange={(e) => console.log(e.target.value)}
            //  error={errors.name.message}
            {...register('email', { value: formValues?.email || '' })}
            errors={errors}
            helperText="You can not change this option"
          />
        </Section>
        {formValues?.profileType?.isCompany && (
          <>
            <Section title="Company information" open>
              <Textarea
                label={'Presentation'}
                placeholder="A small description of your company, there goals and the values can be a good presentation"
                // onChange={(e) => console.log(e.target.value)}
                //  error={errors.name.message}
                {...register('companyInfo.resume', {
                  value: formValues?.companyInfo?.resume || null,
                })}
                rows={2}
                errors={errors}
              />
              <h2 className="font-bold my-4">Company contacts</h2>
              <Phone
                label={' Phone Number '}
                placeholder="Phone (optional)"
                //  error={errors.name.message}
                onChange={(value: any) => {
                  setValue('companyInfo.phone', value);
                }}
                value={formValues.companyInfo?.phone}
                /* {...register('contact.whatsapp', {
            value: watch('contact.whatsapp') || null
          })} */
              />
              <Text
                label={'Email'}
                placeholder="Company Email (recommended)"
                // onChange={(e) => console.log(e.target.value)}
                //  error={errors.name.message}
                {...register('companyInfo.email', {
                  value: formValues?.companyInfo?.email || null,
                })}
                errors={errors}
              />
            </Section>
          </>
        )}
        {formValues?.profileType?.isAthlete && (
          <>
            <Section title="Medic information " indent={false}>
              <Text
                label={'Blood type'}
                placeholder=" (recommended)"
                //  error={errors.name.message}
                {...register('medicInformation.bloodType', {
                  value: watch('medicInformation.bloodType') || null,
                })}
                errors={errors}
              />
              <Text
                label={'Medic considerations '}
                placeholder=" (recommended)"
                helperText={
                  'Lesions, allergies, conditions, diseases, medicines, etc.'
                }
                //  error={errors.name.message}
                {...register('medicInformation.considerations', {
                  value: watch('medicInformation.considerations') || null,
                })}
                errors={errors}
              />
            </Section>

            <Section title="Emergency contact" indent={false}>
              <Text
                label={'Name'}
                placeholder="(recommended)"
                //  error={errors.name.message}
                {...register('emergencyContact.name', {
                  value: watch('emergencyContact.name') || null,
                })}
                errors={errors}
              />
              {/* <TextInput
            placeholder="(recommended)"
            //  error={errors.name.message}
            {...register('emergencyContact.phone', {
              value: watch('emergencyContact.phone') || null
            })}
          /> */}
              <Text
                label={'Relationship'}
                placeholder=" (recommended)"
                {...register('emergencyContact.relationship', {
                  value: watch('emergencyContact.relationship') || null,
                })}
                errors={errors}
              />
              <Phone
                label={'Phone number'}
                placeholder="number"
                //  error={errors.name.message}
                onChange={(value: any) => {
                  setValue('emergencyContact.phone', value);
                }}
              />
            </Section>
          </>
        )}
      </form>
    </div>
  );
}
