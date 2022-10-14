import { Base } from '@firebase/Base.model'

export interface Event extends Base {
  date: string | number | Date;
  title: string;
  finishDate: string;
  address: string;
  includeFinishDate: string;
  swimmingType: string;
  subEvents: SubEvent[];
  resume: string;
  image: string;
  images: EventImage[];
}

export interface EventImage {
  src:string
  alt:string
}
export interface SubEvent{
  distance:string | number
  title:string,
  comments:string
  date:string
}