import { EventPaymentType } from '@firebase/EventPayments/eventPayment.model';
import { Event } from '@firebase/Events/event.model';
import useEvents from 'hooks/useEvents';
import Image from 'next/image';
import Link from 'next/link';
import myFormatDate, { fromNow } from 'utils/myFormatDate';
export interface EventType extends Event {}

const PaymentCard = ({
  payment,
}: {
  redirect?: boolean;
  size?: 'sm' | 'md' | 'lg';
  payment: EventPaymentType;
}) => {
  const {  id, status, createdAt , price } = payment;
  const {event}=useEvents({eventId:`${price?.eventId}`})
  const defaultImage = event?.images?.[0].url ||event?.images?.[0].src
  return (
    <Link href={`/events/${event?.id}`}>
      <a className="w-[200px]">
        <EventTitle title={price?.title} />
        <figure className="relative  w-[200px] h-[115px] ">
          {defaultImage && (
            <Image src={defaultImage} objectFit="cover" layout="fill" />
          )}
          <UpcommingLabel status={status} />
        </figure>
        <EventInfo
          when={
            event?.date ? fromNow(event?.date, { addSuffix: true }) : 'soon'
          }
        />
      </a>
    </Link>
  );
};

const EventInfo = ({ when }: { when?: string }) => {
  return (
    <div className="">
      <div className="w-full text-sm truncate text-center">
        <label className=" ">{when}</label>
      </div>
    </div>
  );
};

const EventTitle = ({ title }: { title?: string }) => {
  return (
    <div className="">
      <div className="w-full text-sm truncate text-center">
        <label className=" ">{title}</label>
      </div>
    </div>
  );
};

const UpcommingLabel = ({
  status = 'WATTING',
  fromNow,
}: {
  status: EventPaymentType['status'];
  fromNow?: string;
}) => {
  const STATUS_LABEL: Record<EventPaymentType['status'], string> = {
    INVALID: 'Invalid payment',
    VALID: 'Valid ',
    WAITING: 'Waiting',
    PAID_OUT: 'Payment checked',
  };
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 ">
      <div className="flex justify-center">
        <label className="bg-red-600 font-bold rounded-t-md p-1 pb-0 text-sm whitespace-nowrap">
          {STATUS_LABEL[status]} {fromNow && `in ${fromNow}`}
        </label>
      </div>
    </div>
  );
};

export default PaymentCard;
