import Event from "@comps/events/event";
import useAuth from "hooks/useAuth";
import useEvents from "hooks/useEvents";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectEventState } from "store/slices/eventSlice";

const EventPage = () => {
  const {query:{id:eventId}}=useRouter()
  const {user}=useAuth()
  const {event} = useEvents({eventId})
    const isOwner = event?.userId === user?.id
    console.log(event)
  return (
    <div>
      {isOwner && <Options/>}
      <Event event={event} />
    </div>
  );
}

const Options=()=>{
  const event =useSelector(selectEventState)
  return <div className="flex w-full
  justify-around p-2">
       <Link href={`/events/${event?.id}/edit`}>
         <button className="btn btn-outline ">Edit </button>
       </Link>
    </div>
}

export default EventPage;