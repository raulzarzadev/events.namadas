import { Base } from '@firebase/Base.model'
import { User } from '@firebase/Users/user.model';

type  DateType = string | number | Date | undefined;
export interface Event extends Base {
  finishAt?: DateType|null;
  link?:string,
  sport: string;
  eventType: string;
  date: DateType;
  title: string;
  // finishDate: string;
  address: string;
  includeFinishDate: string;
  swimmingType: SwimmingTypes;
  subEvents: SubEvent[];
  resume: string;
  image: string;
  images: EventImage[];
  status: 'PLANING' | 'ACTIVE' | 'IN_PROGRESS' | 'FINISHED';
  subscriptionsOptions?: SubscriptionsOptions;
  subscriptions: EventSubscription[];
  links?:EventLink[]
  prices?:Price[]
}
export interface Price {
  id: string;
  eventId?: string;
  title: string;
  description?: string;
  image?: string;
  // price:number
  amount: number;
  discount?: number;
  finishAt?: DateType;
  startAt?: DateType;
  event: Partial<
    Pick<
      Event,
      | 'date'
      | 'id'
      | 'eventType'
      | 'title'
      | 'finishAt'
      | 'subscriptionsOptions'
      | 'address'
      | 'images'
      | 'userId'
      | 'includeFinishDate'
    >
  >;
}
export interface EventLink {
  label:string
  url:string
  image?:string
}

export interface SubscriptionsOptions {
  limit: number;
  startAt: DateType;
  finishAt: DateType;
}

export interface EventSubscription {
  userId:User['id']
  createdAt:DateType

}

export type SwimmingTypes = "openWater" | "25m" | "50m" |'swimmingPool'

export interface EventImage {
  src:string
  alt:string
  url?:string
  text?:string
}
export interface SubEvent{
  distance:string | number
  title?:string,
  comments?:string
  date?:string
  style:string
  image?:string
}