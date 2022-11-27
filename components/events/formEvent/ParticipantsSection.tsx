import { Toggle } from '@comps/inputs';
import { useFormContext } from 'react-hook-form';
import PricesSection from './PricesSection';
import SubscriptionsSection from './SubscriptionsSection';

const ParticipantsSection = () => {
  const { watch, register } = useFormContext();
  const {
    acceptSubscriptions,
    subscriptionsOptions: { acceptTerms },
  } = watch();
  return (
    <div>
      <>
        <div>
          <div className="flex items-center">
            <input
              disabled
              type={'checkbox'}
              className="checkbox m-2"
              {...register('subscriptionsOptions.acceptTerms', {
                value: false,
              })}
            />
            <p>
              Aceptar terminos y condiciones para organizar un evento en nadamas
            </p>
          </div>
          <Toggle
            disabled={!acceptTerms}
            label="Organizar evento"
            {...register('subscriptionsOptions.acceptSubscriptions', {
              value: false,
            })}
          />
        </div>
        {acceptSubscriptions ? (
          <>
            <SubscriptionsSection />
            <PricesSection />
          </>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default ParticipantsSection;
