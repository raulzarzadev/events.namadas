import EventsRow from "@comps/events/eventsRow";
import PaymentsHistory from "@comps/PaymentsHistory";
import useEvents from "hooks/useEvents";

function Profile() {
  const { userEvents } = useEvents({});
  return (
    <div className="sm:p-4">
      <div>
        <PaymentsHistory title="Payments history"/>
      </div>
      <div data-test-id="user-events-created">
        <EventsRow title="My created events" events={userEvents} />
      </div>
    </div>
  );
}

export default Profile;