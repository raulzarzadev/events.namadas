import { getEvent } from '@firebase/Events/main';
import { CartProduct } from '@firebase/UserCart/UserCart.model';

export const validateItemsStillValid = async (
  items: CartProduct[]
): Promise<CartProduct[]> => {
  const eventsIds = items.reduce(
    (prev: string[], curr: CartProduct): string[] => {
      if (prev.includes(curr?.eventId || '')) return [...prev];
      return [...prev, curr?.eventId || ''];
    },
    []
  );
  const eventsPromises = eventsIds?.map((eventId) => {
    return getEvent(eventId);
  });

  const events = await Promise.all(eventsPromises);

  const itemsValidated = items.map((item) => {
    let invalidPrice = false;
    const event: any = events.find((event) => event?.id === item.eventId);
    const priceStillExist = event?.prices?.find(
      (price: any) => price.id === item.id
    );
    if (priceStillExist) {
      return { ...item, invalidPrice };
    }
    return { ...item, invalidPrice: true };
  });
  // console.log(itemsValidated);
  return itemsValidated;
};
