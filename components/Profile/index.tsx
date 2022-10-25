import EventsRow from "@comps/events/eventsRow";
import useEvents from "hooks/useEvents";

function Profile() {
  const { userEvents } = useEvents({});
  return (
    <div data-test-id="user-events-created">
      <EventsRow title="My created events" events={userEvents} />
    </div>
  );
}

export default Profile;