import { listenUserEventsPayments } from "@firebase/EventPayments/main";
import { useEffect } from "react";

const UserEvents = () => {
  
  
  useEffect(()=>{
    listenUserEventsPayments((res:any) => console.log(res));
  },[])

  

  return <div>
  {/* <EventsRow events={userEventPayments} title='Subscribed events'/>   */}
  </div>;
}

export default UserEvents;