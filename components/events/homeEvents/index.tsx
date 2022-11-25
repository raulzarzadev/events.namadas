import { Event } from '@firebase/Events/event.model';
import EventsRow from '../eventsRow';

const HomeEvents = ({ events }: { events: Event[] }) => {
  const groupEventsByLabels = (events: Event[]) => {
    return events.reduce((prev: any, curr: any) => {
      curr?.labels?.forEach((label: string) => {
        if (prev[label]) {
          prev[label] = [...prev[label], curr];
        } else {
          prev[label] = [curr];
        }
      });
      return { ...prev };
    }, {});
  };

  const groupByDate = (events: Event[]) => {
    return events.reduce(
      (prev: any, curr: any) => {
        if (curr.date < new Date().getTime()) {
          return { ...prev, past: [...prev.past, curr] };
        } else {
          return { ...prev, upcoming: [...prev.upcoming, curr] };
        }
      },
      {
        upcoming: [],
        past: [],
      }
    );
  };
  const omitPatsEvent = (events: Event[]) =>
    events.filter((event) => (event?.date || 0) > new Date().getTime());

  const eventsByDate = groupByDate(events);
  const eventsByLabels = groupEventsByLabels(omitPatsEvent(events));

  const ROWS_TITLES: Record<string, string> = {
    upcoming: 'Próximamente ⏰',
    sports: 'Todos los Deportes 🏅',
    past: 'Pasados ⌛️',
    bike: 'Bicicleta 🚵',
    route: 'Bici de Ruta 🚴',
    mountain: 'Montaña 🏔️',
    run: 'Correr 🏃',
    city: 'En ciudad 🏢',
    multi: 'Multideporte 🏊‍♀️ 🚴‍♀️🏃‍♀️',
    triathlon: 'Triatlón 🏊‍♀️ 🚴‍♀️🏃‍♀️',
    'valle-man': 'ValleMan 🏊‍♀️ 🏊‍♀️ 🏊‍♀️ 🚴‍♀️🚴‍♀️🚴‍♀️🏃‍♀️🏃‍♀️🏃‍♀️',
    swim: 'Natación 🏊2',
    sea: 'En el mal 🌊🏊‍♀️',
    openWater: 'Aguas abiertas 🏊🏊‍♀️',
  };
  return (
    <div className="grid gap-4">
      {Object.entries(eventsByDate).map(([key, events]: any) => (
        <EventsRow key={key} title={ROWS_TITLES[key] || key} events={events} />
      ))}
      {Object.entries(eventsByLabels).map(([key, events]: any) => (
        <EventsRow key={key} title={ROWS_TITLES[key] || key} events={events} />
      ))}
    </div>
  );
};

export default HomeEvents;
