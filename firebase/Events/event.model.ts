import { Base } from '@firebase/Base.model'

export interface Event extends Base {
  sport: string;
  eventType: string;
  date: string | number | Date;
  title: string;
  finishDate: string;
  address: string;
  includeFinishDate: string;
  swimmingType: SwimmingTypes;
  subEvents: SubEvent[];
  resume: string;
  image: string;
  images: EventImage[];
  status: 'PLANING'|'ACTIVE'|'IN_PROGRESS'|'FINISHED'
}

export type SwimmingTypes = "openWater" | "25m" | "50m" |'swimmingPool'

export interface EventImage {
  src:string
  alt:string
}
export interface SubEvent{
  distance:string | number
  title:string,
  comments:string
  date:string
  style:string
}