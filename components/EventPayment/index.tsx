import DateComponent from '@comps/DateComponent'
import RangeDate from '@comps/RangeDate'
import {
  EventPaymentDTO,
  EventPaymentType
} from '@firebase/EventPayments/eventPayment.model'
import {
  createEventPayment,
  getEventPaymentByIntent
} from '@firebase/EventPayments/main'
import { Price } from '@firebase/Events/event.model'
import useEvents from 'hooks/useEvents'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const EventPayment = () => {
  const {
    query: {
      id,
      priceId,
      payment_intent_client_secret: paymentIntentSecret,
      payment_intent: paymentIntent,
      redirect_status: redirectStatus
    }
  } = useRouter()

  const eventId = id as string

  const { event } = useEvents({ eventId })
  const price = event?.prices?.find(({ id }) => id === priceId)
  const eventPaymentExist = async (
    paymentIntent: EventPaymentType['paymentIntent']
  ) => {
    const payment = await getEventPaymentByIntent(paymentIntent)
    if (!payment) return false
    return payment[0]
  }

  const [eventPayment, setEventPayment] = useState<EventPaymentDTO | null>(null)

  const verifyEventPayment = async ({
    price,
    paymentIntent
  }: {
    price: Price
    paymentIntent: EventPaymentDTO['paymentIntent']
  }) => {
    const eventPayment = await eventPaymentExist(paymentIntent)
    if (!eventPayment) {
      const newEventPayment: EventPaymentDTO = {
        status: 'VALID',
        priceId: price?.id,
        price,
        paymentIntent,
        paymentIntentSecret
      }
      createEventPayment(newEventPayment).then((res) => {
        setEventPayment(newEventPayment)
      })
    } else {
      setEventPayment(eventPayment)
    }
  }

  useEffect(() => {
    if (redirectStatus === 'succeeded' && price) {
      verifyEventPayment({ price, paymentIntent })
    }
  }, [paymentIntent, price])

  if (!price || !event) return <div>Loading ...</div>

  return (
    <div>
      <h1 className="text-xl font-bold text-center">{event?.title}</h1>
      <div className="text-center">
        {event?.includeFinishDate ? (
          <RangeDate startAt={event.date} finishAt={event.finishAt} />
        ) : (
          <DateComponent date={event?.date} format="dd MMMM yy" />
        )}
      </div>
      <div className="text-center">{/* payment status  */}</div>
      <div className="grid place-content-center text-center">
        <span className="font-bold">{price.title}</span>
        <span>{price.description}</span>
      </div>
      <div className="text-center">
        <span>Price:</span>
        <span className="font-bold text-xl">
          ${parseInt(`${price?.amount}`)?.toFixed(2)}
        </span>
      </div>
      <div className="text-center">
        <span className="font-bold text-center text-xl my-2 bg-base-200 w-full flex justify-center ">
          Payment status : {eventPayment?.status}
        </span>
      </div>

      <div className="flex justify-center flex-col gap-2 max-w-sm mx-auto">
        <Link href={'/profile'}>
          <a className="btn mx-auto btn-outline w-full">Back to your profile</a>
        </Link>
        <Link href={`/events/${eventId}`}>
          <a className="btn mx-auto btn-outline w-full">Back to the event</a>
        </Link>
      </div>
    </div>
  )
}

// type DateType = string | number | Date | undefined;

export default EventPayment
