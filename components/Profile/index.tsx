import EventsRow from "@comps/events/eventsRow";
import useEvents from "hooks/useEvents";

function Profile() {
  const { userEvents } = useEvents({});
  return (
    <div className="sm:p-4">
      <div data-test-id="user-events-created">
        <EventsRow title="My created events" events={userEvents} />
      </div>
    </div>
  );
}

export default Profile;