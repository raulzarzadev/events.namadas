import React, { useEffect, useState } from 'react';
import OrderSumary from '@comps/Checkout/OrderSumary';
import Checkout from '@comps/Checkout';
import useEvents from 'hooks/useEvents';
import { useRouter } from 'next/router';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export default function CheckoutPage() {
  const {
    query: { id: eventId, priceId },
  } = useRouter();
  const [items, setItems] = useState([]);

  const { event } = useEvents({ eventId: `${eventId}` });

  useEffect(()=>{
    if(event){
      const eventItems = event.prices?.find(({id})=>id===priceId)
      setItems([eventItems])
    }
  },[event, priceId])
  return (
    <div className="grid sm:grid-cols-2 gap-4 px-4  my-10">
      <div className="sm:order-1">
        <OrderSumary items={items} />
      </div>
      <Checkout items={items} />
    </div>
  );
}
