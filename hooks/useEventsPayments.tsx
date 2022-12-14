import { EventPaymentType } from '@firebase/EventPayments/eventPayment.model'
import {
  getEventPayment,
  listenEventPayment,
  listenEventPayments,
  listenUserEventPayments,
  listenUserEventsPayments
} from '@firebase/EventPayments/main'
import { Event } from '@firebase/Events/event.model'
import { useEffect, useState } from 'react'
import useAuth from './useAuth'
export interface UseEventPaymentType {
  eventId?: Event['id']
  paymentId?: string
  getUserPayments?: boolean
  getEventPayments?: boolean
}
function useEventsPayments(props?: UseEventPaymentType) {
  const { user } = useAuth()

  const eventId: string | undefined = props?.eventId
  const paymentId: string | undefined = props?.paymentId
  const getUserPayments: boolean | undefined = props?.getUserPayments
  const getEventPayments: boolean | undefined = props?.getEventPayments

  const [userPayments, setUserPayments] = useState<EventPaymentType[] | []>([])
  const [userEventPayments, setUserEvenPayment] = useState<
    EventPaymentType[] | []
  >([])
  const [payment, setPayment] = useState<EventPaymentType | null | undefined>(
    undefined
  )
  const [eventPayments, setEventPayments] = useState<EventPaymentType[] | []>(
    []
  )

  useEffect(() => {
    if (eventId && getEventPayments) {
      listenEventPayments(eventId).then(setEventPayments)
    }
  }, [eventId])
  useEffect(() => {
    if (eventId && user && getUserPayments) {
      listenUserEventPayments(eventId, setUserEvenPayment)
    }
  }, [eventId])

  useEffect(() => {
    if (paymentId) {
      getEventPayment(paymentId).then((res) => setPayment(res))
    }
  }, [paymentId])

  useEffect(() => {
    if (user && getUserPayments) listenUserEventsPayments(setUserPayments)
  }, [])

  const getUserPayment = () => {
    return listenUserEventsPayments((res: any) => {
      console.log(res)
    })
  }

  return {
    userPayments,
    userEventPayments,
    payment,
    eventPayments,
    getUserPayment
  }
}

export default useEventsPayments
