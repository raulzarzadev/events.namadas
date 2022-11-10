import FormEvent from '@comps/events/formEvent_V3';
import PrivatePage from 'HOCS/PrivatePage';

const NewEvent = () => {
  // TODO create just a form where you can chose what kind of event, out side or inside, and mor details to publish it
  // TODO create an interface to import events from other pages,
  // TODO search events and publish it
  return (
    <PrivatePage>
      <FormEvent />
    </PrivatePage>
  );
};

export default NewEvent;
