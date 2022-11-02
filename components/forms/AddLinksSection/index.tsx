import FormSection from "@comps/events/formEvent_V3/FormSection";
import Icon from "@comps/Icon";
import { Text } from "@comps/inputs";
import { EventLink } from "@firebase/Events/event.model";
import { useFieldArray } from "react-hook-form";

const AddLinksSection = ({control, formValues, register, errors}:any) => {

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
  return (
     <FormSection title="Links related">

      <div className="grid ">
        {fields.map((field, index) => (
          <div key={field.id} className="  ">
            <div className="sm:flex items-end gap-1 max-w-full  grid">
              <Text
                {...register(`links.${index}.label`)}
                label={'Label'}
                errors={errors}
                placeholder="Link label"
              />

              <Text
                {...register(`links.${index}.url`)}
                label={'Link'}
                errors={errors}
                placeholder="https://example.com"
              />
              <button
                type="button"
                className="btn btn-outline btn-square btn-error mb-0  mx-auto "
                onClick={() => remove(index)}
              >
                <Icon name="delete" />
              </button>
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
}

export default AddLinksSection;