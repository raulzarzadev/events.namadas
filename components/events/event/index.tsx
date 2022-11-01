import Carousel from '@comps/carousel';
import DateComponent from '@comps/DateComponent';
import PickerSwimmingTests from '@comps/inputs/PickerSwimmingTest_v2';
import RangeDate from '@comps/RangeDate';
import { Event, SubEvent } from '@firebase/Events/event.model';
import myFormatDate from 'utils/myFormatDate';

const Event = ({ event }: { event: Event | null |undefined }) => {
  
  //const { userEventPayments } = useEventsPayments({ eventId:event?.id });
  if (!event) return <div>Loading ...</div>;
  
  const {
    title,
    date,
    resume,
    userId,
    images,
    subEvents = [],
    swimmingType,
    eventType,
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

      <div className="max-w-md mx-auto">
        <h1 className="text-center font-bold text-2xl">
          {title || 'Event title'}
        </h1>
        <p className="text-center">
          {includeFinishDate ? (
            <RangeDate startAt={date} finishAt={finishAt} />
          ) : (
            <DateComponent date={date} />
          )}
        </p>

        <p className="text-center">{LABELS[swimmingType]}</p>
        <p className=" mx-auto whitespace-pre-line">
          {resume || 'Event resume'}
        </p>
        <div>
          <h3 className="font-bold text-lg text-center">
            Sub events{' '}
            <span className="text-sm font-normal">
              {`(${subEvents.length || 0})`}
            </span>
          </h3>
          {eventType === 'swimmingPool' ? (
            <PickerSwimmingTests tests={subEvents} disabled/>
          ) : (
            <div className="grid gap-2 p-1">
              {subEvents?.map((sub: SubEvent, i) => (
                <SubEvent key={`${sub.title}-${i}`} subEvent={sub} />
              ))}
            </div>
          )}
          
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
          {date && myFormatDate(date, 'dd MMM HH:mm')}
        </span>
      </div>
      <div>
        <p>{comments}</p>
      </div>
    </div>
  );
};

export default Event;
