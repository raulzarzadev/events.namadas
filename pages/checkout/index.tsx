import Checkout from '@comps/Checkout';
import OrderSummary from '@comps/Checkout/OrderSummary';
import { Event } from '@firebase/Events/event.model';
import { getEvent } from '@firebase/Events/main';
import { CartProduct } from '@firebase/UserCart/UserCart.model';
import { async } from '@firebase/util';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { validateItemsStillValid } from './utils';

const CheckoutPage = () => {
  const { userCart } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    validateItemsStillValid(userCart.products).then((res) => setItems(res));
  }, [userCart.products]);
  console.log(items);

  return (
    <div>
      <OrderSummary items={items} />
      <Checkout
        items={items}
        disabled={items.find((item) => !!item.invalidPrice)}
      />
    </div>
  );
};

export default CheckoutPage;
