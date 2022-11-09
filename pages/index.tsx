import type { NextPage } from 'next';
import EventsRow from '@comps/events/eventsRow';
import useEvents from 'hooks/useEvents';
import { Event } from '@firebase/Events/event.model';

const isPastEvent = (event: any): boolean => {
  const currentDate = new Date().getTime();
  return event.includeFinishDate
    ? event?.finishAt < currentDate
    : event?.date < currentDate;
};

const Home: NextPage = () => {
  const { events } = useEvents({ getAllEvents: true });
  const pastEvents: Event[] = [...events].filter((event) => isPastEvent(event));
  const activeEvents: Event[] = [...events].filter(
    (event) => event.status === 'ACTIVE' && !isPastEvent(event)
  );

  return (
    <div className="px-2">
      <EventsRow title="Upcoming events " events={activeEvents} />
      <EventsRow title="Past events" events={pastEvents} />
    </div>
  );
};

export default Home;
