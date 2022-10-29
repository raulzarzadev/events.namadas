import { where } from 'firebase/firestore';
import { FirebaseCRUD } from '../FirebaseCRUD';
import { Event } from './event.model';

const eventsCRUD = new FirebaseCRUD('events_v2');

export const setEvent = (itemId: string, newItem: object) =>
  eventsCRUD.setDoc(itemId, newItem);

export const createEvent = (newItem: Event) => eventsCRUD.create(newItem);

export const updateEvent = (itemId: string, newItem: Event) =>
  eventsCRUD.update(itemId, newItem);

export const deleteEvent = (itemId: string) => eventsCRUD.delete(itemId);

export const getEvent = (itemId: string) => eventsCRUD.get(itemId);

export const listenEvent = (itemId: string, cb: CallableFunction) =>
  eventsCRUD.listen(itemId, cb);

export const listenUserEvents = (cb: CallableFunction) =>
  eventsCRUD.listenCurrentUserDocs(cb);

export const getEvents = () =>
  eventsCRUD.getMany([where('status', '==', 'ACTIVE')]);

export const getEventsByStatus = (status: Event['status']) => {
  return eventsCRUD.getMany([where('status', '==', status)]);
};


