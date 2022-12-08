import { Base } from '@firebase/Base.model'
import { User } from '@firebase/Users/user.model'

type DateType = string | number | Date | undefined
export interface Event extends Base {
  labels: string[]
  finishAt?: DateType | null
  link?: string
  sport: string
  eventType: string
  date: DateType
  title: string
  // finishDate: string;
  address: string
  includeFinishDate: boolean
  swimmingType: SwimmingTypes
  subEvents: SubEvent[]
  resume: string
  image: string
  images: EventImage[]
  status:
    | 'PLANING'
    | 'ACTIVE'
    | 'IN_PROGRESS'
    | 'FINISHED'
    | 'OUTSIDE'
    | 'HIDDEN'
    | 'POSTPONED'
  subscriptionsOptions?: SubscriptionsOptions
  subscriptions: EventSubscription[]
  links?: EventLink[]
  prices?: Price[]
  announcement?: string
  location?: Coordinates
}

export interface Coordinates {
  lat: number
  lng: number
  accuracy?: number
  address?: string
}

export interface Price {
  id: string
  eventId?: string
  title: string
  description?: string
  image?: string
  // price:number
  amount: number
  discount?: number
  validFrom: DateType
  expiresAt: DateType
  event: PriceEventData
  invalidPrice?: boolean
}

export interface PriceEventData
  extends Partial<
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
  > {
  createdBy?: User['id']
}
export interface EventLink {
  label: string
  url: string
  image?: string
}

export interface SubscriptionsOptions {
  limit: number
  startAt: DateType
  finishAt: DateType
  acceptSubscriptions?: boolean
  acceptTerms?: boolean
}

export interface EventSubscription {
  userId: User['id']
  createdAt: DateType
}

export type SwimmingTypes = 'openWater' | '25m' | '50m' | 'swimmingPool'

export interface EventImage {
  alt: string
  url: string
  text?: string
}
export interface SubEvent {
  distance: string | number
  title?: string
  comments?: string
  description?: string
  finishAt?: any
  date?: string
  style: string
  image?: string
  price?: number
  location?: Coordinates
  link?: string
}
