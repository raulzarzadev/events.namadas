import { Base } from '@firebase/Base.model'

export interface User extends Base {
  image: any
  photoURL: any
  name: string
  email: string
  logged?:boolean
}
