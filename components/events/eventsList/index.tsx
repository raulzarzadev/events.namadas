import EventCard from '@comps/EventCard_V2';
import useEvents from 'hooks/useEvents';

const EventsList = () => {

  const { userEvents } = useEvents();
  const handleSuscribeTo=(id:string)=>{
    return ''
  }
  return (
    <div className='max-w-xl mx-auto'>
      <h3 className="text-2xl text-center font-bold my-4 ">Events</h3>
      <div className="grid ">
        <div className="grid grid-flow-col gap-1 overflow-x-auto pb-4 ">
          {userEvents.map((event) => (
            <EventCard
              size='sm'
              event={event}
              key={event?.id}
              onSuscribe={handleSuscribeTo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
