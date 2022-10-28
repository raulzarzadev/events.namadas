import { Event } from '@firebase/Events/event.model';
import { where } from 'firebase/firestore';
import { FirebaseCRUD } from '../FirebaseCRUD';
import { EventPaymentType } from './eventPayment.model';

const eventPaymentsCRUD = new FirebaseCRUD('event_payments');

export const setEventPayment = (itemId: string, newItem: object) =>
  eventPaymentsCRUD.setDoc(itemId, newItem);

export const createEventPayment = (newItem: EventPaymentType) =>
  eventPaymentsCRUD.create(newItem);

export const updateEventPayment = (itemId: string, newItem: EventPaymentType) =>
  eventPaymentsCRUD.update(itemId, newItem);

export const deleteEventPayment = (itemId: string) =>
  eventPaymentsCRUD.delete(itemId);

export const getEventPayment = (itemId: string) =>
  eventPaymentsCRUD.get(itemId);

export const listenEventPayment = (itemId: string, cb: CallableFunction) =>
  eventPaymentsCRUD.listen(itemId, cb);

export const listenUserEventsPayments = (cb: CallableFunction) =>
  eventPaymentsCRUD.listenCurrentUserDocs(cb);

  export const listenUserEventPayments = (
    eventId: Event['id'],
    cb: CallableFunction
  ) =>
    eventPaymentsCRUD.listenCurrentUserDocsFilter([where('price.eventId', '==', eventId)],cb);

export const getEventPayments = (itemId: EventPaymentType['id']) =>
  eventPaymentsCRUD.getMany([where('id', '==', itemId)]);

export const getEventPaymentsByStatus = (status: EventPaymentType['status']) =>
  eventPaymentsCRUD.getMany([where('status', '==', status)]);

  export const getEventPaymentByIntent = (
    paymentIntent: EventPaymentType['paymentIntent']
  ) => eventPaymentsCRUD.getMany([where('paymentIntent', '==', paymentIntent)]);