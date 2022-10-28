import useEventsPayments from "hooks/useEventsPayments";
import { useRouter } from "next/router";

const PaymentDetails = () => {
  const {query:{id:paymentId}}=useRouter()
  const {payment}=useEventsPayments({paymentId:`${paymentId}`})
  console.log(payment)
  return (
    <div>
      Payment details and manage
    </div>
  );
}

export default PaymentDetails;