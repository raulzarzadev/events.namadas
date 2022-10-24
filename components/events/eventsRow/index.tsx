import EventCard, { EventType } from '@comps/EventCard_V2';

const EventsRow = ({ events, title='Events' }:{events:EventType[], title:string}) => {
  const handleSuscribeTo = (id: string) => {
    return '';
  };
  return (
    <div className=" mx-auto">
      <h3 className="text-2xl  font-bold my-4 ">{title}</h3>
      <div className="grid ">
        <div className="flex flex-row gap-2 overflow-x-auto pb-4 min-h-[115px] ">
          {events?.map((event) => (
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
