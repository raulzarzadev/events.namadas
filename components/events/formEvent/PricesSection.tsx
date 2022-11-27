import { Text, Toggle } from '@comps/inputs';
import {
  Controller,
  RegisterOptions,
  useFieldArray,
  useFormContext,
  UseFormRegister,
} from 'react-hook-form';
import FormSection from './FormSection';
import { v4 as uidGenerator } from 'uuid';
import { Price } from '@firebase/Events/event.model';
import InputLocalDate from '@comps/inputs/InputLocalDate';
import myFormatDate from 'utils/myFormatDate';
export interface PricesSection {
  disabled?: boolean;
}
const PricesSection = ({ disabled }: PricesSection) => {
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext();
  const formValues = watch();
  const event = formValues;
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
      event: {
        id: event.id,
        date: event.date,
        eventType: event.eventType,
        title: event.title,
        createdBy: event.userId,
      },
      id: uuid,
      eventId: formValues?.id,
      amount: 0,
      title: `Price ${(formValues.prices?.length || 0) + 1}`,
      description: 'Description price',
      validFrom: myFormatDate(new Date(), 'datetime'),
      expiresAt: myFormatDate(formValues.date, 'datetime'),
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
                {...register(`prices.${index}.amount`, { valueAsNumber: true })}
                label={'Price'}
                type="number"
                // name={`subEvents.${index}.title`}
                errors={errors}
              />
              <div className="w-full my-4 ">
                <h4 className="font-bold">Dates valid for this prices</h4>
                <div className="w-full flex flex-col sm:flex-row items-end">
                  <Controller
                    control={control}
                    name={`prices.${index}.validFrom`}
                    defaultValue={myFormatDate(new Date(), 'datetime')}
                    render={({
                      field,
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <InputLocalDate
                        label="Valid from"
                        {...field}
                        value={myFormatDate(field.value, 'datetime')}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`prices.${index}.expireAt`}
                    defaultValue={myFormatDate(new Date(), 'datetime')}
                    render={({
                      field,
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <InputLocalDate
                        label="Expire at"
                        {...field}
                        value={myFormatDate(formValues.date, 'datetime')}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex justify-center my-2">
            <button
              disabled={disabled}
              className="btn btn-md "
              onClick={(e) => {
                e.preventDefault();
                handleAddPrice();
              }}
            >
              Add price
            </button>
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default PricesSection;
