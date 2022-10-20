import useEvents from 'hooks/useEvents';
import EventCard, { EventType } from './EventCard';

const events: EventType[] = [
  {
    title: 'Triatlon caimancito',
    resume: 'Triatlon caimancito',
    id: '1',
    image: undefined,
  },
  {
    title: 'Carrera de la salud',
    resume: 'Triatlon caimancito',
    id: '2',
    image: undefined,
  },
  {
    title: 'Etapa 1 ciclismo',
    resume: 'Triatlon caimancito',
    id: '3',
    image: undefined,
  },
  {
    title: 'Etapa 1 ciclismo',
    resume: 'Triatlon caimancito',
    id: '4',
    image: undefined,
  },
];


const EventsList = () => {

  const { userEvents } = useEvents();
  const handleSuscribeTo=(id:string)=>{
    return ''
  }
  return (
    <div>
      <h3 className="text-2xl text-center font-bold my-4">Events</h3>
      <div className="flex flex-wrap justify-around gap-2">
        {userEvents.map((event) => (
          <EventCard
            event={event}
            key={event.id}
            onSuscribe={handleSuscribeTo}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsList;
