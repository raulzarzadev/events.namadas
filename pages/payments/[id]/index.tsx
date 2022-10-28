import PaymentDetails from "@comps/PaymentDetails";
import PrivatePage from "HOCS/PrivatePage";

const PaymentPage = () => {
  return (
    <div>
      <PrivatePage>
      <PaymentDetails/>
      </PrivatePage>
    </div>
  );
}

export default PaymentPage;