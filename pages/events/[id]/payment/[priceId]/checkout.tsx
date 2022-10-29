import React, { useEffect, useState } from 'react';
import OrderSummary from '@comps/Checkout/OrderSummary';
import Checkout from '@comps/Checkout';
import useEvents from 'hooks/useEvents';
import { useRouter } from 'next/router';
import { Price } from '@firebase/Events/event.model';

export default function CheckoutPage() {
  const {
    query: { id: eventId, priceId },
  } = useRouter();
  const [items, setItems] = useState<Price[] | []>([]);

  const { event } = useEvents({ eventId: `${eventId}` });

  useEffect(()=>{
    const eventItem = event?.prices?.find(({id})=>id===priceId)
    if(eventItem){
      setItems([eventItem])
    }
  },[event, priceId])
  
  return (
    <div className="grid sm:grid-cols-2 gap-4 px-4  my-10">
      <div className="sm:order-1">
        <OrderSummary items={items} />
      </div>
      <Checkout items={items} />
    </div>
  );
}
