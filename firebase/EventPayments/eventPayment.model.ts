import { Base } from '@firebase/Base.model'
import { Price } from '@firebase/Events/event.model';
import { User } from '@firebase/Users/user.model';

export interface EventPaymentType extends Base {
  status?: 'VALID' | 'WAITING' | 'PAID_OUT' | 'INVALID';
  priceId?: string;
  paymentIntent?: any;
  paymentIntentSecret?: any; //  Type 'string[]' is not assignable to type 'string'
  price?: Price;
}