import { Base } from '@firebase/Base.model'
import { Price } from '@firebase/Events/event.model'

export interface UserCart extends Base {
  products: CartProduct[]
}

export type UserCartDTO = Partial<UserCart>

export interface CartProduct extends Partial<Price> {
  id: Price['id']
}
