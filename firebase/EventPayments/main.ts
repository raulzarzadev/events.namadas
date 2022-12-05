import { Event } from '@firebase/Events/event.model'
import { where } from 'firebase/firestore'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { EventPaymentDTO, EventPaymentType } from './eventPayment.model'

const eventPaymentsCRUD = new FirebaseCRUD('event_payments')

export const setEventPayment = async (itemId: string, newItem: object) =>
  await eventPaymentsCRUD.setDoc(itemId, newItem)

export const createEventPayment = async (newItem: EventPaymentDTO) =>
  await eventPaymentsCRUD.create(newItem)

export const updateEventPayment = async (
  itemId: string,
  newItem: EventPaymentDTO
) => await eventPaymentsCRUD.update(itemId, newItem)

export const deleteEventPayment = async (itemId: string) =>
  await eventPaymentsCRUD.delete(itemId)

export const getEventPayment = async (itemId: string) =>
  await eventPaymentsCRUD.get(itemId)

export const listenEventPayment = async (
  itemId: string,
  cb: CallableFunction
) => await eventPaymentsCRUD.listen(itemId, cb)

export const listenUserEventsPayments = async (cb: CallableFunction) =>
  await eventPaymentsCRUD.listenCurrentUserDocs(cb)

export const listenUserEventPayments = async (
  eventId: Event['id'],
  cb: CallableFunction
) =>
  await eventPaymentsCRUD.listenCurrentUserDocsFilter(
    [where('price.eventId', '==', eventId)],
    cb
  )

export const getEventPayments = async (itemId: EventPaymentType['id']) =>
  await eventPaymentsCRUD.getMany([where('id', '==', itemId)])

export const getEventPaymentsByStatus = async (
  status: EventPaymentType['status']
) => await eventPaymentsCRUD.getMany([where('status', '==', status)])

export const getEventPaymentByIntent = async (
  paymentIntent: EventPaymentType['paymentIntent']
) =>
  await eventPaymentsCRUD.getMany([where('paymentIntent', '==', paymentIntent)])

export const listenEventPayments = async (itemId: string) =>
  await eventPaymentsCRUD.getMany([where('price.eventId', '==', itemId)])
