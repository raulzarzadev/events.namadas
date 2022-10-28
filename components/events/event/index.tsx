import Carousel from '@comps/carousel';
import PriceCard from '@comps/PriceCard';
import { Event, SubEvent } from '@firebase/Events/event.model';
import useEventsPayments from 'hooks/useEventsPayments';
import Link from 'next/link';
import myFormatDate from 'utils/myFormatDate';

const Event = ({ event }: { event: Event | null }) => {
  
  const { userEventPayments } = useEventsPayments({ eventId:event?.id });
  console.log(userEventPayments);
  if (!event) return <div>Loading ...</div>;
  
  const {
    title,
    date,
    resume,
    userId,
    images,
    subEvents = [],
    swimmingType,
    includeFinishDate,
    finishAt,
    id: eventId,
  } = event;
  
  const LABELS: Record<Event['swimmingType'], string> = {
    '25m': 'Pool 25m',
    '50m': 'Pool 50m',
    openWater: 'Open Water',
    swimmingPool: 'Swimming pool',
  };

  return (
    <div>
      <Carousel images={images} />
      <div className="flex w-full justify-around my-4">
        {userEventPayments?.length ? (
          <div>
            <h1 className="text-center font-bold">You all ready are part </h1>
            <div className="flex max-w-lg flex-wrap justify-center">
              {userEventPayments?.map((payment) => (
                <div key={payment.id} className="w-1/2 p-2">
                  <PriceCard
                    price={payment?.price}
                    // alreadyPaid={payment.id}
                    paymentId={payment.id}
                  />
                </div>
              ))}
            </div>
            <div className="flex mx-auto w-full justify-center">
              <Link href={`/events/${eventId}/join`}>
                <button className="btn btn-primary ">buy other sub</button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <Link href={`/events/${eventId}/join`}>
              <button className="btn btn-primary ">Participa</button>
            </Link>
          </div>
        )}
      </div>
      <div className="max-w-md mx-auto">
        <h1 className="text-center font-bold text-2xl">
          {title || 'Event title'}
        </h1>
        <p className="text-center">
          {includeFinishDate
            ? `from ${myFormatDate(date, 'dd MMM yy')} to ${myFormatDate(
                finishAt,
                'dd MMM yy'
              )}`
            : myFormatDate(date, 'dd MMM yy')}
        </p>
        <p className="text-center">{LABELS[swimmingType]}</p>
        <p className=" mx-auto whitespace-pre-line">
          {resume || 'Event resume'}
        </p>
        <div>
          <h3 className="font-bold text-lg">
            The events
            <span className="text-sm font-normal">
              {`(${subEvents.length || 0})`}
            </span>
          </h3>
          <div className="grid gap-2 p-1">
            {subEvents?.map((sub: SubEvent, i) => (
              <SubEvent key={`${sub.title}-${i}`} subEvent={sub} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SubEvent = ({ subEvent }: { subEvent: SubEvent }) => {
  const { title, comments, distance, date, style } = subEvent;
  return (
    <div className="border p-1">
      <div className="flex w-full justify-between">
        <h3 className="w-1/3 ">{title || style}</h3>
        <span className="w-1/3 text-center">{distance}</span>
        <span className="w-1/3 text-end">
          {date && myFormatDate(date, 'dd MMM yy')}
        </span>
      </div>
      <div>
        <p>{comments}</p>
      </div>
    </div>
  );
};

export default Event;
