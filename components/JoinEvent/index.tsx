import PriceCard from '@comps/PriceCard_v2';
import { Event, Price } from '@firebase/Events/event.model';
import { addItemToUserCart, createCart } from '@firebase/UserCart/main';

import useAuth from 'hooks/useAuth';
import useEvents from 'hooks/useEvents';
import useEventsPayments from 'hooks/useEventsPayments';
import { useRouter } from 'next/router';

const JoinEvent = ({ event }: { event: Event }) => {
  const { userEventPayments } = useEventsPayments({ eventId: event?.id });
  const { user, userCart } = useAuth();

  const alreadyPaid = (priceId: Price['id']): boolean => {
  const prod=userCart?.products.find((item)=>item.id===priceId)
  return !!prod
  console.log(prod)
  }

  const handleAddToCart = async ({ price }: { price: Price }) => {
    if (userCart) {
      addItemToUserCart(userCart?.id, price).then((res) => console.log(res));
    } else {
      createCart({
        products: [price],
      }).then((res) => console.log(res));
    }
  };

  console.log(userCart.products)

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Be part of this event</h2>
      <div className="flex flex-wrap justify-center  ">
        {!event?.prices?.length ? (
          <div className="text-center my-5">
            <div>This event have no pricing options yet</div>
            <div>Try again letter</div>
          </div>
        ) : null}
        {event?.prices?.map((price) => (
          <div key={price?.id} className="w-[180px] p-2">
            <PriceCard
              price={price}
              alreadyInCart={alreadyPaid(price.id)}
              alreadyPaid={false}
              handleAddToCart={() => handleAddToCart({ price, event })}
              handlePayNow={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinEvent;
