import RadioInput from '@comps/inputs/Radio';

const EVENT_STATUS_OPTIONS = [
  // {
  //   name: 'OUTSIDE',
  //   label: 'Outside',
  //   helperText: 'This event is organized outside of nadamas',
  // },
  //{ name: 'PLANING', label: 'Planing', helperText: 'Is not visible yet' },
  {
    name: 'HIDDEN',
    label: 'Hidden',
    helperText: 'This event is just visible for you ',
  },
  {
    name: 'ACTIVE',
    label: 'Active',
    helperText: 'Is visible and people can search it',
  },
  // { name: 'PAUSED', label: 'Paused' },
  // { name: 'CANCELED', label: 'Canceled' },
  {
    name: 'IN_PROGRESS',
    label: 'In progress',
    helperText: 'Is happening in this moment. you should stop subscription ',
  },
  {
    name: 'FINISHED',
    label: 'Finished',
    helperText: 'Event had finished, you should enable a results route',
  },
];
const EventType = ({
  register,
  formValues,
}: {
  register: any;
  formValues: any;
}) => {
  return (
    <div>
      <h4 className="font-bold text-lg">Current event status</h4>
      <div className="flex justify-around flex-grow flex-wrap">
        {EVENT_STATUS_OPTIONS.map(
          ({ name, label }: { name: string; label: string }) => {
            return (
              <RadioInput
                key={name}
                label={label}
                {...register('status')}
                value={name}
              />
            );
          }
        )}
      </div>

      <div className="text-center">
        <span>
          {
            EVENT_STATUS_OPTIONS.find(({ name }) => name === formValues.status)
              ?.helperText
          }
        </span>
      </div>
    </div>
  );
};

export default EventType;
