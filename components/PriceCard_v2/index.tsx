import Modal from '@comps/modal';
import { Event, Price } from '@firebase/Events/event.model';
import Link from 'next/link';
import { useState } from 'react';

export interface PriceCard {
  price: Price;
  alreadyInCart:boolean
  alreadyPaid:boolean
  handleAddToCart:()=>void
  handlePayNow:()=>void
}
const PriceCard = ({
  price,
  alreadyInCart,
  alreadyPaid,
  handleAddToCart,
  handlePayNow,
}: PriceCard) => {

  return (
    <>
      <div className="group  rounded-lg bg-base-200 shadow-lg w-full h-full  cursor-pointer active:shadow-none border-2 border-transparent hover:border-base-content ">
        <div className="grid  h-full  ">
          <h4 className="text-center font-bold  self-start p-2 ">
            {price?.title}
          </h4>

          <div className=" text-center  ">
            <p className="p-2">{price?.description}</p>
          </div>

          <div className="flex w-full  h-20 self-end flex-wrap flex-col justify-between">
            <div className=" text-center uppercase self-end w-full">
              <span>${parseInt(`${price?.amount || 0}`).toFixed(2)} mxn</span>
            </div>
            <div className="flex justify-between w-full ">
              <div className="w-1/2 text-center items-center justify-center flex">
                <button
                  onClick={() => handleAddToCart()}
                  className="w-full h-full btn rounded-none rounded-bl-lg  text-xs"
                  disabled={alreadyInCart || alreadyPaid}
                >
                  {alreadyInCart ? 'In the cart' : 'Add to cart'}
                </button>
              </div>
              <div className="w-1/2 text-center items-center justify-center flex ">
                <button
                  disabled={alreadyPaid}
                  onClick={() => handlePayNow()}
                  className="w-full h-full btn rounded-none rounded-br-lg text-xs"
                >
                  {alreadyPaid ? 'Already yours' : 'pay now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceCard;
