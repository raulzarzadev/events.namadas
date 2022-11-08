import ModalDelete from '@comps/modal/ModalDelete_v2';
import PreviewImage from '@comps/previewImage';
import { Price } from '@firebase/Events/event.model';
import { removeItemToUserCart } from '@firebase/UserCart/main';
import { CartProduct } from '@firebase/UserCart/UserCart.model';
import useAuth from 'hooks/useAuth';
import Link from 'next/link';
import { calculateOrderAmount } from 'pages/api/create-payment-intent';
import { useEffect, useState } from 'react';

const OrderSummary = ({ items = [] }: { items: CartProduct[] }) => {
  const { user, userCart } = useAuth();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(calculateOrderAmount(items));
  });
  console.log(items);
  const handleDeleteItem = (item: any) => {
    removeItemToUserCart(userCart?.id || '', item).then((res) =>
      console.log(res)
    );
  };
  return (
    <div className="bg-base-200  rounded-lg p-2 w-full">
      <h4 className="font-bold">Order summary </h4>
      <div className="grid w-full">
        {items?.map((item, i) => {
          return (
            <div key={`${item?.id}-${i}`} className="flex">
              <div>
                <PreviewImage image={item?.image} showDelete={false} />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex w-full justify-end ">
                  <ModalDelete
                    title={'Remove item from cart'}
                    handleDelete={() => handleDeleteItem(item)}
                    buttonLabel=""
                    openButtonProps={{
                      className: 'btn btn-ghost btn-sm btn-circle',
                    }}
                    // handleDelete={() => handleDeleteItem(item)}
                    // deleteSuccessful={() => {}}
                    // deleteText={null}
                    // modalTitle={'Remove item from cart'}
                    // buttonType={'icon'}
                    // disabled={false}
                  />
                </div>

                <div className="grid">
                  <span className="text-xs">
                    <Link href={`/events/${item.eventId}`}>
                      <a className="hover:underline cursor-pointer">
                        {item.event?.title}
                      </a>
                    </Link>
                  </span>
                  <span>{item?.title}</span>
                  <span className="text-sm font-thin">{item?.description}</span>
                  <span className="font-bold text-end">
                    ${parseFloat(`${item?.amount ?? 0}`)?.toFixed(2)}
                  </span>
                </div>
                <div className="divider mt-0" />
              </div>
            </div>
          );
        })}
        <div>
          <div className="text-end">
            <span>Total:</span>
            <span>$</span>
            <span className="font-bold text-xl">
              {' '}
              {parseFloat(`${total}`).toFixed(2)}{' '}
            </span>
            <span>mxn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
