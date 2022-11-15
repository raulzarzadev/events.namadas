import type { NextPage } from 'next';
import EventsRow from '@comps/events/eventsRow';
import useEvents from 'hooks/useEvents';
import { Event } from '@firebase/Events/event.model';
import { getEvents } from '@firebase/Events/main';

const isPastEvent = (event: any): boolean => {
  const currentDate = new Date().getTime();
  return event.includeFinishDate
    ? event?.finishAt < currentDate
    : event?.date < currentDate;
};

export async function getServerSideProps() {
  const events = await getEvents();
  return {
    props: { events }, // will be passed to the page component as props
  };
}

const Home: NextPage = (props: any) => {
  const events = props?.events;
  //const { events } = useEvents({ getAllEvents: true });
  const pastEvents: Event[] = [...events].filter((event) => isPastEvent(event));
  const activeEvents: Event[] = [...events].filter(
    (event) =>
      (event.status === 'ACTIVE' || event.status === 'OUTSIDE') &&
      !isPastEvent(event)
  );

  const labelGroups = events.reduce((prev: any, curr: any) => {
    curr?.labels?.forEach((label: string) => {
      if (prev[label]) {
        prev[label] = [...prev[label], curr];
      } else {
        prev[label] = [curr];
      }
    });
    return { ...prev };
  }, {});

  const labels_es: Record<string, string> = {
    swim: 'Natación',
    sports: 'Deportes',
    openWater: 'Aguas abiertas',
    sea: 'Natación en el mar',
    multi: 'Multideporte',
    triathlon: 'Triatlón',
    sprint: 'Triatlón Sprint',
    mountain: 'Trail',
    run: 'Carrera',
  };
  console.log(labelGroups);

  return (
    <div className="px-2">
      <EventsRow title="Upcoming events " events={activeEvents} />
      {Object.entries(labelGroups).map(([category, events]: any) => (
        <EventsRow title={labels_es[category]} events={events} />
      ))}
      <EventsRow title="Past events" events={pastEvents} />
    </div>
  );
};

export default Home;
