import FormSection from '@comps/events/formEvent_V3/FormSection';
import Icon from '@comps/Icon';
import { Text } from '@comps/inputs';
import InputFile from '@comps/inputs/InputFile';
import { EventLink } from '@firebase/Events/event.model';
import { FirebaseCRUD } from '@firebase/FirebaseCRUD';
import { useFieldArray } from 'react-hook-form';

const AddLinksSection = ({
  control,
  formValues,
  register,
  errors,
  setValue,
}: {
  control: any;
  formValues: any;
  register: any;
  errors: any;
  setValue: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'links', // unique name for your Field Array,
  });
  const handleAddSubEvent = () => {
    const appendNewEvent: EventLink = {
      label: `link ${formValues?.links?.length + 1}`,
      url: '',
      image: '',
    };
    append(appendNewEvent);
  };
  const handleChangeInputFile = async (e: any) => {
    const files = e.target.files;
    const fieldName = e.target.name;
    const imageUploaded = await FirebaseCRUD.uploadFileAsync({
      file: files[0],
      fieldName,
    });
    setValue(fieldName, imageUploaded.url);
    return imageUploaded.url;
  };

  const handleDeleteImage = (imageUrl: string, fieldName: string) => {
    console.log(imageUrl);
    FirebaseCRUD.deleteFile({ url: imageUrl }).then((res) => {
      console.log(res);
      setValue(fieldName, null);
    });
    return {};
  };
  return (
    <FormSection title="Links related">
      <div className="grid  ">
        {fields.map((field, index) => (
          <div key={field.id} className=" my-2   bg-base-300 p-2 rounded-lg">
            <div className="flex justify-end w-full ">
              <button
                type="button"
                className="btn btn-outline btn-square btn-error mb-0  "
                onClick={() => remove(index)}
              >
                <Icon name="delete" />
              </button>
            </div>
            <div className=" items-end gap-2 max-w-full grid">
              <Text
                {...register(`links.${index}.label`)}
                label={'Link label'}
                errors={errors}
                placeholder="Link label"
              />

              <Text
                {...register(`links.${index}.url`)}
                label={'Link'}
                errors={errors}
                placeholder="https://example.com"
              />
              <InputFile
                name={`links.${index}.image`}
                handleChange={handleChangeInputFile}
                handleDelete={handleDeleteImage}
                label="Add an image"
                defaultImage={formValues.links[index].image}
              />
            </div>
          </div>
        ))}
        <div className="w-full flex justify-center my-2">
          <button
            className="btn btn-md "
            onClick={(e) => {
              e.preventDefault();
              handleAddSubEvent();
            }}
          >
            Add link
          </button>
        </div>
      </div>
    </FormSection>
  );
};

export default AddLinksSection;
