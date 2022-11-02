import EventCard, { EventType } from '@comps/EventCard_V2';
import { sortFromNow } from 'utils/myFormatDate';

const EventsRow = ({ events, title='Events' }:{events:EventType[], title:string}) => {

  return (
    <div className=" mx-auto">
      <h3 className="text-lg  font-bold mt-4 ">{title}</h3>
      <div className="grid ">
        <div className="flex flex-row gap-2 overflow-x-auto pb-4 h-[185px] ">
          {events?.sort(sortFromNow).map((event) => (
            <EventCard
              key={event?.id}
              size="sm"
              event={event}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsRow;
