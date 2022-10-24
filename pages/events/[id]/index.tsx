import Event from '@comps/events/event';
import useAuth from 'hooks/useAuth';
import useEvents from 'hooks/useEvents';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectEventState } from 'store/slices/eventSlice';

const EventPage = () => {
  const {
    query: { id: eventId },
  } = useRouter();

  const { user } = useAuth();

  const { event } = useEvents({ eventId:`${eventId}` });

  const isOwner = event?.userId === user?.id;
  return (
    <div>
      <Event event={event} />
      {isOwner && <Options />}
    </div>
  );
};

const Options = () => {
  const event = useSelector(selectEventState);
  return (
    <div
      className=" 
      flex w-full
      justify-evenly 
      max-w-lg 
      mx-auto 
      p-2"
    >
      <Link href={`/events/${event?.id}/edit`}>
        <button className="btn btn-outline ">Edit </button>
      </Link>
      <Link href={`/events/${event?.id}/manage`}>
        <button className="btn btn-outline ">Manage </button>
      </Link>
    </div>
  );
};

export default EventPage;
