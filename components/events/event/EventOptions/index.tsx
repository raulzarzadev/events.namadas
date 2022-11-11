import ModalDelete from "@comps/modal/ModalDelete_v2";
import { deleteEvent } from "@firebase/Events/main";
import Link from "next/link";
import { useRouter } from "next/router";

export interface EventOptionsConfig {
  deleteRedirectTo?: string
}
const EventOptions = ({ eventId, config }: { eventId: string, config?: EventOptionsConfig }) => {
  const router = useRouter();
  const deleteRedirectTo = config?.deleteRedirectTo

  const handleDeleteEvent = async () => {
    // console.log(event?.id);
    if (eventId) {
      deleteEvent(eventId).then((res) => {
        deleteRedirectTo ? router.push(deleteRedirectTo) : router.back()
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
}



export default EventOptions;