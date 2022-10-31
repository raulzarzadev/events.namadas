import Event from '@comps/events/event';
import ModalDelete from '@comps/modal/ModalDelete_v2';
import { deleteEvent } from '@firebase/Events/main';
import useAuth from 'hooks/useAuth';
import useEvents from 'hooks/useEvents';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EventPage = () => {
  const {
  
    query: { id: eventId },
    back,
  } = useRouter();

  const { user } = useAuth();

  const { event } = useEvents({ eventId: `${eventId}` });
  const isOwner = event?.userId === user?.id;
  
  if (event===undefined) return <div>Loading ...</div>;
  if (event === null) {
    return (
      <div className="text-center">
        <p className="my-6">This event is not visible</p>
        <div className="flex justify-center w-full">
          <button className="btn btn-outline" onClick={()=>back}>Go back</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Event event={event} />
      {isOwner && <Options eventId={`${eventId}`} />}
    </div>
  );
};
const Options = ({ eventId }: { eventId?: string }) => {
  // const event = useSelector(selectEventState);
  const router = useRouter();

  const handleDeleteEvent = async () => {
    // console.log(event?.id);
    if (eventId) {
      deleteEvent(eventId).then((res) => {
        router.back();
        console.log(res);
      });
    }
  };

  return (
    <div
      className=" 
      flex w-full
      justify-evenly 
      max-w-lg 
      mx-auto 
      p-2"
    >
      <ModalDelete
        title={'Delete event'}
        handleDelete={handleDeleteEvent}
        openButtonProps={{ 'data-test-id': 'delete-event-option' }}
      />
      <Link href={`/events/${eventId}/edit`}>
        <button className="btn btn-outline " data-test-id="edit-event">
          Edit{' '}
        </button>
      </Link>
      <Link href={`/events/${eventId}/manage`}>
        <button className="btn btn-outline ">Manage </button>
      </Link>
    </div>
  );
};

export default EventPage;
