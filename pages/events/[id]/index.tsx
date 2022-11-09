import Breadcrumb from '@comps/Breadcrumb';
import Event from '@comps/events/event';
import JoinEvent from '@comps/JoinEvent';
import ModalDelete from '@comps/modal/ModalDelete_v2';
import { deleteEvent, getEvent } from '@firebase/Events/main';
import useAuth from 'hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
        openButtonProps={{
          'data-test-id': 'delete-event-option',
        }}
        buttonLabel={''}
      />
      <Link href={`/events/${eventId}/edit`}>
        <button className="btn btn-outline w-1/4 " data-test-id="edit-event">
          Edit{' '}
        </button>
      </Link>
      <Link href={`/events/${eventId}/manage`}>
        <button className="btn btn-outline w-1/4 ">Manage </button>
      </Link>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const eventId = context.params.id;
  const event = await getEvent(eventId);
  return {
    props: {
      event,
    },
  };
}

export default EventPage;
