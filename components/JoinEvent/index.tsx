import NotLoginModal from '@comps/modal/NotLoginModal';
import PriceCard from '@comps/PriceCard_v2';
import { Event, Price } from '@firebase/Events/event.model';
import { addItemToUserCart, createCart } from '@firebase/UserCart/main';

import useAuth from 'hooks/useAuth';
import useEventsPayments from 'hooks/useEventsPayments';
import { useState } from 'react';

const JoinEvent = ({ event }: { event: Event }) => {
  const { userEventPayments } = useEventsPayments({ eventId: event?.id });
  const { user, userCart } = useAuth();

  const alreadyPaid = (priceId: Price['id']): boolean => {
    const prod = userCart?.products.find((item: any) => item?.id === priceId);
    return !!prod;
  };

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleOpenLoginModal = () => {
    setOpenLoginModal(!openLoginModal);
  };

  const handleAddToCart = async ({ price }: { price: Price }) => {
    if (!user?.id) {
      handleOpenLoginModal();
      return;
    }

    if (userCart?.id) {
      addItemToUserCart(userCart?.id, price).then((res) => console.log(res));
    } else {
      createCart({
        products: [price],
      }).then((res) => console.log(res));
    }
  };

  return (
    <div>
      <NotLoginModal open={openLoginModal} handleOpen={handleOpenLoginModal} />
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
              handleAddToCart={() =>
                handleAddToCart({
                  price: {
                    ...price,
                    event: {
                      eventType: event.eventType,
                      createdBy: event.userId,
                      date: event.date,
                      includeFinishDate: event.includeFinishDate,
                      finishAt: event.finishAt,
                      address: event.address,
                      id: event.id,
                      images: event.images || [],
                      subscriptionsOptions: event.subscriptionsOptions,
                      title: event.title,
                    },
                  },
                })
              }
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
