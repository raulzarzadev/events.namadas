import EventCard, { EventType } from '@comps/EventCard_V2';
import { sortFromNow } from 'utils/myFormatDate';

const EventsRow = ({ events, title='Events' }:{events:EventType[], title:string}) => {
  const handleSuscribeTo = (id: string) => {
    return '';
  };
  const sortByDate=(a:any,b:any)=>{
    if(a?.date < b?.date) return 1
    if (a?.date > b?.date) return -1;
    return 0
  }

  return (
    <div className=" mx-auto">
      <h3 className="text-lg  font-bold mt-4 ">{title}</h3>
      <div className="grid ">
        <div className="flex flex-row gap-2 overflow-x-auto pb-4 min-h-[115px] ">
          {events?.sort(sortFromNow).map((event) => (
            <EventCard
              key={event?.id}
              size="sm"
              event={event}
              onSuscribe={handleSuscribeTo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsRow;
