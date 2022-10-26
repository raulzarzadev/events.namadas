import { Price } from "@firebase/Events/event.model";
import OrderSumary from "./OrderSumary";

const Checkout = () => {
  const items:Price[]=[]

  return (
    <div>
      <OrderSumary items={items} />
      <PaymentForm />
    </div>
  );
}

export default Checkout;