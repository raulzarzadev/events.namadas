import OrderSummary from '@comps/Checkout/OrderSummary';

import { removeItemToUserCart } from '@firebase/UserCart/main';
import { CartProduct } from '@firebase/UserCart/UserCart.model';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';

const UserCart = () => {
  const { userCart } = useAuth();
  const router = useRouter();
  const getTotalCart = (products: any[]): number => {
    let total = 0;
    products.forEach((product: any) => {
      total += parseFloat(`${product.amount}`);
    });
    return total;
  };
  const total = getTotalCart(userCart.products);

  // console.log(userCart);
  // TODO add event details when price is created
  return (
    <div>
      <div className="grid  gap-2 p-2 max-w-md mx-auto w-full">
        {userCart.products.length === 0 && (
          <div>
            <h4 className="text-center my-4 font-bold">
              You have no products to pay
            </h4>
          </div>
        )}
        <OrderSummary items={userCart.products} />

        <button
          className="btn btn-accent"
          onClick={() => {
            router.push('/checkout');
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default UserCart;
