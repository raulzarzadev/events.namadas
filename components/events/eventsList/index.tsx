import EventCard, { Event } from './EventCard';

const events: Event[] = [
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
];
const EventsList = () => {
  const handleSuscribeTo=(id:string)=>{
    console.log(id)
    return ''
  }
  return (
    <div>
      <h3 className="text-2xl text-center font-bold my-4">Events</h3>
      <div className="flex flex-wrap justify-around gap-2">
        {events.map((event) => (
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
