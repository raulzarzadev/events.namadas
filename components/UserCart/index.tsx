import ModalDelete from '@comps/modal/modalDelete';
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
  const handleDeleteItem = (item: any) => {
    removeItemToUserCart(userCart?.id || '', item).then((res) =>
      console.log(res)
    );
  };
  console.log(userCart); // TODO add event details when price is created
  return (
    <div>
      <div className="grid grid-cols-1 gap-2 p-2">
        {userCart.products.length === 0 && (
          <div>
            <h4 className="text-center my-4 font-bold">
              You have no products to pay
            </h4>
          </div>
        )}
        {userCart.products.map((item: CartProduct, i) => (
          <div key={`${item.id}+${i}`}>
            <div className="">
              <div className="flex w-full justify-end">
                <ModalDelete
                  handleDelete={() => handleDeleteItem(item)}
                  deleteSuccessful={() => {}}
                  deleteText={null}
                  modalTitle={'Remove item from cart'}
                  buttonType={'icon'}
                  disabled={false}
                />
              </div>
              <h4 className="font-bold">{item.title}</h4>
              <p></p>
              <div className="text-end">
                <span>${parseFloat(`${item.amount}`).toFixed(2)}</span>
              </div>
            </div>
            <div className="divider" />
          </div>
        ))}
        <div className="text-end">
          <span className="font-bold text-2xl">${total.toFixed(2)}</span>
        </div>
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
