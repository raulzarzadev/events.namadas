import type { NextPage } from 'next';
import EventsRow from '@comps/events/eventsRow';
import useEvents from 'hooks/useEvents';

const Home: NextPage = () => {
  const { events: inProgress } = useEvents({ getByStatus: 'IN_PROGRESS' });
  const { events: activeEvents } = useEvents({ getByStatus: 'ACTIVE' });
  const { events: plaingEvents } = useEvents({ getByStatus: 'PLANING' });
  const { events: finishedEvents } = useEvents({ getByStatus: 'FINISHED' });
  // console.log(plaingEvents);
  return (
    <div className="px-2">
      {/* <Hero /> */}
      {/* <EventsFilter /> */}
      <EventsRow title="Events in progress now " events={inProgress} />
      <EventsRow title="Upcomming events " events={activeEvents} />
      <EventsRow title="Planing events" events={plaingEvents} />
      <EventsRow title="Past events" events={finishedEvents} />
    </div>
  );
};

export default Home;
