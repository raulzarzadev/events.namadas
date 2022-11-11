import Carousel from '@comps/carousel';
import DateComponent from '@comps/DateComponent';
import PickerSwimmingTests from '@comps/inputs/PickerSwimmingTest_v2';
import PreviewImage from '@comps/previewImage';
import RangeDate from '@comps/RangeDate';
import { Event, EventLink, SubEvent } from '@firebase/Events/event.model';
import Link from 'next/link';
import myFormatDate from 'utils/myFormatDate';

const Event = ({ event }: { event: Event | null | undefined }) => {
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
    links,
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
        <p className="text-center my-2">
          {includeFinishDate ? (
            <RangeDate startAt={date} finishAt={finishAt} />
          ) : (
            <DateComponent date={date} format="dd MMMM yy" />
          )}
        </p>

        <p className="text-center">{LABELS[swimmingType]}</p>
        {resume && (
          <>
            <h4 className="font-bold text-lg text-center">Event resume</h4>
            <p className=" mx-auto whitespace-pre-line">
              {resume || 'Event resume'}
            </p>
          </>
        )}

        {!!subEvents.length && (
          <div>
            <h3 className="font-bold text-lg text-center">
              Sub events{' '}
              <span className="text-sm font-normal">
                {`(${subEvents.length || 0})`}
              </span>
            </h3>
            {eventType === 'swimmingPool' ? (
              <PickerSwimmingTests tests={subEvents} disabled />
            ) : (
              <div className="grid gap-2 p-1">
                {subEvents?.sort(sortByDate).map((sub: SubEvent, i) => (
                  <SubEvent key={`${sub.title}-${i}`} subEvent={sub} />
                ))}
              </div>
            )}
          </div>
        )}

        {!!links?.length && (
          <div className='mb-2'>
            <h4 className="font-bold text-lg text-center">Event Links</h4>
            <div className="flex  w-full justify-around flex-wrap">
              {links?.map((link) => (
                <EventLinkInfo key={link.url} link={link} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

const sortByDate = (a: any, b: any) => {
  if (a.date > b.date) return 1
  if (a.date < b.date) return -1
  return 0
}

const EventLinkInfo = ({ link }: { link: EventLink }) => {
  return (
    <div className='my-4'>
      {link.image &&
        <PreviewImage image={link.image} showDelete={false} />
      }
      <Link href={link?.url} target="_blank">
        <a className="link w-1/3 text-center " target={'_blank'}>
          {link.label}
        </a>
      </Link>
    </div>
  );
};

const SubEvent = ({ subEvent }: { subEvent: SubEvent }) => {
  const { title, comments, distance, date, style } = subEvent;
  return (
    <div className=" p-1">
      <div className="flex w-full justify-between">
        <h3 className="w-2/3 font-bold">{title || style}</h3>
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
