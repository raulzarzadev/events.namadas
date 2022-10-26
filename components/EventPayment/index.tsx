import PriceCard from '@comps/PriceCard';
import useEvents from 'hooks/useEvents';
import { useRouter } from 'next/router';
import myFormatDate from 'utils/myFormatDate';

const EventPyment = () => {
  const {
    query: { id: eventId, paymentId },
  } = useRouter();
  const { event } = useEvents({ eventId: `${eventId}` });
  const price = event?.prices?.find(({ id }) => id === paymentId);

  if (!price) return <div>Loading ...</div>;
  return (
    <div>
      <h1 className="text-xl font-bold text-center">{event?.title}</h1>
      <div>
        {event?.includeFinishDate ? (
          <RangeDate startAt={event.date} finishAt={event.finishAt} />
        ) : (
          <EventDate date={event?.date} />
        )}
      </div>
      <div className="grid place-content-center text-center">
        <span className="font-bold">{price.title}</span>
        <span>{price.description}</span>
      </div>
      <div className='text-center'>
        <span>Price:</span>
        <span className='font-bold text-xl'>${parseInt(price?.price)?.toFixed(2)}</span>
      </div>
    
    </div>
  );
};

type DateType = string | number | Date | undefined;

interface RangeDateType {
  startAt?: DateType;
  finishAt?: DateType;
}

const EventDate = ({ date }: { date?: DateType }) => {
  return <div>{myFormatDate(date, 'dd/MMM/yy')}</div>;
};

const RangeDate = ({ startAt, finishAt }: RangeDateType) => {
  return (
    <div className="grid place-content-center text-center">
      <span>
        {`From: 
          ${myFormatDate(startAt, 'dd-MMM-yy')}`}
      </span>
      <span>
        {` 
        To: 
        ${myFormatDate(finishAt, 'dd-MMM-yy')}
        `}
      </span>
    </div>
  );
};

export default EventPyment;
