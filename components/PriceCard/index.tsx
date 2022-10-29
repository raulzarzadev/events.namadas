import Modal from '@comps/modal';
import { Price } from '@firebase/Events/event.model';
import Link from 'next/link';
import { useState } from 'react';

const PriceCard = ({
  price,
  paymentId,
}: {
  price?: Price;
  alreadyPaid?: string;
  paymentId?:string;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <div
        className="group  rounded-lg bg-base-200 shadow-lg w-full h-full  cursor-pointer active:shadow-none border-2 border-transparent hover:border-base-content "
        onClick={() => {
          !paymentId && handleOpenModal();
        }}
      >
        <div className="grid  h-full  ">
          <h4 className="text-center font-bold  self-start p-2 ">
            {price?.title}
          </h4>

          <div className=" text-center  ">
            <p className="p-2">{price?.description}</p>
          </div>

          <div className="self-end ">
            {paymentId ? (
              <div className="text-center w-full">
                <span className="grid w-full">
                  <span>
                    ${parseInt(`${price?.amount || 0}`).toFixed(2)} mxn
                  </span>
                </span>
                <Link href={`/payments/${paymentId}`}>
                  <div className="bg-success text-success-content w-ful rounded-b-lg ">
                    All ready paid
                  </div>
                </Link>
              </div>
            ) : (
              <div className="mt-4 btn group-hover:bg-primary group-active:bg-base-100 w-full">
                <span>${parseInt(`${price?.amount || 0}`).toFixed(2)} mxn</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        title={`Be part of ${price?.title}`}
        open={openModal}
        handleOpen={handleOpenModal}
      >
        <div className="grid place-content-center gap-2">
          <button className="btn  btn-sm " disabled>
            Add to cart
          </button>
          <Link
            href={{
              pathname: 'payment/[priceId]/checkout',
              query: { priceId: price?.id, id: price?.eventId },
            }}
          >
            <button className="btn  btn-sm ">Pay now</button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default PriceCard;
