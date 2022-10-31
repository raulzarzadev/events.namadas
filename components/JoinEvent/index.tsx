import PriceCard from '@comps/PriceCard';
import { Event, Price } from '@firebase/Events/event.model';
import useEvents from 'hooks/useEvents';
import useEventsPayments from 'hooks/useEventsPayments';
import { useRouter } from 'next/router';

const JoinEvent = ({event}:{event:Event}) => {
  
  const { userEventPayments } = useEventsPayments({ eventId: event?.id});

  const alreadyPaid = (priceId: Price['id']): string => {
    let res = '';
    userEventPayments.forEach((userPayment) => {
      if (userPayment?.price?.id === priceId) {
        res = userPayment?.id || '';
      }
    });
    return res;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Be part of this event</h2>
      <div className="flex flex-wrap justify-center  ">
        {!event?.prices?.length ? (
          <div  className='text-center my-5'>
            <div>This event have no pricing options yet</div>
            <div>Try again letter</div>
          </div>
        ) : null}
        {event?.prices?.map((price) => (
          <div key={price?.id} className="w-[180px] p-2">
            <PriceCard price={price} paymentId={alreadyPaid(price.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinEvent;
