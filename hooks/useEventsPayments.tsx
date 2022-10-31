import { EventPaymentType } from '@firebase/EventPayments/eventPayment.model';
import { getEventPayment, listenUserEventPayments, listenUserEventsPayments } from '@firebase/EventPayments/main';
import { Event } from '@firebase/Events/event.model';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';
export interface UseEventPaymentType {
  eventId?: Event['id'];
  paymentId?: string;
  getUserPayments?:boolean
}
function useEventsPayments(props?:UseEventPaymentType) {
  const {user}=useAuth()
  const eventId:string|undefined = props?.eventId
  const paymentId: string | undefined = props?.paymentId;
  const getUserPayments: boolean | undefined=props?.getUserPayments
  const [userPayments, setUserPayments] = useState<EventPaymentType[] | []>([]);
  const [userEventPayments, setUserEvenPayment]= useState<EventPaymentType[]|[]>([])
  const [payment, setPayment]=useState<EventPaymentType|null|undefined>(undefined)
  
  useEffect(()=>{
    if (eventId) {
      // listenUserEventPayments(eventId, setUserEvenPayment);
    }
  },[eventId])

   useEffect(() => {
     if (paymentId) {
       getEventPayment(paymentId).then(res=>setPayment(res))
     }
   }, [paymentId]);
   
  useEffect(() => {
    if (user&&getUserPayments) listenUserEventsPayments(setUserPayments);
  }, []);


  return { userPayments, userEventPayments, payment };
}

export default useEventsPayments;
