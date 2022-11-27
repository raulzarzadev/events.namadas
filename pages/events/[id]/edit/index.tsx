import FormEvent from '@comps/events/FormEvent';
import { Event } from '@firebase/Events/event.model';
import { getEvent } from '@firebase/Events/main';
import useEvents from 'hooks/useEvents';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const eventId = context?.params?.id || '';
  const event = await getEvent(`${eventId}`);
  return {
    props: { event },
  };
}

const Edit = (props: { event: Event }) => {
  const event = props.event;
  if (!event) return <div>Loading ...</div>;
  return (
    <>
      <FormEvent event={event} />
    </>
  );
};

export default Edit;
