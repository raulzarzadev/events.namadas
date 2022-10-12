import { Base } from '@firebase/Base.model'

export interface Event extends Base {
  date:string| number | Date
  title:string 
}
