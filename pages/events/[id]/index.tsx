import Event from '@comps/events/event';
import JoinEvent from '@comps/JoinEvent';
import ModalDelete from '@comps/modal/ModalDelete_v2';
import { Event as EventType } from '@firebase/Events/event.model';
import { deleteEvent, getEvent } from '@firebase/Events/main';
import useAuth from 'hooks/useAuth';
import useEvents from 'hooks/useEvents';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EventPage = () => {
  const {
    query: { id: eventId },
  } = useRouter();

  const {user} =useAuth()

  const [event, setEvent] = useState<any>(undefined);
  useEffect(()=>{
    if(eventId){
      getEvent(`${eventId}`).then(res=>setEvent(res))
    }
  },[eventId])

  const isOwner = (user && user.id )=== event?.userId
  if (event === undefined) return <div>Loading...</div>;
  if (event === null) return <div>This element is not visible...</div>;

  return (
    <div>
      <Event event={event} />
      <JoinEvent event={event}/>
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
