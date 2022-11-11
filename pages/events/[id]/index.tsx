import Event from '@comps/events/event';
import EventOptions from '@comps/events/event/EventOptions';
import JoinEvent from '@comps/JoinEvent';
import { getEvent } from '@firebase/Events/main';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';

const EventPage = ({ event }: { event: any }) => {
  const {
    query: { id: eventId },
  } = useRouter();

  const { user } = useAuth();

  const isOwner = (user && user.id) === event?.userId;
  if (event === undefined) return <div>Loading...</div>;
  if (event === null) return <div>This element is not visible...</div>;

  return (
    <div>
      <Event event={event} />
      <JoinEvent event={event} />
      {isOwner && <EventOptions eventId={`${eventId}`} />}
    </div>
  );
};



export async function getServerSideProps (context: any) {
  const eventId = context.params.id;
  const event = await getEvent(eventId);
  return {
    props: {
      event,
    },
  };
}

export default EventPage;
