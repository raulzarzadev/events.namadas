import EventsList from "@comps/events/eventsList";
import EventCard from "@comps/EventCard";
import Link from "next/link";
import EventsRow from "@comps/events/eventsRow";
import useEvents from "hooks/useEvents";

function Profile() {
  const handleClick=(id:string)=>{
    console.log(id)
    return ''
  }
    const { userEvents } = useEvents({});
  return (
    <div>
      {/* <div className="flex justify-center w-full ">
        <Link href={'/'}>
          <a className="btn btn-outline">Find events</a>
        </Link>
      </div> */}
      <EventsRow title='My events' events={userEvents}/>
    </div>
  );
}

export default Profile;