import { Event } from '@firebase/Events/event.model';
import { getEventsByStatus, listenEvent, listenUserEvents } from '@firebase/Events/main';
import { SetStateAction, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectEventState, setEvent } from 'store/slices/eventSlice';
import useAuth from './useAuth';

interface UseEvenType  {
  eventId?: Event['id'];
  allEvents?: boolean;
  getByStatus?: Event["status"] | undefined
}
function useEvents({ eventId, getByStatus }: UseEvenType) {
  // const dispatch = useDispatch();
 //  const event = useSelector(selectEventState);
  const { user } = useAuth();

  const [userEvents, setUserEvents] = useState([]);
  const [events, setEvents] = useState<Event[] | [] >([]);
const [event, setEvent]=useState<Event|null>(null)
  useEffect(() => {
    if (getByStatus) {
      getEventsByStatus(getByStatus).then((res) => setEvents(res));
    }
  }, []);
  
  useEffect(() => {
    if (eventId) {
      listenEvent(eventId, (res: any) => {
       //dispatch(setEvent(res));
       setEvent(res)
      });
    }
  }, [eventId]);

  useEffect(() => {
    if (user) {
      listenUserEvents((res: SetStateAction<never[]>) => {
        setUserEvents(res);
      });
    }
  }, []);

  return { event, userEvents, events };
}

export default useEvents;
