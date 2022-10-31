import { Text } from "@comps/inputs";
import { useFieldArray } from "react-hook-form";
import FormSection from "./FormSection";
import { v4 as uidGenerator } from 'uuid';
import { Price } from "@firebase/Events/event.model";

const PricesSection = ({
  register, errors, formValues, control
}:any) => {
   const {
     fields: priceFields,
     append: appendPrice,
     remove: removePrice,
   } = useFieldArray({
     control, // control props comes from useForm (optional: if you are using FormContext)
     name: 'prices', // unique name for your Field Array,
   });

   const handleAddPrice = () => {
     const uuid = uidGenerator().replace('-', '').slice(0, 20);
     const appendNewPrice: Price = {
       id: uuid,
       eventId: formValues?.id,
       amount: 0,
       title: `Price ${(formValues.prices?.length || 0) + 1}`,
       description: 'Description price',
     };
     appendPrice(appendNewPrice);
   };
  return (
    <div>
      <FormSection title="Prices">
        <div>
          {priceFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-end flex-col bg-base-200 py-4 "
            >
              <button
                type="button"
                className="btn btn-outline btn-error btn-xs"
                onClick={() => removePrice(index)}
              >
                Delete
              </button>
              <Text
                {...register(`prices.${index}.title`)}
                label={'Title'}
                // name={`subEvents.${index}.title`}
                errors={errors}
              />
              <Text
                {...register(`prices.${index}.description`)}
                label={'Description'}
                // name={`subEvents.${index}.title`}
                errors={errors}
              />
              <Text
                {...register(`prices.${index}.amount`)}
                label={'Price'}
                type="number"
                // name={`subEvents.${index}.title`}
                errors={errors}
              />
            </div>
          ))}
          <div className="w-full flex justify-center my-2">
            <button
              className="btn btn-md "
              onClick={(e) => {
                e.preventDefault();
                handleAddPrice();
              }}
            >
              Add a price
            </button>
          </div>
        </div>
      </FormSection>
    </div>
  );
}

export default PricesSection;