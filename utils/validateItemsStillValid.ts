import { getEvent } from '@firebase/Events/main'
import { CartProduct } from '@firebase/UserCart/UserCart.model'

export const validateItemsStillValid = async (
  items: CartProduct[] = []
): Promise<CartProduct[]> => {
  const eventsIds = items.reduce(
    (prev: string[], curr: CartProduct): string[] => {
      if (prev.includes(curr?.eventId ?? '')) return [...prev]
      return [...prev, curr?.eventId ?? '']
    },
    []
  )

  const eventsPromises = eventsIds?.map(async (eventId) => {
    return await getEvent(eventId)
  })

  const events = await Promise.all(eventsPromises)

  const itemsValidated = items.map((item) => {
    const invalidPrice = false
    const event: any = events.find((event) => event?.id === item.eventId)

    const latestPrice = event?.prices?.find(
      (price: any) => price.id === item.id
    )

    if (latestPrice) {
      // this will guaranty that the price to pay is the latests
      return { ...latestPrice, id: item.id, invalidPrice } // Id is necessary for delete from cart
    }
    return { ...latestPrice, id: item.id, invalidPrice: true } // Id is necessary for delete from cart
  })
  return itemsValidated
}
