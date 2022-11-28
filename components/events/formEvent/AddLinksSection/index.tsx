import Icon from '@comps/Icon'
import { Text } from '@comps/inputs'
import InputImage from '@comps/inputs/InputImage'
import { EventLink } from '@firebase/Events/event.model'
import { FirebaseCRUD } from '@firebase/FirebaseCRUD'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FormSection from '../FormSection'

const AddLinksSection = () => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'links' // unique name for your Field Array,
  })

  const formValues = watch()

  const handleAddSubEvent = () => {
    const linksLength = formValues?.links?.length ?? 0
    const appendNewEvent: EventLink = {
      label: `link ${parseInt(linksLength) + 1}`,
      url: '',
      image: ''
    }
    append(appendNewEvent)
  }
  const handleChangeInputImage = async (e: any) => {
    const files = e.target.files
    const fieldName = e.target.name
    const imageUploaded = await FirebaseCRUD.uploadFileAsync({
      file: files[0],
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      fieldName: `events/${formValues?.id}/links`
    })
    setValue(fieldName, imageUploaded.url)
    return imageUploaded.url
  }

  const handleDeleteImage = (imageUrl: string, fieldName: string) => {
    console.log(imageUrl)
    FirebaseCRUD.deleteFile({ url: imageUrl }).then((res) => {
      console.log(res)
      setValue(fieldName, null)
    })
    return {}
  }
  // console.log(formValues);
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

              <InputImage
                name={`links.${index}.image`}
                handleChange={handleChangeInputImage}
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
              e.preventDefault()
              handleAddSubEvent()
            }}
          >
            Add link
          </button>
        </div>
      </div>
    </FormSection>
  )
}

export default AddLinksSection
