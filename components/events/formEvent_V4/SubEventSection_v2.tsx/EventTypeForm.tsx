import Icon from '@comps/Icon';
import RadioInput from '@comps/inputs/Radio';
import { useEffect, useState } from 'react';

const EventTypeForm = ({ setValue }: any) => {
  const EVENT_TYPE_OPTIONS = [
    { name: 'swimmingPool', label: 'Swimming Pool' },
    { name: 'openWater', label: 'Open water' },
    // { name: 'socialEvent', label: 'Social event' },
    { name: 'triathlon', label: 'Triathlon' },
    { name: 'cycling', label: 'Cycling' },
    // { name: '50m', label: '50m swimming pool' },
    // { name: '250m', label: '25m swimming pool' },
    // '50m':'50m swimming pool'
    // '25m':'25m swimming pool'
  ];

  const sports = ['swim', 'run', 'bike', 'multi'];
  const sport_variant = {
    type: ['sports'],
    sports: ['swim', 'run', 'bike', 'multi'],
    swim: ['pool', 'openWater'],
    bike: ['route', 'mountain', 'gravel', 'city'],
    run: ['tracking', 'soft', 'road', 'mountain'],
    multi: ['duathlon', 'triathlon', 'pentathlon '],
    triathlon: ['super-sprint', 'sprint', 'olympic', '70.30', 'iron-man'],
    pool: ['-25m', '25m', '50m', '+50m'],
    openWater: ['sea', 'lake', 'river'],
  };

  const [sportType, setSportType] = useState(['type']);
  const handleChange = ({ target: { name } }) => {
    setSportType([...sportType, name]);
  };
  const handleRemoveType = (type: string) => {
    const indexOfType = sportType.indexOf(type);
    const res = sportType.slice(0, indexOfType);
    setSportType(res);
  };
  useEffect(() => {
    setValue('labels', sportType);
  }, [sportType]);
  return (
    <div>
      <div className="flex flex-wrap w-full justify-around">
        {sportType.map((type) => (
          <div className="flex m-1 border rounded-full px-2 items-center shadow-md ">
            {type}
            {type !== 'type' && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveType(type);
                }}
              >
                <Icon name="cross" size="xs" />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap w-full justify-around">
        {sport_variant?.[sportType[sportType.length - 1]]?.map(
          (sport: string) => {
            return (
              <RadioInput
                key={sport}
                label={sport}
                // {...register('eventType')}
                value={sport}
                name={sport}
                onChange={handleChange}
              />
            );
          }
        )}
      </div>
      {/* <div className="flex">
        {EVENT_TYPE_OPTIONS.map(
          ({ name, label }: { name: string; label: string }) => {
            return (
              <RadioInput
                key={name}
                label={label}
                {...register('eventType')}
                value={name}
              />
            );
          }
        )}
      </div> */}
    </div>
  );
};

export default EventTypeForm;
