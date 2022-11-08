import Checkout from '@comps/Checkout';
import OrderSummary from '@comps/Checkout/OrderSummary';
import useAuth from 'hooks/useAuth';

const CheckoutPage = () => {
  const { userCart } = useAuth();
  return (
    <div>
      <OrderSummary items={userCart.products} />
      <Checkout items={userCart.products} />
    </div>
  );
};

export default CheckoutPage;
