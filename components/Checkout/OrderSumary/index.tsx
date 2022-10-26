import PreviewImage from '@comps/prevewImage';
import { Price } from '@firebase/Events/event.model';
import { calculateOrderAmount } from 'pages/api/create-payment-intent';
import { useEffect, useState } from 'react';

const OrderSumary = ({ items = [] }: { items: Price[] }) => {
  const [total, setTotal]=useState(0)
  useEffect(()=>{
    setTotal(calculateOrderAmount(items));
  })
  return (
    <div className="bg-base-200 max-w-md mx-auto  rounded-lg p-2 w-full">
      <h4 className="font-bold">Order sumary </h4>
      <div className="grid">
        {items?.map((item, i) => {
          return (
            <div key={`${item?.id}-${i}`}>
              <div className="flex">
                <div>
                  <PreviewImage image={item?.image} />
                </div>
                <div className="grid">
                  <span>{item?.title}</span>
                  <span className="text-sm font-thin">{item?.description}</span>
                  <span className="font-bold">{item?.price}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <div className="divider mb-0 " />
          <div className="text-end">
            <span>Total:</span>
            <span>$</span>
            <span className='font-bold text-xl'> {parseFloat(`${total}`).toFixed(2)} </span>
            <span>mxn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSumary;
