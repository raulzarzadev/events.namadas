import { listenEvent, listenUserEvents } from '@firebase/Events/main';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEventState, setEvent } from 'store/slices/eventSlice';
import useAuth from './useAuth';

interface UseEvenType{
  eventId?: string
}
function useEvents(props: UseEvenType) {
  const eventId = props?.eventId
  // const [event, setEvent]=useState(undefined)
  const dispatch = useDispatch();
  const event = useSelector(selectEventState);
  const {user}=useAuth()
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    if (eventId) {
      listenEvent(eventId, (res: any) => {
        dispatch(setEvent(res));
      });
    }
  }, [eventId]);

  useEffect(() => {
    if(user){

      listenUserEvents((res) => {
        setUserEvents(res);
      });
    }
  }, [user]);

  return { event, userEvents };
}

export default useEvents;
