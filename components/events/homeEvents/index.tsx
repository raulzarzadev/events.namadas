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

  const eventsByLabels = groupEventsByLabels(omitPatsEvent(events));
  const eventsByDate = groupByDate(events);
  return (
    <div>
      {Object.entries(eventsByDate).map(([key, events]: any) => (
        <EventsRow title={key} events={events} />
      ))}
      {Object.entries(eventsByLabels).map(([key, events]: any) => (
        <EventsRow title={key} events={events} />
      ))}
    </div>
  );
};

export default HomeEvents;
