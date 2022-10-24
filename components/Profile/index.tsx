import EventsRow from "@comps/events/eventsRow";
import useEvents from "hooks/useEvents";

function Profile() {
  const { userEvents } = useEvents({});
  return (
    <div>
      <EventsRow title='My events' events={userEvents}/>
    </div>
  );
}

export default Profile;