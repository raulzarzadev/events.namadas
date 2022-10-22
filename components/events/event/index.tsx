import Carousel from '@comps/carousel';
import { Event, SubEvent } from '@firebase/Events/event.model';
import myFormatDate from 'utils/myFormatDate';

const Event = ({ event }: { event: Event | null }) => {
  if (!event) return <div>Loading ...</div>;

  const {
    title,
    date,
    resume,
    userId,
    images,
    subEvents = [],
    swimmingType,
  } = event;
  const LABES = {
    '25m': 'Pool 25m',
    '50m': 'Pool 50m',
    openWater: 'Open Water',
  };
  // console.log(event)
  return (
    <div>
      <Carousel images={images} />
      <div className="flex w-full justify-around my-4">
        <button className="btn btn-primary ">Participa</button>
      </div>
      <div className="max-w-md mx-auto" >
        <h1 className="text-center font-bold text-2xl">
          {title || 'Event title'}
        </h1>
        <p className="text-center">{date && myFormatDate(date)}</p>
        <p className="text-center">{LABES[swimmingType]}</p>
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
            {subEvents?.map((sub) => (
              <SubEvent key={sub.title} subEvent={sub} />
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
        <span className="w-1/3 text-end">{date && myFormatDate(date)}</span>
      </div>
      <div>
        <p>{comments}</p>
      </div>
    </div>
  );
};

export default Event;
