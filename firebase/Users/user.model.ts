import { Base } from "firebase/Base.model"


export interface User extends Base {
  photoURL: any
  image: any
  name: string
  email: string
}
