import DateComponent from '@comps/DateComponent';
import RangeDate from '@comps/RangeDate';
import { EventPaymentType } from '@firebase/EventPayments/eventPayment.model';
import useEvents from 'hooks/useEvents';
import { fromNow } from 'utils/myFormatDate';

const PaymentDetails = ({ payment }: { payment?: EventPaymentType|null }) => {
  if(!payment) return <></>
  const { price ,createdAt} = payment;
  const {event}=useEvents({eventId:price?.eventId})
  return (
    <div className="text-center  max-w-sm mx-auto">
      <h3 className="font-bold">Payments details</h3>

      <div className="text-left mt-3">Product:</div>
      <div>{price?.title}</div>
      <div className="text-left mt-3">Price:</div>
      <div>${parseFloat(`${price?.amount}`).toFixed(2)}</div>
      <div className="text-left mt-3">Event (date):</div>
      <div>
        {event?.includeFinishDate ? (
          <RangeDate startAt={event?.date} finishAt={event?.finishAt} />
        ) : (
          <DateComponent date={event?.date} />
        )}
      </div>
      <div className="text-left mt-3">Event (status):</div>
      <div>{event?.status}</div>
      <div className="text-left mt-3">Description:</div>
      <div>{price?.description}</div>
      <div className="text-left mt-3">Created:</div>
      <div>{fromNow(createdAt, { addSuffix: true })}</div>
    </div>
  );
};

export default PaymentDetails;
