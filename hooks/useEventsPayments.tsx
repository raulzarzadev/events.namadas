import { EventPaymentType } from '@firebase/EventPayments/eventPayment.model';
import { getEventPayment, listenUserEventPayments, listenUserEventsPayments } from '@firebase/EventPayments/main';
import { Event } from '@firebase/Events/event.model';
import { useEffect, useState } from 'react';
export interface UseEventPaymentType {
  eventId?:Event['id']
  paymentId?:string 
}
function useEventsPayments(props?:UseEventPaymentType) {
  const eventId:string|undefined = props?.eventId
  const paymentId: string | undefined = props?.paymentId;

  const [userPayments, setUserPayments] = useState<EventPaymentType[] | []>([]);
  const [userEventPayments, setUserEvenPayment]= useState<EventPaymentType[]|[]>([])
  const [payment, setPayment]=useState<EventPaymentType|null>(null)
  useEffect(()=>{
    if (eventId) {
      listenUserEventPayments(eventId, setUserEvenPayment);
    }
  },[eventId])

   useEffect(() => {
     if (paymentId) {
       getEventPayment(paymentId).then(res=>{
        console.log(res)
        setPayment(res)
       })
     }
   }, [paymentId]);
   
  useEffect(() => {
    listenUserEventsPayments(setUserPayments);
  }, []);


  return { userPayments, userEventPayments, payment };
}

export default useEventsPayments;
