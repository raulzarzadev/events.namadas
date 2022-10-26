import Modal from "@comps/modal";
import { Price } from "@firebase/Events/event.model";
import Link from "next/link";
import { useState } from "react";

const PriceCard = ({price}:{price:Price}) => {
  const [openModal, setOpenModal]=useState(false)
  const handleOpenModal=()=>{
    setOpenModal(!openModal)
  }
  return (
    <div>
      <div
        key={price.title}
        className="border-spacing-0.5 rounded-lg grid place-content-center p-4  bg-base-200 shadow-lg w-full h-full group cursor-pointer active:shadow-none"
        onClick={() => {
          handleOpenModal();
        }}
      >
        <h4 className="text-center font-bold sm:text-xl">{price.title}</h4>
        <p>{price.description}</p>
        <div className="mt-4 btn group-hover:bg-primary group-active:bg-base-100 ">
          <span>${parseInt(price.price).toFixed(2)} mxn</span>
        </div>
      </div>
      <Modal
        title={`Be part of ${price.title}`}
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
              query: { priceId: price.id, id:price.eventId },
            }}
          >
            <button className="btn  btn-sm ">Pay now</button>
          </Link>
        </div>
      </Modal>
    </div>
  );
}

export default PriceCard;