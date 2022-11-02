import EventsRow from "@comps/events/eventsRow";
import PaymentsHistory from "@comps/PaymentsHistory";
import useAuth from "hooks/useAuth";
import useEvents from "hooks/useEvents";
import UserSection from "./UserSection";

function Profile() {
  const { userEvents } = useEvents({});
  const {user}=useAuth()
  if(!user) return <>Loading ...</>
  // console.log(user)
  return (
    <div className="sm:p-4">
      <UserSection user={user} />
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