import FormEvent from '@comps/events/formEvent_V4';
import PrivatePage from 'HOCS/PrivatePage';

const NewEvent = () => {
  // TODO create an interface to import events from other pages,
  // TODO search events and publish it
  return (
    <PrivatePage>
      <FormEvent />
    </PrivatePage>
  );
};

export default NewEvent;
