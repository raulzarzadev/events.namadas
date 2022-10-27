import { EventPaymentType } from '@firebase/EventPayments/eventPayment.model';
import { getEventPayments, listenUserEventPayments } from '@firebase/EventPayments/main';
import { useEffect, useState } from 'react';

function useEventsPayments() {
  const [payments, setPayments]=useState<EventPaymentType[]|[]>([])
  useEffect(() => {
    listenUserEventPayments(setPayments);
  }, []);


  return { payments };
}

export default useEventsPayments;
